import { storiesOf } from '@storybook/react'
import PlaceImage from 'assets/restaurant_image.jpg'
import PlaceImageTwo from 'assets/restaurant_image2.jpeg'
import PlaceCardSmall from 'components/PlaceCardSmall/PlaceCardSmall'
import React from 'react'
import PlaceCardsList from 'sections/CardsList/PlaceCardsList'

export const PlaceCardData = {
    default: {
        placeID: 0,
        placeName: "Nakamura's",
        placeCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        placeDescription: 'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        placeImageSrc: PlaceImage,
    },
    defaultDifferentImage: {
        placeID: 1,
        placeName: "Nakamura's",
        placeCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        placeDescription: 'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        placeImageSrc: PlaceImageTwo,
    },
    longName: {
        placeID: 2,
        placeName: 'Super Tasty Burger And Pizza Kitchen Place',
        placeCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        placeDescription: 'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        placeImageSrc: PlaceImage,
    },
    longDescription: {
        placeID: 3,
        placeName: "Nakamura's",
        placeCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        placeDescription:
            'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego. The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego. The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        placeImageSrc: PlaceImage,
    },
    longNameAndDescription: {
        placeID: 4,
        placeName: 'Super Tasty Burger And Pizza Kitchen Place',
        placeCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        placeDescription:
            'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego. The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego. The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        placeImageSrc: PlaceImage,
    },
}

export const PlaceCardsListData = {
    default: {
        title: 'Places similar to Sushi Ota',
        subTitle: 'A sampling of places similar to Sushi Ota that may peak your appetite.',
        places: Object.entries(PlaceCardData).map((entries: any[]) => {
            const placeCardData = entries[1]
            return placeCardData
        }),
    },
}

storiesOf('Place Card Small', module)
    .add('Default', () => {
        return <PlaceCardSmall {...PlaceCardData.default} />
    })
    .add('Variant - Different Image', () => {
        return <PlaceCardSmall {...PlaceCardData.defaultDifferentImage} />
    })
    .add('Variant - Long Name', () => {
        return <PlaceCardSmall {...PlaceCardData.longName} />
    })
    .add('Variant - Long Description', () => {
        return <PlaceCardSmall {...PlaceCardData.longDescription} />
    })
    .add('Variant - Long Name and Description', () => {
        return <PlaceCardSmall {...PlaceCardData.longNameAndDescription} />
    })
    .add('Section - Place Card Small', () => {
        return <PlaceCardsList {...PlaceCardsListData.default} />
    })
