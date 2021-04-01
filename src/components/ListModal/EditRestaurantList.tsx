import { PlaceholderContainer, PlaceholderTextBold, PlaceholderTextNormal } from 'components/Search/Search.style'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import axios, { VENUE_LIST } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { useSnackbar } from 'notistack'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store/index'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IVenueListMeta } from 'utilities/types/venueListMeta'
import {
    CancelButton,
    ListModalFooterContainer,
    ListModalFooterRightContainer,
    ListModalHeaderContainer,
    ListModalHeaderText,
    ListModalInput,
    ListModalInputRowContainer,
    ListModalMainAreaContainer,
    ListModalMainContentContainer,
    ListModalMessage,
    ListModalTitleText,
    SubmitButton,
} from './ListModal.style'

interface IReduxProps {
    currentPlaceList: IVenueListMeta | null
    onSuccess: () => void
}
interface IEditRestaurantListProps extends IReduxProps, IWithAuthInjectedProps {
    closeModal: () => void
}

const EditRestaurantList: React.FC<IEditRestaurantListProps> = ({
    getTokenConfig,
    closeModal,
    currentPlaceList,
    onSuccess,
}) => {
    const { enqueueSnackbar } = useSnackbar()

    const [inputTitle, setInputTitle] = React.useState(
        currentPlaceList && currentPlaceList.title ? currentPlaceList.title : ''
    )
    const [inputDescription, setInputDescription] = React.useState(
        currentPlaceList && currentPlaceList.summary ? currentPlaceList.summary : ''
    )
    const [isLoading, setLoading] = React.useState(false)

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== undefined && e.target.value !== null) {
            setInputTitle(e.target.value)
        }
    }
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== undefined && e.target.value !== null) {
            setInputDescription(e.target.value)
        }
    }

    const handleCancel = () => {
        closeModal()
    }
    const handleUpdate = () => {
        if (inputTitle && currentPlaceList && currentPlaceList.id !== undefined && currentPlaceList.id !== null) {
            const token = getTokenConfig()
            const config = {
                headers: {
                    Authorization: token,
                },
            }
            setLoading(true)
            axios
                .put(
                    VENUE_LIST,
                    {
                        id: currentPlaceList.id,
                        title: inputTitle,
                        summary: inputDescription,
                    },
                    config
                )
                .then((res) => {
                    enqueueSnackbar('', {
                        content: (
                            <div>
                                <Snackbar
                                    type={B.EDITED_LIST.Type}
                                    title={B.EDITED_LIST.Title}
                                    message={<SnackbarMessageBody>{B.EDITED_LIST.Body}</SnackbarMessageBody>}
                                />
                            </div>
                        ),
                    })
                    onSuccess()
                    handleCancel()
                })
                .catch((err) => console.log())
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    return (
        <>
            <ListModalHeaderContainer>
                <ListModalHeaderText>{S.LIST_MODAL.EditRestaurantList.Header}</ListModalHeaderText>
            </ListModalHeaderContainer>
            <ListModalMainAreaContainer>
                <ListModalTitleText>{S.LIST_MODAL.EditRestaurantList.Title}</ListModalTitleText>
                <ListModalMainContentContainer>
                    <ListModalInputRowContainer>
                        <ListModalInput
                            value={inputTitle}
                            onChange={handleTitleChange}
                            variant="outlined"
                            label={
                                inputTitle === '' ? (
                                    <PlaceholderContainer>
                                        <PlaceholderTextBold>{S.INPUT_PLACEHOLDERS.Title}</PlaceholderTextBold>
                                    </PlaceholderContainer>
                                ) : null
                            }
                            InputLabelProps={{ shrink: false }}
                        />
                    </ListModalInputRowContainer>
                    <ListModalInputRowContainer>
                        <ListModalInput
                            value={inputDescription}
                            placeholder="Description"
                            onChange={handleDescriptionChange}
                            variant="outlined"
                            label={
                                inputDescription === '' ? (
                                    <PlaceholderContainer>
                                        <PlaceholderTextBold>{S.INPUT_PLACEHOLDERS.Description}</PlaceholderTextBold>{' '}
                                        &nbsp;
                                        <PlaceholderTextNormal>{S.INPUT_PLACEHOLDERS.Optional}</PlaceholderTextNormal>
                                    </PlaceholderContainer>
                                ) : null
                            }
                            InputLabelProps={{ shrink: false }}
                        />
                    </ListModalInputRowContainer>
                    <ListModalInputRowContainer>
                        <ListModalMessage>{S.LIST_MODAL.EditRestaurantList.Message}</ListModalMessage>
                    </ListModalInputRowContainer>
                </ListModalMainContentContainer>
            </ListModalMainAreaContainer>
            <ListModalFooterContainer>
                <ListModalFooterRightContainer>
                    <CancelButton onClick={handleCancel}>{S.BUTTON_LABELS.Cancel}</CancelButton>
                    <SubmitButton onClick={handleUpdate} disabled={!inputTitle || isLoading}>
                        {S.BUTTON_LABELS.Update}
                    </SubmitButton>
                </ListModalFooterRightContainer>
            </ListModalFooterContainer>
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    currentPlaceList: state.listModalReducer.placeList,
    onSuccess: state.listModalReducer.onSuccess,
})
export default reduxConnect(mapStateToProps)(withAuth(EditRestaurantList))
