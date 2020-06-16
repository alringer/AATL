import CardPlaceWide, { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import React from 'react'
import { IPlace } from 'utilities/types/place'
import { RecommendationCardContainer } from './List.style'

interface ICardPlaceWideList {
    places: Partial<IPlace>[]
    type: CardPlaceWideEnum
}

const CardPlaceWideList: React.FC<ICardPlaceWideList> = ({ places, type }) => {
    return (
        <>
            {places.map((place: IPlace) => (
                <RecommendationCardContainer key={place.placeID}>
                    <CardPlaceWide {...place} type={type} />
                </RecommendationCardContainer>
            ))}
        </>
    )
}

export default CardPlaceWideList
