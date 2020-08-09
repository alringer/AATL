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
import axios, { DELETE_VENUE_LIST } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { useSnackbar } from 'notistack'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store/index'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IVenueListMeta } from 'utilities/types/venueListMeta'

interface IReduxProps {
    currentPlaceList: IVenueListMeta | null
    onSuccess: () => void
}
interface IDeleteRestaurantListProps extends IReduxProps, IWithAuthInjectedProps {
    closeModal: () => void
}

const DeleteRestaurantList: React.FC<IDeleteRestaurantListProps> = ({
    closeModal,
    getTokenConfig,
    currentPlaceList,
    onSuccess,
}) => {
    const { enqueueSnackbar } = useSnackbar()

    const deleteVenueList = (listID: number) => {
        if (currentPlaceList && currentPlaceList.title !== null) {
            const token = getTokenConfig()
            const config = {
                headers: {
                    Authorization: token,
                },
            }
            axios
                .delete(DELETE_VENUE_LIST(listID), config)
                .then((res) => {
                    onSuccess()
                    handleCancel()
                    enqueueSnackbar('', {
                        content: (
                            <div>
                                <Snackbar
                                    type={B.REMOVED_FROM_LIST.Type}
                                    title={B.REMOVED_FROM_LIST.Title}
                                    message={
                                        <SnackbarMessageBody>
                                            <SnackbarOrangeMessage>{currentPlaceList.title}</SnackbarOrangeMessage>
                                            &nbsp;
                                            {B.REMOVED_FROM_LIST.Body}
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
        if (currentPlaceList && currentPlaceList.id !== undefined && currentPlaceList.id !== null) {
            deleteVenueList(currentPlaceList.id)
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
export default reduxConnect(mapStateToProps)(withAuth(DeleteRestaurantList))
