import * as S from 'constants/StringConstants'
import React from 'react'
import {
    ListModalCardContainer,
    ListModalCardSubTitle,
    ListModalCardTextContainer,
    ListModalCardTitle,
    ListModalFooterContainer,
    ListModalHeaderContainer,
    ListModalHeaderText,
    ListModalMainAreaContainer,
    ListModalTitleText,
} from './ListModal.style'

interface IAddToRestaurantListProps {}

interface IMockRestaurantList {
    title: string
    numRestaurants: number
}

const mockRestaurantLists: IMockRestaurantList[] = [
    {
        title: 'The Bestest of the Bestest',
        numRestaurants: 77,
    },
    {
        title: "Places I've been",
        numRestaurants: 123,
    },
]

const AddToRestaurantList: React.FC<IAddToRestaurantListProps> = () => {
    const [restaurantLists, setRestaurantLists] = React.useState<IMockRestaurantList[]>([])

    React.useEffect(() => {
        // TODO: Query for current user's restaurant lists
        setRestaurantLists(mockRestaurantLists)
    }, [])

    return (
        <>
            <ListModalHeaderContainer>
                <ListModalHeaderText>{S.LIST_MODAL.AddToRestaurant.Header}</ListModalHeaderText>
            </ListModalHeaderContainer>
            <ListModalMainAreaContainer>
                <ListModalTitleText>{S.LIST_MODAL.AddToRestaurant.Title}</ListModalTitleText>
                {restaurantLists.map((restaurantList: IMockRestaurantList) => (
                    <ListModalCardContainer>
                        <ListModalCardTextContainer>
                            <ListModalCardTitle>{restaurantList.title}</ListModalCardTitle>
                        </ListModalCardTextContainer>
                        <ListModalCardSubTitle>{restaurantList.numRestaurants}</ListModalCardSubTitle>
                    </ListModalCardContainer>
                ))}
            </ListModalMainAreaContainer>
            <ListModalFooterContainer>Footer</ListModalFooterContainer>
        </>
    )
}

export default AddToRestaurantList
