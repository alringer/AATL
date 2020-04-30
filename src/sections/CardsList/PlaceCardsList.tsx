import PlaceCardSmall from 'components/PlaceCardSmall/PlaceCardSmall'
import React from 'react'
import { IPlace } from 'utilities/types/place'
import { ListContainer, ListSubTitle, ListTitle, PlaceCardContainer, PlaceCardsGrid } from './List.style'

interface IPlaceCardsList {
    title: string
    subTitle: string
    places: Partial<IPlace>[]
}

const PlaceCardsList: React.FC<IPlaceCardsList> = ({ title, subTitle, places }) => {
    return (
        <ListContainer>
            <ListTitle>{title}</ListTitle>
            <ListSubTitle>{subTitle}</ListSubTitle>
            <PlaceCardsGrid>
                {places.map((place: IPlace) => (
                    <PlaceCardContainer key={place.placeID}>
                        <PlaceCardSmall
                            placeID={place.placeID}
                            placeName={place.placeName}
                            placeCategories={place.placeCategories}
                            placeDescription={place.placeDescription}
                            placeImageSrc={place.placeImageSrc}
                        />
                    </PlaceCardContainer>
                ))}
            </PlaceCardsGrid>
        </ListContainer>
    )
}

export default PlaceCardsList
