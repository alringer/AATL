import Snackbar from 'components/Snackbar/Snackbar'
import axios, { POST_NEW_VENUE, VENUE_LIST } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { useSnackbar } from 'notistack'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'
import { ListModalViewEnum } from 'store/listModal/listModal_types'
import { query } from 'style/device'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IVenueMetaList } from 'utilities/types/venueMetaList'
import {
    AddIcon,
    AddPlaceButton,
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
    ListModalMainAreaContainer,
    ListModalMainContentContainer,
    ListModalNavigationButton,
    ListModalTitleText,
} from './ListModal.style'

interface IReduxProps {
    placeID: number | null
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
}) => {
    const [restaurantLists, setRestaurantLists] = React.useState<IVenueMetaList[]>([])
    const [selectedListID, setSelectedListID] = React.useState<number | null>(null)
    const { enqueueSnackbar } = useSnackbar()

    React.useEffect(() => {
        // TODO: Set the current active list to the first item in the list if the list length is greater than 0
        const config = {
            headers: {
                Authorization: getTokenConfig(),
            },
        }
        axios
            .get(VENUE_LIST, config)
            .then((res) => {
                console.log('Fetched venue lists: ', res)
                setRestaurantLists(res.data)
                setSelectedListID(res.data[0].id)
            })
            .catch((err) => console.log(err))
            .finally(() => {})
    }, [])

    const handleSelect = (restaurantListID: number) => {
        if (restaurantListID) {
            setSelectedListID(restaurantListID)
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
                                    message={`${res.data.venues[0].name} ${B.ADDED_TO_LIST.Body}`}
                                    orangeMessage={`${res.data.title}`}
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
                    {restaurantLists.map((restaurantList: IVenueMetaList) => (
                        <ListModalCardButton onClick={() => handleSelect(restaurantList.id)} key={restaurantList.id}>
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
                    ))}
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
                    <AddPlaceButton onClick={handleAddPlace} disabled={selectedListID === null}>
                        {S.BUTTON_LABELS.Add}
                    </AddPlaceButton>
                </ListModalFooterRightContainer>
            </ListModalFooterContainer>
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    placeID: state.listModalReducer.placeID,
})

export default reduxConnect(mapStateToProps)(withAuth(AddToRestaurantList))
