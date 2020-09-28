import CardPlaceWide, { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import React from 'react'
import { IVenue } from 'utilities/types/venue'
import { RecommendationCardContainer } from './List.style'

interface ICardPlaceWideList {
    places: IVenue[] | null
    type: CardPlaceWideEnum
}

const CardPlaceWideList: React.FC<ICardPlaceWideList> = ({ places, type }) => {
    return (
        <>
            {places
                ? places.map((place: IVenue) => (
                      <RecommendationCardContainer key={place.id}>
                          <CardPlaceWide place={place} type={type} />
                      </RecommendationCardContainer>
                  ))
                : null}
        </>
    )
}

export default CardPlaceWideList
