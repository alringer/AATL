import {
    CancelButton,
    ListModalFooterContainer,
    ListModalFooterRightContainer,
    ListModalHeaderContainer,
    ListModalHeaderText,
    ListModalMainAreaContainer,
    ListModalMainContentContainer,
    SubmitButton,
} from 'components/ListModal/ListModal.style'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody, SnackbarOrangeMessage } from 'components/Snackbar/Snackbar.style'
import axios, { FLAG_RECOMMENDATION } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { useSnackbar } from 'notistack'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { closeFlagModal } from 'store/flagModal/flagModal_actions'
import { query } from 'style/device'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { FlagModalContainer, FlagModalCustomDialog, FlagModalInput, FlagModalTitle } from './FlagModal.style'

interface IReduxProps {
    isOpen: boolean
    recommendationID: number | null
    closeFlagModal: () => void
}

interface IFlagModalProps extends IReduxProps, IWithAuthInjectedProps {}

const FlagModal: React.FC<IFlagModalProps> = ({ isOpen, closeFlagModal, recommendationID, getTokenConfig }) => {
    const [inputReason, setInputReason] = React.useState('')
    const [isSubmitting, setSubmitting] = React.useState(false)

    const flagModalRef = React.useRef(null)
    const { enqueueSnackbar } = useSnackbar()

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutsideFlagModal, true)
        return () => {
            document.removeEventListener('click', handleClickOutsideFlagModal, true)
        }
    }, [])

    const handleClickOutsideFlagModal = (event) => {
        if (flagModalRef.current && !flagModalRef.current.contains(event.target)) {
            closeFlagModal()
        }
    }

    const closeModal = () => {
        closeFlagModal()
    }

    const handleChangeReason = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e) {
            setInputReason(e.target.value)
        }
    }
    const handleCancel = () => {
        closeModal()
    }
    const handleFlag = () => {
        if (recommendationID) {
            const payload = inputReason
            const config = {
                headers: {
                    Authorization: getTokenConfig(),
                    'Content-Type': 'application/json',
                },
            }
            setSubmitting(true)
            axios
                .post(FLAG_RECOMMENDATION(recommendationID), payload, config)
                .then((res) => {
                    enqueueSnackbar('', {
                        content: (
                            <div>
                                <Snackbar
                                    type={B.FLAG_RECOMMENDATION.Type}
                                    title={B.FLAG_RECOMMENDATION.Title}
                                    message={
                                        <SnackbarMessageBody>
                                            {B.FLAG_RECOMMENDATION.Body}&nbsp;
                                            <SnackbarOrangeMessage>
                                                {res.data?.recommendation?.venue?.name}
                                            </SnackbarOrangeMessage>
                                        </SnackbarMessageBody>
                                    }
                                />
                            </div>
                        ),
                    })
                    closeModal()
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    setSubmitting(false)
                })
        }
    }

    return (
        <Media queries={query} defaultMatches={{ mobile: true }}>
            {(matches) => (
                <FlagModalCustomDialog
                    open={isOpen}
                    fullScreen={matches.laptop || matches.tablet ? false : true}
                    maxWidth="lg"
                >
                    <FlagModalContainer ref={flagModalRef}>
                        <ListModalHeaderContainer>
                            <ListModalHeaderText>{S.FLAG_MODAL.Header}</ListModalHeaderText>
                        </ListModalHeaderContainer>
                        <ListModalMainAreaContainer>
                            <FlagModalTitle>{S.FLAG_MODAL.Title}</FlagModalTitle>
                            <ListModalMainContentContainer>
                                <FlagModalInput
                                    value={inputReason}
                                    placeholder={S.INPUT_PLACEHOLDERS.Reason}
                                    onChange={handleChangeReason}
                                    variant="outlined"
                                    InputLabelProps={{ shrink: false }}
                                    inputProps={{ maxLength: 256 }}
                                />
                            </ListModalMainContentContainer>
                        </ListModalMainAreaContainer>
                        <ListModalFooterContainer>
                            <ListModalFooterRightContainer>
                                <CancelButton onClick={handleCancel}>{S.BUTTON_LABELS.Cancel}</CancelButton>
                                <SubmitButton onClick={handleFlag} disabled={!inputReason || isSubmitting}>
                                    {S.BUTTON_LABELS.Flag}
                                </SubmitButton>
                            </ListModalFooterRightContainer>
                        </ListModalFooterContainer>
                    </FlagModalContainer>
                </FlagModalCustomDialog>
            )}
        </Media>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isOpen: state.flagModalReducer.isOpen,
    recommendationID: state.flagModalReducer.recommendationID,
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ closeFlagModal }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(FlagModal))
