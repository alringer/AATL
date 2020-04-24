import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import React from 'react'
import RecommendationCardsList from 'sections/CardsList/RecommendationCardsList'
import { RecommendationCardsListData } from 'stories/RecommendationCard.stories'

const Restaurant = () => {
    return (
        <>
            <RecommendationCardsList
                isFull={true}
                title={RecommendationCardsListData.default.title}
                subTitle={RecommendationCardsListData.default.subTitle}
                recommendations={RecommendationCardsListData.default.recommendations}
            />
            <EmailSubscription />
        </>
    )
}

export default Restaurant
