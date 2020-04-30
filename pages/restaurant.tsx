import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import HaveYouBeenTo from 'components/HaveYouBeenTo/HaveYouBeenTo'
import PlaceBanner from 'components/PlaceBanner/PlaceBanner'
import React from 'react'
import PlaceCardsList from 'sections/CardsList/PlaceCardsList'
import RecommendationCardsList from 'sections/CardsList/RecommendationCardsList'
import { HaveYouBeenToData } from 'stories/HaveYouBeenTo.stories'
import { PlaceBannerData } from 'stories/PlaceBanner.stories'
import { PlaceCardsListData } from 'stories/PlaceCardSmall.stories'
import { RecommendationCardsListData } from 'stories/RecommendationCard.stories'

const Restaurant = () => {
    return (
        <>
            <PlaceBanner {...PlaceBannerData.default} />
            <RecommendationCardsList isFull={false} {...RecommendationCardsListData.default} />
            <HaveYouBeenTo
                placeID={HaveYouBeenToData.default.placeID}
                placeName={HaveYouBeenToData.default.placeName}
            />
            <PlaceCardsList {...PlaceCardsListData.default} />
            <EmailSubscription />
        </>
    )
}

export default Restaurant
