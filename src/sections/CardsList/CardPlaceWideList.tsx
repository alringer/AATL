import CallToAction from 'components/CallToAction/CallToAction'
import CardPlaceWide, { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import React from 'react'
import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import withCallToAction, { IWithCallToActionInjectedProps } from 'utilities/hocs/withCallToAction'
import { IVenue } from 'utilities/types/venue'
import { RecommendationCardContainer } from './List.style'

interface ICardPlaceWideList extends IWithCallToActionInjectedProps {
    places: IVenue[] | null
    type: CardPlaceWideEnum
}

const CardPlaceWideList: React.FC<ICardPlaceWideList> = ({ places, type, placeToShowID }) => {
    const [callToActionID, setCallToActionID] = React.useState<number | null>(null)
    React.useEffect(() => {
        setCallToActionID(placeToShowID === -1 ? null : placeToShowID)
    }, [placeToShowID])
    return (
        <ContentWrapper>
            {places ? (
                <>
                    {places.map((place: IVenue) => (
                        <RecommendationCardContainer key={place.id}>
                            <CardPlaceWide place={place} type={type} />
                        </RecommendationCardContainer>
                    ))}
                    {callToActionID !== null && callToActionID !== undefined ? (
                        <RecommendationCardContainer key={callToActionID}>
                            <CallToAction isLarge={true} placeID={callToActionID} />
                        </RecommendationCardContainer>
                    ) : null}
                </>
            ) : null}
        </ContentWrapper>
    )
}

export default withCallToAction(CardPlaceWideList)
