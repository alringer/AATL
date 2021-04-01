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
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/index'
import { fetchUser } from 'store/user/user_actions'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IVenueListMeta } from 'utilities/types/venueListMeta'

interface IReduxProps {
    currentPlaceList: IVenueListMeta | null
    fetchUser: (keycloak: KeycloakInstance) => void
}
interface IDeleteRestaurantListProps extends IReduxProps, IWithAuthInjectedProps {
    closeModal: () => void
}

const DeleteRestaurantList: React.FC<IDeleteRestaurantListProps> = ({
    closeModal,
    getTokenConfig,
    currentPlaceList,
    keycloak,
    fetchUser,
}) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const deleteRecommendationList = (listID: number) => {
        if (currentPlaceList && currentPlaceList.title !== null) {
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
                    handleCancel()
                    enqueueSnackbar('', {
                        content: (
                            <div>
                                <Snackbar
                                    type={B.REMOVE_LIST.Type}
                                    title={B.REMOVE_LIST.Title}
                                    message={
                                        <SnackbarMessageBody>
                                            <SnackbarOrangeMessage>{currentPlaceList.title}</SnackbarOrangeMessage>
                                            &nbsp;
                                            {B.REMOVE_LIST.Body}
                                        </SnackbarMessageBody>
                                    }
                                />
                            </div>
                        ),
                    })
                    router.push('/')
                })
                .catch((err) => console.log(err))
        }
    }
    const handleDelete = () => {
        if (currentPlaceList && currentPlaceList.id !== undefined && currentPlaceList.id !== null) {
            deleteRecommendationList(currentPlaceList.id)
        }
    }
    const handleCancel = () => {
        closeModal()
    }

    return (
        <>
            <ListModalHeaderContainer>
                <ListModalHeaderText>{S.LIST_MODAL.DeleteRestaurantList.Header}</ListModalHeaderText>
            </ListModalHeaderContainer>
            <ListModalMainAreaContainer>
                <ListModalDeleteListMessageContainer>
                    <ListModalTitleText>
                        {S.LIST_MODAL.DeleteRestaurantList.FormerMessage}
                        &nbsp;<ListModalDeleteHighlightText>{currentPlaceList.title}</ListModalDeleteHighlightText>
                        &nbsp;
                        {S.LIST_MODAL.DeleteRestaurantList.LadderMessage}
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
    currentPlaceList: state.listModalReducer.placeList,
    onSuccess: state.listModalReducer.onSuccess,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            fetchUser,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(DeleteRestaurantList))
