import CardPlaceSmall from 'components/CardPlaceSmall/CardPlaceSmall'
import { ViewMoreButton } from 'components/MostPopular/MostPopular.style'
import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import { useRouter } from 'next/router'
import React from 'react'
import { IVenue } from 'utilities/types/venue'
import { ListContainer, ListSubTitle, ListTitle, PlaceCardContainer, PlaceCardsGrid } from './List.style'

interface IPlaceCardsList {
    title: string
    subTitle: string
    places: IVenue[] | null
    category: string
}

const PlaceCardsList: React.FC<IPlaceCardsList> = ({ title, subTitle, places, category }) => {
    const router = useRouter()
    const handleViewMore = () => {
        router.push(`${R.ROUTE_ITEMS.search}/?place=${category}`)
    }

    const truncatedPlaces = places ? places.slice(0, 6) : []
    return (
        <ListContainer>
            <ListTitle>{title}</ListTitle>
            <ListSubTitle>{subTitle}</ListSubTitle>
            <PlaceCardsGrid>
                {truncatedPlaces.map((place: IVenue) => (
                    <PlaceCardContainer key={place.id}>
                        <CardPlaceSmall place={place} />
                    </PlaceCardContainer>
                ))}
            </PlaceCardsGrid>
            <ViewMoreButton onClick={handleViewMore}>{S.BUTTON_LABELS.ViewMore}</ViewMoreButton>
        </ListContainer>
    )
}

export default PlaceCardsList
