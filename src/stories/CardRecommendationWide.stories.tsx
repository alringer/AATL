import { storiesOf } from '@storybook/react'
import PlaceImage from 'assets/mock-images/restaurant_image.jpg'
import PlaceImageTwo from 'assets/mock-images/restaurant_image2.jpeg'
import CardRecommendationWide from 'components/CardRecommendationWide/CardRecommendationWide'
import React from 'react'
import RecommendationCardsList from 'sections/CardsList/CardRecommendationWideList'

export const RecommendationCardData = {
    default: {
        recommendationID: 0,
        recommendationImage: PlaceImage,
        placeName: "Nakamura's",
        placeAddress: 'SAN DIEGO, CALIFORNIA',
        placeCategories: ['SUSHI, ASIAN BBQ'],
        recommendationTitle: 'An amazingly rich and diverse range of edible delights',
        recommendationDescription: 'The only moment, the only life we have is in the NOW.',
        recommendationAuthorName: 'by Justin Mary Michaels',
        recommendationAuthorTitle: 'FOODIE ASSOCIATE OF CARLSBAD, CALIFORNIA',
    },
    defaultDifferentImage: {
        recommendationID: 1,
        recommendationImage: PlaceImageTwo,
        placeName: "Nakamura's",
        placeAddress: 'SAN DIEGO, CALIFORNIA',
        placeCategories: ['SUSHI, ASIAN BBQ'],
        recommendationTitle: 'An amazingly rich and diverse range of edible delights',
        recommendationDescription: 'The only moment, the only life we have is in the NOW.',
        recommendationAuthorName: 'by Justin Mary Michaels',
        recommendationAuthorTitle: 'FOODIE ASSOCIATE OF CARLSBAD, CALIFORNIA',
    },
    longPlaceName: {
        recommendationID: 2,
        recommendationImage: PlaceImageTwo,
        placeName: 'Super Tasty Burger And Pizza Kitchen Place',
        placeAddress: 'SAN DIEGO, CALIFORNIA',
        placeCategories: ['SUSHI, ASIAN BBQ'],
        recommendationTitle: 'An amazingly rich and diverse range of edible delights',
        recommendationDescription: 'The only moment, the only life we have is in the NOW.',
        recommendationAuthorName: 'by Justin Mary Michaels',
        recommendationAuthorTitle: 'FOODIE ASSOCIATE OF CARLSBAD, CALIFORNIA',
    },
    longDescription: {
        recommendationID: 3,
        recommendationImage: PlaceImageTwo,
        placeName: "Nakamura's",
        placeAddress: 'SAN DIEGO, CALIFORNIA',
        placeCategories: ['SUSHI, ASIAN BBQ'],
        recommendationTitle: 'An amazingly rich and diverse range of edible delights',
        recommendationDescription:
            'The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening … The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening … ',
        recommendationAuthorName: 'by Justin Mary Michaels',
        recommendationAuthorTitle: 'FOODIE ASSOCIATE OF CARLSBAD, CALIFORNIA',
    },
    longRecommendationTitle: {
        recommendationID: 4,
        recommendationImage: PlaceImageTwo,
        placeName: "Nakamura's",
        placeAddress: 'SAN DIEGO, CALIFORNIA',
        placeCategories: ['SUSHI, ASIAN BBQ'],
        recommendationTitle:
            'Truly amazing coffee! Superb food, excellent service. This place has it all. Definitely recommend',
        recommendationDescription: 'The only moment, the only life we have is in the NOW.',
        recommendationAuthorName: 'by Justin Mary Michaels',
        recommendationAuthorTitle: 'FOODIE ASSOCIATE OF CARLSBAD, CALIFORNIA',
    },
    longPlaceNameAndDescriptionAndRecommendationTitle: {
        recommendationID: 5,
        recommendationImage: PlaceImageTwo,
        placeName: 'Super Tasty Burger And Pizza Kitchen Place',
        placeAddress: 'SAN DIEGO, CALIFORNIA',
        placeCategories: ['SUSHI, ASIAN BBQ'],
        recommendationTitle:
            'Truly amazing coffee! Superb food, excellent service. This place has it all. Definitely recommend',
        recommendationDescription:
            'The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening … The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening … ',
        recommendationAuthorName: 'by Justin Mary Michaels',
        recommendationAuthorTitle: 'FOODIE ASSOCIATE OF CARLSBAD, CALIFORNIA',
    },
}

export const RecommendationCardsListData = {
    default: {
        title: 'Recommendations',
        subTitle: 'Recommendations of Sushi Ota by locals who love sushi.',
        recommendations: Object.entries(RecommendationCardData).map((entries: any[]) => {
            const recommendationCardData = entries[1]
            return recommendationCardData
        }),
    },
}

storiesOf('Card: Wide Recommendation Card', module)
    .add('Default Full Card', () => {
        return (
            <CardRecommendationWide
                isFull={true}
                recommendationID={RecommendationCardData.default.recommendationID}
                recommendationImage={RecommendationCardData.default.recommendationImage}
                placeName={RecommendationCardData.default.placeName}
                placeAddress={RecommendationCardData.default.placeAddress}
                placeCategories={RecommendationCardData.default.placeCategories}
                recommendationTitle={RecommendationCardData.default.recommendationTitle}
                recommendationDescription={RecommendationCardData.default.recommendationDescription}
                recommendationAuthorName={RecommendationCardData.default.recommendationAuthorName}
                recommendationAuthorTitle={RecommendationCardData.default.recommendationAuthorTitle}
            />
        )
    })
    .add('Variant Full Card - Different Image', () => {
        return (
            <CardRecommendationWide
                isFull={true}
                recommendationID={RecommendationCardData.defaultDifferentImage.recommendationID}
                recommendationImage={RecommendationCardData.defaultDifferentImage.recommendationImage}
                placeName={RecommendationCardData.defaultDifferentImage.placeName}
                placeAddress={RecommendationCardData.defaultDifferentImage.placeAddress}
                placeCategories={RecommendationCardData.defaultDifferentImage.placeCategories}
                recommendationTitle={RecommendationCardData.defaultDifferentImage.recommendationTitle}
                recommendationDescription={RecommendationCardData.defaultDifferentImage.recommendationDescription}
                recommendationAuthorName={RecommendationCardData.defaultDifferentImage.recommendationAuthorName}
                recommendationAuthorTitle={RecommendationCardData.defaultDifferentImage.recommendationAuthorTitle}
            />
        )
    })
    .add('Variant Full Card - Long Name', () => {
        return (
            <CardRecommendationWide
                isFull={true}
                recommendationID={RecommendationCardData.longPlaceName.recommendationID}
                recommendationImage={RecommendationCardData.longPlaceName.recommendationImage}
                placeName={RecommendationCardData.longPlaceName.placeName}
                placeAddress={RecommendationCardData.longPlaceName.placeAddress}
                placeCategories={RecommendationCardData.longPlaceName.placeCategories}
                recommendationTitle={RecommendationCardData.longPlaceName.recommendationTitle}
                recommendationDescription={RecommendationCardData.longPlaceName.recommendationDescription}
                recommendationAuthorName={RecommendationCardData.longPlaceName.recommendationAuthorName}
                recommendationAuthorTitle={RecommendationCardData.longPlaceName.recommendationAuthorTitle}
            />
        )
    })
    .add('Variant Full Card - Long Description', () => {
        return (
            <CardRecommendationWide
                isFull={true}
                recommendationID={RecommendationCardData.longDescription.recommendationID}
                recommendationImage={RecommendationCardData.longDescription.recommendationImage}
                placeName={RecommendationCardData.longDescription.placeName}
                placeAddress={RecommendationCardData.longDescription.placeAddress}
                placeCategories={RecommendationCardData.longDescription.placeCategories}
                recommendationTitle={RecommendationCardData.longDescription.recommendationTitle}
                recommendationDescription={RecommendationCardData.longDescription.recommendationDescription}
                recommendationAuthorName={RecommendationCardData.longDescription.recommendationAuthorName}
                recommendationAuthorTitle={RecommendationCardData.longDescription.recommendationAuthorTitle}
            />
        )
    })
    .add('Variant Full Card - Long Name, Description, and Title', () => {
        return (
            <CardRecommendationWide
                isFull={true}
                recommendationID={
                    RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.recommendationID
                }
                recommendationImage={
                    RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.recommendationImage
                }
                placeName={RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.placeName}
                placeAddress={RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.placeAddress}
                placeCategories={
                    RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.placeCategories
                }
                recommendationTitle={
                    RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.recommendationTitle
                }
                recommendationDescription={
                    RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.recommendationDescription
                }
                recommendationAuthorName={
                    RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.recommendationAuthorName
                }
                recommendationAuthorTitle={
                    RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.recommendationAuthorTitle
                }
            />
        )
    })
    .add('Default Simple Card', () => {
        return (
            <CardRecommendationWide
                isFull={false}
                recommendationID={RecommendationCardData.default.recommendationID}
                recommendationImage={RecommendationCardData.default.recommendationImage}
                placeName={RecommendationCardData.default.placeName}
                placeAddress={RecommendationCardData.default.placeAddress}
                placeCategories={RecommendationCardData.default.placeCategories}
                recommendationTitle={RecommendationCardData.default.recommendationTitle}
                recommendationDescription={RecommendationCardData.default.recommendationDescription}
                recommendationAuthorName={RecommendationCardData.default.recommendationAuthorName}
                recommendationAuthorTitle={RecommendationCardData.default.recommendationAuthorTitle}
            />
        )
    })
    .add('Variant Simple Card - Long Name, Description, and Title', () => {
        return (
            <CardRecommendationWide
                isFull={false}
                recommendationID={
                    RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.recommendationID
                }
                recommendationImage={
                    RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.recommendationImage
                }
                placeName={RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.placeName}
                placeAddress={RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.placeAddress}
                placeCategories={
                    RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.placeCategories
                }
                recommendationTitle={
                    RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.recommendationTitle
                }
                recommendationDescription={
                    RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.recommendationDescription
                }
                recommendationAuthorName={
                    RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.recommendationAuthorName
                }
                recommendationAuthorTitle={
                    RecommendationCardData.longPlaceNameAndDescriptionAndRecommendationTitle.recommendationAuthorTitle
                }
            />
        )
    })
    .add('Section - Full Card', () => {
        return (
            <RecommendationCardsList
                isFull={true}
                title={RecommendationCardsListData.default.title}
                subTitle={RecommendationCardsListData.default.subTitle}
                recommendations={RecommendationCardsListData.default.recommendations}
            />
        )
    })
    .add('Section - Simple Card', () => {
        return (
            <RecommendationCardsList
                isFull={false}
                title={RecommendationCardsListData.default.title}
                subTitle={RecommendationCardsListData.default.subTitle}
                recommendations={RecommendationCardsListData.default.recommendations}
            />
        )
    })
