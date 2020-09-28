import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody, SnackbarOrangeMessage } from 'components/Snackbar/Snackbar.style'
import axios, { FETCH_VENUE_LISTS, POST_NEW_VENUE } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { useSnackbar } from 'notistack'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'
import { ListModalViewEnum } from 'store/listModal/listModal_types'
import { query } from 'style/device'
import { CircularProgress } from 'style/Loading/CircularProgress.style'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IUserProfile } from 'utilities/types/userProfile'
import { IVenueListMeta } from 'utilities/types/venueListMeta'
import {
    AddIcon,
    CancelButton,
    ListModalAddToListWideButton,
    ListModalCardButton,
    ListModalCardContainer,
    ListModalCardSubTitle,
    ListModalCardTextContainer,
    ListModalCardTitle,
    ListModalFooterContainer,
    ListModalFooterLeftContainer,
    ListModalFooterRightContainer,
    ListModalHeaderContainer,
    ListModalHeaderText,
    ListModalLoadingContainer,
    ListModalMainAreaContainer,
    ListModalMainContentContainer,
    ListModalNavigationButton,
    ListModalTitleText,
    SubmitButton,
} from './ListModal.style'

interface IReduxProps {
    placeID: number | null
    user: IUserProfile
}
interface IAddToRestaurantListProps extends IReduxProps, IWithAuthInjectedProps {
    closeModal: () => void
    switchView: (newListModalView: ListModalViewEnum) => void
}

const AddToRestaurantList: React.FC<IAddToRestaurantListProps> = ({
    placeID,
    closeModal,
    switchView,
    getTokenConfig,
    user,
}) => {
    const [restaurantLists, setRestaurantLists] = React.useState<IVenueListMeta[]>([])
    const [selectedListID, setSelectedListID] = React.useState<number | null>(null)
    const [isLoading, setLoading] = React.useState<boolean>(false)
    const { enqueueSnackbar } = useSnackbar()

    React.useEffect(() => {
        const config = {
            headers: {
                Authorization: getTokenConfig(),
            },
        }
        setLoading(true)
        axios
            .get(FETCH_VENUE_LISTS(user.id), config)
            .then((res) => {
                if (res && res.data && res.data.length && res.data[0] && res.data[0].id) {
                    setRestaurantLists(res.data)
                    setSelectedListID(res.data[0].id)
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const handleSelect = (restaurantListID: number) => {
        if (restaurantListID !== undefined && restaurantListID !== null) {
            if (restaurantListID === selectedListID) {
                setSelectedListID(null)
            } else {
                setSelectedListID(restaurantListID)
            }
        }
    }

    const handleCancel = () => {
        closeModal()
    }
    const handleAddToNewList = () => {
        switchView(ListModalViewEnum.AddToNewRestaurantList)
    }
    const handleAddPlace = () => {
        if (placeID !== null) {
            const addVenuePayload = {
                id: placeID,
            }
            const config = {
                headers: {
                    Authorization: getTokenConfig(),
                },
            }
            axios
                .post(POST_NEW_VENUE(selectedListID), addVenuePayload, config)
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
        }
    }

    return (
        <>
            <ListModalHeaderContainer>
                <ListModalHeaderText>{S.LIST_MODAL.AddToRestaurant.Header}</ListModalHeaderText>
            </ListModalHeaderContainer>
            <ListModalMainAreaContainer>
                <ListModalTitleText>{S.LIST_MODAL.AddToRestaurant.Title}</ListModalTitleText>
                <ListModalMainContentContainer>
                    {isLoading ? (
                        <ListModalLoadingContainer>
                            <CircularProgress />
                        </ListModalLoadingContainer>
                    ) : restaurantLists.length > 0 ? (
                        restaurantLists.map((restaurantList: IVenueListMeta) => (
                            <ListModalCardButton
                                onClick={() => handleSelect(restaurantList.id)}
                                key={restaurantList.id}
                            >
                                <ListModalCardContainer
                                    id={selectedListID === restaurantList.id ? 'selected' : 'not-selected'}
                                >
                                    <ListModalCardTextContainer>
                                        <ListModalCardTitle>{restaurantList.title}</ListModalCardTitle>
                                        <ListModalCardSubTitle>
                                            {restaurantList.venues && restaurantList.venues.length
                                                ? restaurantList.venues.length
                                                : 0}{' '}
                                            {S.LIST_MODAL.AddToRestaurant.Restaurants}
                                        </ListModalCardSubTitle>
                                    </ListModalCardTextContainer>
                                </ListModalCardContainer>
                            </ListModalCardButton>
                        ))
                    ) : (
                        <p>{S.LIST_MODAL.AddToRestaurant.EmptyMessage}</p>
                    )}
                    <Media queries={query} defaultMatches={{ mobile: true }}>
                        {(matches) => (
                            <>
                                {matches.mobile && (
                                    <ListModalAddToListWideButton onClick={handleAddToNewList}>
                                        <AddIcon />
                                        {S.BUTTON_LABELS.AddToNewList}
                                    </ListModalAddToListWideButton>
                                )}
                            </>
                        )}
                    </Media>
                </ListModalMainContentContainer>
            </ListModalMainAreaContainer>
            <ListModalFooterContainer>
                <Media queries={query} defaultMatches={{ mobile: true }}>
                    {(matches) => (
                        <>
                            {(matches.laptop || matches.tablet) && (
                                <ListModalFooterLeftContainer>
                                    <ListModalNavigationButton onClick={handleAddToNewList}>
                                        {S.BUTTON_LABELS.AddToNewList}
                                    </ListModalNavigationButton>
                                </ListModalFooterLeftContainer>
                            )}
                        </>
                    )}
                </Media>
                <ListModalFooterRightContainer>
                    <CancelButton onClick={handleCancel}>{S.BUTTON_LABELS.Cancel}</CancelButton>
                    <SubmitButton onClick={handleAddPlace} disabled={selectedListID === null}>
                        {S.BUTTON_LABELS.Add}
                    </SubmitButton>
                </ListModalFooterRightContainer>
            </ListModalFooterContainer>
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    placeID: state.listModalReducer.placeID,
    user: state.userReducer.user,
})

export default reduxConnect(mapStateToProps)(withAuth(AddToRestaurantList))
