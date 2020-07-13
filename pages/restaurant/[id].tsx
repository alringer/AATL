import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import HaveYouBeenTo from 'components/HaveYouBeenTo/HaveYouBeenTo'
import PlaceBanner from 'components/PlaceBanner/PlaceBanner'
import axios, { FETCH_RESTAURANT } from 'config/AxiosConfig'
import { GetServerSideProps } from 'next'
import React from 'react'
import PlaceCardsList from 'sections/CardsList/CardPlaceSmallList'
import RecommendationCardsList from 'sections/CardsList/CardRecommendationWideList'
import { PlaceCardsListData } from 'stories/CardPlaceSmall.stories'
import { RecommendationCardsListData } from 'stories/CardRecommendationWide.stories'
import { HaveYouBeenToData } from 'stories/HaveYouBeenTo.stories'
import { PlaceBannerData } from 'stories/PlaceBanner.stories'
import withAuth from 'utilities/hocs/withAuth'

interface IRestaurantProps {
    restaurantID: number
}

const Restaurant = ({ restaurantID, token }) => {
    React.useEffect(() => {
        axios
            .get(FETCH_RESTAURANT(Number(restaurantID)))
            .then((res) => {
                console.log('Fetching restaurant: ', res)
            })
            .catch((err) => console.log('Error: ', err))
    }, [])

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
    const restaurantID = context.params.id
    // if (restaurantID) {
    //     await axios
    //         .get(FETCH_RESTAURANT(Number(restaurantID)), {
    //             headers: {
    //                 Authorization:
    //             }
    //         })
    //         .then((res) => {
    //             console.log('Fetching restaurant: ', res)
    //         })
    //         .catch((err) => console.log('Error: ', err))
    // }
    return {
        props: {
            restaurantID: restaurantID,
        },
    }
}

export default withAuth(Restaurant)
