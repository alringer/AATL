import {
    CancelButton,
    ListModalDeleteHighlightText,
    ListModalDeleteListMessageContainer,
    ListModalFooterContainer,
    ListModalFooterRightContainer,
    ListModalHeaderContainer,
    ListModalHeaderText,
    ListModalMainAreaContainer,
    ListModalTitleText,
    SubmitButton,
} from 'components/ListModal/ListModal.style'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody, SnackbarOrangeMessage } from 'components/Snackbar/Snackbar.style'
import axios, { RECOMMENDATION_LIST_META_WITH_ID } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { KeycloakInstance } from 'keycloak-js'
import { useSnackbar } from 'notistack'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/index'
import { fetchUser } from 'store/user/user_actions'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'

interface IReduxProps {
    currentRecommendationList: IRecommendationListMeta | null
    onSuccess: () => void
    fetchUser: (keycloak: KeycloakInstance) => void
}
interface IDeleteRecommendationListProps extends IReduxProps, IWithAuthInjectedProps {
    closeModal: () => void
}

const DeleteRecommendationList: React.FC<IDeleteRecommendationListProps> = ({
    closeModal,
    getTokenConfig,
    currentRecommendationList,
    onSuccess,
    keycloak,
    fetchUser,
}) => {
    const { enqueueSnackbar } = useSnackbar()

    const deleteVenueList = (listID: number) => {
        if (currentRecommendationList && currentRecommendationList.title !== null) {
            const token = getTokenConfig()
            const config = {
                headers: {
                    Authorization: token,
                },
            }
            axios
                .delete(RECOMMENDATION_LIST_META_WITH_ID(listID), config)
                .then((res) => {
                    fetchUser(keycloak)
                    onSuccess()
                    handleCancel()
                    enqueueSnackbar('', {
                        content: (
                            <div>
                                <Snackbar
                                    type={B.REMOVE_LIST.Type}
                                    title={B.REMOVE_LIST.Title}
                                    message={
                                        <SnackbarMessageBody>
                                            <SnackbarOrangeMessage>
                                                {currentRecommendationList.title}
                                            </SnackbarOrangeMessage>
                                            &nbsp;
                                            {B.REMOVE_LIST.Body}
                                        </SnackbarMessageBody>
                                    }
                                />
                            </div>
                        ),
                    })
                })
                .catch((err) => console.log(err))
        }
    }
    const handleDelete = () => {
        if (
            currentRecommendationList &&
            currentRecommendationList.id !== undefined &&
            currentRecommendationList.id !== null
        ) {
            deleteVenueList(currentRecommendationList.id)
        }
    }
    const handleCancel = () => {
        closeModal()
    }

    return (
        <>
            <ListModalHeaderContainer>
                <ListModalHeaderText>{S.LIST_MODAL.DeleteRecommendationList.Header}</ListModalHeaderText>
            </ListModalHeaderContainer>
            <ListModalMainAreaContainer>
                <ListModalDeleteListMessageContainer>
                    <ListModalTitleText>
                        {S.LIST_MODAL.DeleteRecommendationList.FormerMessage}
                        &nbsp;
                        <ListModalDeleteHighlightText>{currentRecommendationList.title}</ListModalDeleteHighlightText>
                        &nbsp;
                        {S.LIST_MODAL.DeleteRecommendationList.LadderMessage}
                    </ListModalTitleText>
                </ListModalDeleteListMessageContainer>
            </ListModalMainAreaContainer>
            <ListModalFooterContainer>
                <ListModalFooterRightContainer>
                    <CancelButton onClick={handleDelete}>{S.BUTTON_LABELS.Delete}</CancelButton>
                    <SubmitButton onClick={handleCancel}>{S.BUTTON_LABELS.Cancel}</SubmitButton>
                </ListModalFooterRightContainer>
            </ListModalFooterContainer>
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    currentRecommendationList: state.listModalReducer.recommendationList,
    onSuccess: state.listModalReducer.onSuccess,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            fetchUser,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(DeleteRecommendationList))
