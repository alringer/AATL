import CallToAction from 'components/CallToAction/CallToAction'
import CardPlaceSmall from 'components/CardPlaceSmall/CardPlaceSmall'
import { ViewMoreButton } from 'components/MostPopular/MostPopular.style'
import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import { useRouter } from 'next/router'
import React from 'react'
import withCallToAction, { IWithCallToActionInjectedProps } from 'utilities/hocs/withCallToAction'
import { IVenue } from 'utilities/types/venue'
import { ListContainer, ListSubTitle, ListTitle, PlaceCardContainer, PlaceCardsGrid } from './List.style'

interface IPlaceCardsList extends IWithCallToActionInjectedProps {
    title: string
    subTitle: string
    places: IVenue[] | null
    category: string
}

const PlaceCardsList: React.FC<IPlaceCardsList> = ({ title, subTitle, places, category, placeToShowID }) => {
    const [callToActionID, setCallToActionID] = React.useState<number | null>(null)

    const router = useRouter()
    const truncatedPlaces = places ? places.slice(0, 6) : []

    React.useEffect(() => {
        setCallToActionID(placeToShowID === -1 ? null : placeToShowID)
    }, [placeToShowID])

    const handleViewMore = () => {
        router.push(`${R.ROUTE_ITEMS.search}/?place=${category}`)
    }

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
                {callToActionID !== null && callToActionID !== undefined ? (
                    <CallToAction isLarge={false} placeID={callToActionID} />
                ) : null}
            </PlaceCardsGrid>
            <ViewMoreButton onClick={handleViewMore}>{S.BUTTON_LABELS.ViewMore}</ViewMoreButton>
        </ListContainer>
    )
}

export default withCallToAction(PlaceCardsList)
