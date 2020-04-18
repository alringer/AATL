import { storiesOf } from '@storybook/react'
import RestaurantImage from 'assets/restaurant_image.jpg'
import RecommendationCard from 'components/RecommendationCard/RecommendationCard'
import React from 'react'

export const RecommendationCardData = {
    default: {
        recommendationID: 0,
        recommendationImage: RestaurantImage,
        restaurantName: "Nakamura'",
        restaurantAddress: 'SAN DIEGO, CALIFORNIA',
        restaurantCategories: 'SUSHI, ASIAN BBQ', //TODO: Take in arrays of strings and format them
        recommendationTitle: 'An amazingly rich and diverse range of edible delights',
        recommendationDescription:
            'The only momnet, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen...',
        recommendationAuthorName: 'by Justin Mary Michaels',
        recommendationAuthorTitle: 'FOODIE ASSOCIATE OF CARLSBAD, CALIFORNIA',
    },
}

storiesOf('Recommendation Card', module).add('Default Recommendation Card', () => {
    return (
        <RecommendationCard
            recommendationID={RecommendationCardData.default.recommendationID}
            recommendationImage={RecommendationCardData.default.recommendationImage}
            restaurantName={RecommendationCardData.default.restaurantName}
            restaurantAddress={RecommendationCardData.default.restaurantAddress}
            restaurantCategories={RecommendationCardData.default.restaurantCategories}
            recommendationTitle={RecommendationCardData.default.recommendationTitle}
            recommendationDescription={RecommendationCardData.default.recommendationDescription}
            recommendationAuthorName={RecommendationCardData.default.recommendationAuthorName}
            recommendationAuthorTitle={RecommendationCardData.default.recommendationAuthorTitle}
        />
    )
})
