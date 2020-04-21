import { storiesOf } from '@storybook/react'
import RestaurantImage from 'assets/restaurant_image.jpg'
import RestaurantImageTwo from 'assets/restaurant_image2.jpeg'
import RecommendationCardLarge from 'components/RecommendationCardLarge/RecommendationCardLarge'
import React from 'react'

export const RecommendationCardData = {
    default: {
        recommendationID: 0,
        recommendationImage: RestaurantImage,
        restaurantName: "Nakamura's",
        restaurantAddress: 'SAN DIEGO, CALIFORNIA',
        restaurantCategories: ['SUSHI, ASIAN BBQ'],
        recommendationTitle: 'An amazingly rich and diverse range of edible delights',
        recommendationDescription: 'The only moment, the only life we have is in the NOW.',
        recommendationAuthorName: 'by Justin Mary Michaels',
        recommendationAuthorTitle: 'FOODIE ASSOCIATE OF CARLSBAD, CALIFORNIA',
    },
    defaultDifferentImage: {
        recommendationID: 0,
        recommendationImage: RestaurantImageTwo,
        restaurantName: "Nakamura's",
        restaurantAddress: 'SAN DIEGO, CALIFORNIA',
        restaurantCategories: ['SUSHI, ASIAN BBQ'],
        recommendationTitle: 'An amazingly rich and diverse range of edible delights',
        recommendationDescription: 'The only moment, the only life we have is in the NOW.',
        recommendationAuthorName: 'by Justin Mary Michaels',
        recommendationAuthorTitle: 'FOODIE ASSOCIATE OF CARLSBAD, CALIFORNIA',
    },
    longTitleAndDescription: {
        recommendationID: 0,
        recommendationImage: RestaurantImageTwo,
        restaurantName: 'Super Tasty Burger And Pizza Kitchen Place',
        restaurantAddress: 'SAN DIEGO, CALIFORNIA',
        restaurantCategories: ['SUSHI, ASIAN BBQ'],
        recommendationTitle: 'An amazingly rich and diverse range of edible delights',
        recommendationDescription:
            'The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening … The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening … ',
        recommendationAuthorName: 'by Justin Mary Michaels',
        recommendationAuthorTitle: 'FOODIE ASSOCIATE OF CARLSBAD, CALIFORNIA',
    },
    longTitle: {
        recommendationID: 0,
        recommendationImage: RestaurantImageTwo,
        restaurantName: 'Super Tasty Burger And Pizza Kitchen Place',
        restaurantAddress: 'SAN DIEGO, CALIFORNIA',
        restaurantCategories: ['SUSHI, ASIAN BBQ'],
        recommendationTitle: 'An amazingly rich and diverse range of edible delights',
        recommendationDescription: 'The only moment, the only life we have is in the NOW.',
        recommendationAuthorName: 'by Justin Mary Michaels',
        recommendationAuthorTitle: 'FOODIE ASSOCIATE OF CARLSBAD, CALIFORNIA',
    },
    longDescription: {
        recommendationID: 0,
        recommendationImage: RestaurantImageTwo,
        restaurantName: "Nakamura's",
        restaurantAddress: 'SAN DIEGO, CALIFORNIA',
        restaurantCategories: ['SUSHI, ASIAN BBQ'],
        recommendationTitle: 'An amazingly rich and diverse range of edible delights',
        recommendationDescription:
            'The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening … The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening … ',
        recommendationAuthorName: 'by Justin Mary Michaels',
        recommendationAuthorTitle: 'FOODIE ASSOCIATE OF CARLSBAD, CALIFORNIA',
    },
}

storiesOf('Recommendation Card Large', module)
    .add('Default', () => {
        return (
            <RecommendationCardLarge
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
    .add('Variant - Different Image', () => {
        return (
            <RecommendationCardLarge
                recommendationID={RecommendationCardData.defaultDifferentImage.recommendationID}
                recommendationImage={RecommendationCardData.defaultDifferentImage.recommendationImage}
                restaurantName={RecommendationCardData.defaultDifferentImage.restaurantName}
                restaurantAddress={RecommendationCardData.defaultDifferentImage.restaurantAddress}
                restaurantCategories={RecommendationCardData.defaultDifferentImage.restaurantCategories}
                recommendationTitle={RecommendationCardData.defaultDifferentImage.recommendationTitle}
                recommendationDescription={RecommendationCardData.defaultDifferentImage.recommendationDescription}
                recommendationAuthorName={RecommendationCardData.defaultDifferentImage.recommendationAuthorName}
                recommendationAuthorTitle={RecommendationCardData.defaultDifferentImage.recommendationAuthorTitle}
            />
        )
    })
    .add('Variant - Long Name', () => {
        return (
            <RecommendationCardLarge
                recommendationID={RecommendationCardData.longTitle.recommendationID}
                recommendationImage={RecommendationCardData.longTitle.recommendationImage}
                restaurantName={RecommendationCardData.longTitle.restaurantName}
                restaurantAddress={RecommendationCardData.longTitle.restaurantAddress}
                restaurantCategories={RecommendationCardData.longTitle.restaurantCategories}
                recommendationTitle={RecommendationCardData.longTitle.recommendationTitle}
                recommendationDescription={RecommendationCardData.longTitle.recommendationDescription}
                recommendationAuthorName={RecommendationCardData.longTitle.recommendationAuthorName}
                recommendationAuthorTitle={RecommendationCardData.longTitle.recommendationAuthorTitle}
            />
        )
    })
    .add('Variant - Long Description', () => {
        return (
            <RecommendationCardLarge
                recommendationID={RecommendationCardData.longDescription.recommendationID}
                recommendationImage={RecommendationCardData.longDescription.recommendationImage}
                restaurantName={RecommendationCardData.longDescription.restaurantName}
                restaurantAddress={RecommendationCardData.longDescription.restaurantAddress}
                restaurantCategories={RecommendationCardData.longDescription.restaurantCategories}
                recommendationTitle={RecommendationCardData.longDescription.recommendationTitle}
                recommendationDescription={RecommendationCardData.longDescription.recommendationDescription}
                recommendationAuthorName={RecommendationCardData.longDescription.recommendationAuthorName}
                recommendationAuthorTitle={RecommendationCardData.longDescription.recommendationAuthorTitle}
            />
        )
    })
    .add('Variant - Long Name and Description', () => {
        return (
            <RecommendationCardLarge
                recommendationID={RecommendationCardData.longTitleAndDescription.recommendationID}
                recommendationImage={RecommendationCardData.longTitleAndDescription.recommendationImage}
                restaurantName={RecommendationCardData.longTitleAndDescription.restaurantName}
                restaurantAddress={RecommendationCardData.longTitleAndDescription.restaurantAddress}
                restaurantCategories={RecommendationCardData.longTitleAndDescription.restaurantCategories}
                recommendationTitle={RecommendationCardData.longTitleAndDescription.recommendationTitle}
                recommendationDescription={RecommendationCardData.longTitleAndDescription.recommendationDescription}
                recommendationAuthorName={RecommendationCardData.longTitleAndDescription.recommendationAuthorName}
                recommendationAuthorTitle={RecommendationCardData.longTitleAndDescription.recommendationAuthorTitle}
            />
        )
    })
