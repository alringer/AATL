import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import HaveYouBeenTo from 'components/HaveYouBeenTo/HaveYouBeenTo'
import PlaceBanner from 'components/PlaceBanner/PlaceBanner'
import { GetServerSideProps } from 'next'
import React from 'react'
import PlaceCardsList from 'sections/CardsList/CardPlaceSmallList'
import RecommendationCardsList from 'sections/CardsList/CardRecommendationWideList'
import { PlaceCardsListData } from 'stories/CardPlaceSmall.stories'
import { RecommendationCardsListData } from 'stories/CardRecommendationWide.stories'
import { HaveYouBeenToData } from 'stories/HaveYouBeenTo.stories'
import { PlaceBannerData } from 'stories/PlaceBanner.stories'

interface IRestaurantProps {}

const Restaurant: React.FC<IRestaurantProps> = () => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    // let categoryList = []
    // await axios.get(FETCH_CATEGORIES).then((res) => {
    //     // categoryList = res.data
    // })
    const restaurantID = context.params.id
    console.log('TODO: Query restaurant with ID: ', restaurantID)
    return {
        props: {},
    }
}

export default Restaurant
