import { storiesOf } from '@storybook/react'
import PlaceImage from 'assets/mock-images/restaurant_image.jpg'
import PlaceImageTwo from 'assets/mock-images/restaurant_image2.jpeg'
import CardPlaceSmall from 'components/CardPlaceSmall/CardPlaceSmall'
import React from 'react'
import { mockVenue } from 'utilities/types/venue'

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
        subTitle: 'A sampling of places similar to Sushi Ota that may pique your appetite.',
        places: Object.entries(PlaceCardData).map((entries: any[]) => {
            const placeCardData = entries[1]
            return placeCardData
        }),
    },
}

storiesOf('Card: Small Place Card', module)
    .add('Default', () => {
        // return <CardPlaceSmall {...PlaceCardData.default} />
        return <CardPlaceSmall place={mockVenue} />
    })
    .add('Variant - Different Image', () => {
        // return <CardPlaceSmall {...PlaceCardData.defaultDifferentImage} />
        return <CardPlaceSmall place={mockVenue} />
    })
    .add('Variant - Long Name', () => {
        // return <CardPlaceSmall {...PlaceCardData.longName} />
        return <CardPlaceSmall place={mockVenue} />
    })
    .add('Variant - Long Description', () => {
        // return <CardPlaceSmall {...PlaceCardData.longDescription} />
        return <CardPlaceSmall place={mockVenue} />
    })
    .add('Variant - Long Name and Description', () => {
        // return <CardPlaceSmall {...PlaceCardData.longNameAndDescription} />
        return <CardPlaceSmall place={mockVenue} />
    })
    .add('Section - Place Card Small', () => {
        // return <PlaceCardsList {...PlaceCardsListData.default} />
        return <CardPlaceSmall place={mockVenue} />
    })
