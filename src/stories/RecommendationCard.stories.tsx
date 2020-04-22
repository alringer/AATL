import { storiesOf } from '@storybook/react'
import RestaurantImage from 'assets/restaurant_image.jpg'
import RestaurantImageTwo from 'assets/restaurant_image2.jpeg'
import RecommendationCard from 'components/RecommendationCard/RecommendationCard'
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
    longRestaurantName: {
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
    longRecommendationTitle: {
        recommendationID: 0,
        recommendationImage: RestaurantImageTwo,
        restaurantName: "Nakamura's",
        restaurantAddress: 'SAN DIEGO, CALIFORNIA',
        restaurantCategories: ['SUSHI, ASIAN BBQ'],
        recommendationTitle:
            'Truly amazing coffee! Superb food, excellent service. This restaurant has it all. Definitely recommend',
        recommendationDescription: 'The only moment, the only life we have is in the NOW.',
        recommendationAuthorName: 'by Justin Mary Michaels',
        recommendationAuthorTitle: 'FOODIE ASSOCIATE OF CARLSBAD, CALIFORNIA',
    },
    longRestaurantNameAndDescriptionAndRecommendationTitle: {
        recommendationID: 0,
        recommendationImage: RestaurantImageTwo,
        restaurantName: 'Super Tasty Burger And Pizza Kitchen Place',
        restaurantAddress: 'SAN DIEGO, CALIFORNIA',
        restaurantCategories: ['SUSHI, ASIAN BBQ'],
        recommendationTitle:
            'Truly amazing coffee! Superb food, excellent service. This restaurant has it all. Definitely recommend',
        recommendationDescription:
            'The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening … The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening … ',
        recommendationAuthorName: 'by Justin Mary Michaels',
        recommendationAuthorTitle: 'FOODIE ASSOCIATE OF CARLSBAD, CALIFORNIA',
    },
}

storiesOf('Recommendation Card', module)
    .add('Default Full Card', () => {
        return (
            <RecommendationCard
                isFull={true}
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
    .add('Variant Full Card - Different Image', () => {
        return (
            <RecommendationCard
                isFull={true}
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
    .add('Variant Full Card - Long Name', () => {
        return (
            <RecommendationCard
                isFull={true}
                recommendationID={RecommendationCardData.longRestaurantName.recommendationID}
                recommendationImage={RecommendationCardData.longRestaurantName.recommendationImage}
                restaurantName={RecommendationCardData.longRestaurantName.restaurantName}
                restaurantAddress={RecommendationCardData.longRestaurantName.restaurantAddress}
                restaurantCategories={RecommendationCardData.longRestaurantName.restaurantCategories}
                recommendationTitle={RecommendationCardData.longRestaurantName.recommendationTitle}
                recommendationDescription={RecommendationCardData.longRestaurantName.recommendationDescription}
                recommendationAuthorName={RecommendationCardData.longRestaurantName.recommendationAuthorName}
                recommendationAuthorTitle={RecommendationCardData.longRestaurantName.recommendationAuthorTitle}
            />
        )
    })
    .add('Variant Full Card - Long Description', () => {
        return (
            <RecommendationCard
                isFull={true}
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
    .add('Variant Full Card - Long Name, Description, and Title', () => {
        return (
            <RecommendationCard
                isFull={true}
                recommendationID={
                    RecommendationCardData.longRestaurantNameAndDescriptionAndRecommendationTitle.recommendationID
                }
                recommendationImage={
                    RecommendationCardData.longRestaurantNameAndDescriptionAndRecommendationTitle.recommendationImage
                }
                restaurantName={
                    RecommendationCardData.longRestaurantNameAndDescriptionAndRecommendationTitle.restaurantName
                }
                restaurantAddress={
                    RecommendationCardData.longRestaurantNameAndDescriptionAndRecommendationTitle.restaurantAddress
                }
                restaurantCategories={
                    RecommendationCardData.longRestaurantNameAndDescriptionAndRecommendationTitle.restaurantCategories
                }
                recommendationTitle={
                    RecommendationCardData.longRestaurantNameAndDescriptionAndRecommendationTitle.recommendationTitle
                }
                recommendationDescription={
                    RecommendationCardData.longRestaurantNameAndDescriptionAndRecommendationTitle
                        .recommendationDescription
                }
                recommendationAuthorName={
                    RecommendationCardData.longRestaurantNameAndDescriptionAndRecommendationTitle
                        .recommendationAuthorName
                }
                recommendationAuthorTitle={
                    RecommendationCardData.longRestaurantNameAndDescriptionAndRecommendationTitle
                        .recommendationAuthorTitle
                }
            />
        )
    })
    .add('Default Simple Card', () => {
        return (
            <RecommendationCard
                isFull={false}
                recommendationID={RecommendationCardData.default.recommendationID}
                recommendationImage={RecommendationCardData.default.recommendationImage}
                recommendationTitle={RecommendationCardData.default.recommendationTitle}
                recommendationDescription={RecommendationCardData.default.recommendationDescription}
                recommendationAuthorName={RecommendationCardData.default.recommendationAuthorName}
                recommendationAuthorTitle={RecommendationCardData.default.recommendationAuthorTitle}
            />
        )
    })
    .add('Variant Simple Card - Long Name, Description, and Title', () => {
        return (
            <RecommendationCard
                isFull={false}
                recommendationID={
                    RecommendationCardData.longRestaurantNameAndDescriptionAndRecommendationTitle.recommendationID
                }
                recommendationImage={
                    RecommendationCardData.longRestaurantNameAndDescriptionAndRecommendationTitle.recommendationImage
                }
                recommendationTitle={
                    RecommendationCardData.longRestaurantNameAndDescriptionAndRecommendationTitle.recommendationTitle
                }
                recommendationDescription={
                    RecommendationCardData.longRestaurantNameAndDescriptionAndRecommendationTitle
                        .recommendationDescription
                }
                recommendationAuthorName={
                    RecommendationCardData.longRestaurantNameAndDescriptionAndRecommendationTitle
                        .recommendationAuthorName
                }
                recommendationAuthorTitle={
                    RecommendationCardData.longRestaurantNameAndDescriptionAndRecommendationTitle
                        .recommendationAuthorTitle
                }
            />
        )
    })
