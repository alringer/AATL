import { storiesOf } from '@storybook/react'
import PlaceImage from 'assets/restaurant_image.jpg'
import PlaceImageTwo from 'assets/restaurant_image2.jpeg'
import PlaceCardSmall from 'components/PlaceCardSmall/PlaceCardSmall'
import React from 'react'

export const PlaceCardData = {
    default: {
        placeID: 0,
        placeName: "Nakamura's",
        placeCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        placeDescription: 'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        placeImageSrc: PlaceImage,
    },
    defaultDifferentImage: {
        placeID: 0,
        placeName: "Nakamura's",
        placeCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        placeDescription: 'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        placeImageSrc: PlaceImageTwo,
    },
    longName: {
        placeID: 0,
        placeName: 'Super Tasty Burger And Pizza Kitchen Place',
        placeCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        placeDescription: 'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        placeImageSrc: PlaceImage,
    },
    longDescription: {
        placeID: 0,
        placeName: "Nakamura's",
        placeCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        placeDescription:
            'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego. The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego. The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        placeImageSrc: PlaceImage,
    },
    longNameAndDescription: {
        placeID: 0,
        placeName: 'Super Tasty Burger And Pizza Kitchen Place',
        placeCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        placeDescription:
            'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego. The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego. The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        placeImageSrc: PlaceImage,
    },
}

storiesOf('Place Card Small', module)
    .add('Default', () => {
        return (
            <PlaceCardSmall
                placeID={PlaceCardData.default.placeID}
                placeName={PlaceCardData.default.placeName}
                placeCategories={PlaceCardData.default.placeCategories}
                placeDescription={PlaceCardData.default.placeDescription}
                placeImageSrc={PlaceCardData.default.placeImageSrc}
            />
        )
    })
    .add('Variant - Different Image', () => {
        return (
            <PlaceCardSmall
                placeID={PlaceCardData.defaultDifferentImage.placeID}
                placeName={PlaceCardData.defaultDifferentImage.placeName}
                placeCategories={PlaceCardData.defaultDifferentImage.placeCategories}
                placeDescription={PlaceCardData.defaultDifferentImage.placeDescription}
                placeImageSrc={PlaceCardData.defaultDifferentImage.placeImageSrc}
            />
        )
    })
    .add('Variant - Long Name', () => {
        return (
            <PlaceCardSmall
                placeID={PlaceCardData.longName.placeID}
                placeName={PlaceCardData.longName.placeName}
                placeCategories={PlaceCardData.longName.placeCategories}
                placeDescription={PlaceCardData.longName.placeDescription}
                placeImageSrc={PlaceCardData.longName.placeImageSrc}
            />
        )
    })
    .add('Variant - Long Description', () => {
        return (
            <PlaceCardSmall
                placeID={PlaceCardData.longDescription.placeID}
                placeName={PlaceCardData.longDescription.placeName}
                placeCategories={PlaceCardData.longDescription.placeCategories}
                placeDescription={PlaceCardData.longDescription.placeDescription}
                placeImageSrc={PlaceCardData.longDescription.placeImageSrc}
            />
        )
    })
    .add('Variant - Long Name and Description', () => {
        return (
            <PlaceCardSmall
                placeID={PlaceCardData.longNameAndDescription.placeID}
                placeName={PlaceCardData.longNameAndDescription.placeName}
                placeCategories={PlaceCardData.longNameAndDescription.placeCategories}
                placeDescription={PlaceCardData.longNameAndDescription.placeDescription}
                placeImageSrc={PlaceCardData.longNameAndDescription.placeImageSrc}
            />
        )
    })
