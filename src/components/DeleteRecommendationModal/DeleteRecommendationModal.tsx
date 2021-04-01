import {
    CancelButton,
    ListModalFooterContainer,
    ListModalFooterRightContainer,
    ListModalHeaderContainer,
    ListModalHeaderText,
    ListModalMainAreaContainer,
    ListModalMainContentContainer,
    ListModalTitleText,
    SubmitButton,
} from 'components/ListModal/ListModal.style'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import axios, { UPDATE_FLAGGED_RECOMMENDATION } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { useSnackbar } from 'notistack'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeDeleteRecommendationModal } from 'store/deleteRecommendationModal/deleteRecommendationModal_actions'
import { StoreState } from 'store/index'
import { query } from 'style/device'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { flaggedEnum } from 'utilities/types/enumerations'
import {
    DeleteRecommendationModalContainer,
    DeleteRecommendationModalCustomDialog,
} from './DeleteRecommendationModal.style'

interface IReduxProps {
    isOpen: boolean
    flaggedRecommendationID: number | null
    closeDeleteRecommendationModal: () => void
    onSuccess: () => void
}
interface IDeleteRecommendationModalProps extends IReduxProps, IWithAuthInjectedProps {}

const DeleteRecommendationModal: React.FC<IDeleteRecommendationModalProps> = ({
    closeDeleteRecommendationModal,
    getTokenConfig,
    flaggedRecommendationID,
    onSuccess,
    isOpen,
    authenticatedAction,
}) => {
    const { enqueueSnackbar } = useSnackbar()
    const deleteRecommendationModalRef = React.useRef(null)
    const [isSubmitting, setSubmitting] = React.useState(false)

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutsideDeleteRecommendationModal, true)
        return () => {
            document.removeEventListener('click', handleClickOutsideDeleteRecommendationModal, true)
        }
    }, [])

    const handleClickOutsideDeleteRecommendationModal = (event) => {
        if (deleteRecommendationModalRef.current && !deleteRecommendationModalRef.current.contains(event.target)) {
            closeDeleteRecommendationModal()
        }
    }

    const closeModal = () => {
        closeDeleteRecommendationModal()
    }

    const handleDelete = () => {
        if (flaggedRecommendationID) {
            authenticatedAction(() => {
                const payload: flaggedEnum = flaggedEnum.Deleted
                const token = getTokenConfig()
                const config = {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                }

                setSubmitting(true)
                axios
                    .put(UPDATE_FLAGGED_RECOMMENDATION(flaggedRecommendationID), payload, config)
                    .then((res) => {
                        onSuccess()
                        enqueueSnackbar('', {
                            content: (
                                <div>
                                    <Snackbar
                                        type={B.DELETE_RECOMMENDATION.Type}
                                        title={B.DELETE_RECOMMENDATION.Title}
                                        message={
                                            <SnackbarMessageBody>{B.DELETE_RECOMMENDATION.Body}</SnackbarMessageBody>
                                        }
                                    />
                                </div>
                            ),
                        })
                        handleCancel()
                    })
                    .catch((err) => console.log(err))
                    .finally(() => {
                        setSubmitting(false)
                    })
            })
        }
    }

    const handleCancel = () => {
        closeModal()
    }

    return (
        <Media queries={query} defaultMatches={{ mobile: true }}>
            {(matches) => (
                <DeleteRecommendationModalCustomDialog
                    open={isOpen}
                    fullScreen={matches.laptop || matches.tablet ? false : true}
                    maxWidth="lg"
                >
                    <DeleteRecommendationModalContainer ref={deleteRecommendationModalRef}>
                        <ListModalHeaderContainer>
                            <ListModalHeaderText>{S.DELETE_RECOMMENDATION_MODAL.Header}</ListModalHeaderText>
                        </ListModalHeaderContainer>
                        <ListModalMainAreaContainer>
                            <ListModalMainContentContainer>
                                <ListModalTitleText>{S.DELETE_RECOMMENDATION_MODAL.Title}</ListModalTitleText>
                            </ListModalMainContentContainer>
                        </ListModalMainAreaContainer>
                        <ListModalFooterContainer>
                            <ListModalFooterRightContainer>
                                <CancelButton onClick={handleDelete} disabled={isSubmitting}>
                                    {S.BUTTON_LABELS.Delete}
                                </CancelButton>
                                <SubmitButton onClick={handleCancel} disabled={isSubmitting}>
                                    {S.BUTTON_LABELS.Cancel}
                                </SubmitButton>
                            </ListModalFooterRightContainer>
                        </ListModalFooterContainer>
                    </DeleteRecommendationModalContainer>
                </DeleteRecommendationModalCustomDialog>
            )}
        </Media>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isOpen: state.deleteRecommendationModalReducer.isOpen,
    flaggedRecommendationID: state.deleteRecommendationModalReducer.flaggedRecommendationID,
    onSuccess: state.deleteRecommendationModalReducer.onSuccess,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            closeDeleteRecommendationModal,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(DeleteRecommendationModal))
