import { PlaceholderContainer, PlaceholderTextBold, PlaceholderTextNormal } from 'components/Search/Search.style'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody, SnackbarOrangeMessage } from 'components/Snackbar/Snackbar.style'
import axios, { POST_NEW_VENUE, VENUE_LIST } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { useSnackbar } from 'notistack'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store/index'
import { ListModalViewEnum } from 'store/listModal/listModal_types'
import { query } from 'style/device'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import {
    ArrowBackIcon,
    CancelButton,
    ListModalFooterContainer,
    ListModalFooterLeftContainer,
    ListModalFooterRightContainer,
    ListModalHeaderContainer,
    ListModalHeaderText,
    ListModalInput,
    ListModalInputRowContainer,
    ListModalMainAreaContainer,
    ListModalMainContentContainer,
    ListModalMessage,
    ListModalNavigationButton,
    ListModalTitleText,
    SubmitButton,
} from './ListModal.style'

interface IReduxProps {
    placeID: number | null
}

interface IAddNewRestaurantListProps extends IWithAuthInjectedProps, IReduxProps {
    closeModal: () => void
    switchView: (newListModalView: ListModalViewEnum) => void
}

const AddNewRestaurantList: React.FC<IAddNewRestaurantListProps> = ({
    closeModal,
    switchView,
    getTokenConfig,
    placeID,
}) => {
    const { enqueueSnackbar } = useSnackbar()
    const [titleInput, setTitleInput] = React.useState('')
    const [descriptionInput, setDescriptionInput] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)

    const handleAddPlace = () => {
        if (titleInput) {
            const createNewVenueListPayload = {
                title: titleInput,
                description: descriptionInput,
            }
            const config = {
                headers: {
                    Authorization: getTokenConfig(),
                },
            }
            setLoading(true)
            axios
                .post(VENUE_LIST, createNewVenueListPayload, config)
                .then((res) => {
                    console.log('Creating a new venue list: ', res)
                    const newRestaurantListID = res.data.id
                    const addVenuePayload = {
                        id: placeID,
                    }
                    axios
                        .post(POST_NEW_VENUE(newRestaurantListID), addVenuePayload, config)
                        .then((res) => {
                            console.log('Adding a venue to the new list: ', res)
                            enqueueSnackbar('', {
                                content: (
                                    <div>
                                        <Snackbar
                                            type={B.ADDED_TO_LIST.Type}
                                            title={B.ADDED_TO_LIST.Title}
                                            message={
                                                <SnackbarMessageBody>
                                                    {res.data.venues[0].name} {B.ADDED_TO_LIST.Body}&nbsp;
                                                    <SnackbarOrangeMessage>{res.data.title}</SnackbarOrangeMessage>
                                                </SnackbarMessageBody>
                                            }
                                        />
                                    </div>
                                ),
                            })
                            closeModal()
                        })
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
                .finally(() => setLoading(false))
        }
    }

    const handleCancel = () => {
        closeModal()
    }
    const handleBackToLists = () => {
        switchView(ListModalViewEnum.AddToRestaurantList)
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== undefined && e.target.value !== null) {
            setTitleInput(e.target.value)
        }
    }
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== undefined && e.target.value !== null) {
            setDescriptionInput(e.target.value)
        }
    }

    return (
        <>
            <ListModalHeaderContainer>
                <ListModalHeaderText>{S.LIST_MODAL.AddNewRestaurantList.Header}</ListModalHeaderText>
            </ListModalHeaderContainer>
            <ListModalMainAreaContainer>
                <ListModalTitleText>{S.LIST_MODAL.AddNewRestaurantList.Title}</ListModalTitleText>
                <ListModalMainContentContainer>
                    <ListModalInputRowContainer>
                        <ListModalInput
                            value={titleInput}
                            onChange={handleTitleChange}
                            variant="outlined"
                            label={
                                titleInput === '' ? (
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
                            value={descriptionInput}
                            placeholder="Description"
                            onChange={handleDescriptionChange}
                            variant="outlined"
                            label={
                                descriptionInput === '' ? (
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
                        <ListModalMessage>{S.LIST_MODAL.AddNewRestaurantList.Message}</ListModalMessage>
                    </ListModalInputRowContainer>
                </ListModalMainContentContainer>
            </ListModalMainAreaContainer>
            <ListModalFooterContainer>
                <Media queries={query} defaultMatches={{ mobile: true }}>
                    {(matches) => (
                        <>
                            {(matches.laptop || matches.tablet) && (
                                <ListModalFooterLeftContainer>
                                    <ListModalNavigationButton onClick={handleBackToLists}>
                                        <ArrowBackIcon />
                                        {S.BUTTON_LABELS.BackToLists}
                                    </ListModalNavigationButton>
                                </ListModalFooterLeftContainer>
                            )}
                        </>
                    )}
                </Media>
                <ListModalFooterRightContainer>
                    <CancelButton onClick={handleCancel}>{S.BUTTON_LABELS.Cancel}</CancelButton>
                    <SubmitButton onClick={handleAddPlace} disabled={!titleInput || isLoading}>
                        {S.BUTTON_LABELS.Add}
                    </SubmitButton>
                </ListModalFooterRightContainer>
            </ListModalFooterContainer>
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    placeID: state.listModalReducer.placeID,
})

export default reduxConnect(mapStateToProps)(withAuth(AddNewRestaurantList))
