import { storiesOf } from '@storybook/react'
import PlaceImage from 'assets/mock-images/restaurant_image.jpg'
import CardPlaceWide from 'components/CardPlaceWide/CardPlaceWide'
import React from 'react'

export const PlaceCardData = {
    default: {
        placeID: 0,
        placeName: "Nakamura's",
        placeCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        placeDescription: 'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        placeImageSrc: PlaceImage,
    },
}

storiesOf('Card: Wide Place Card', module)
    .add('City - Default', () => {
        return <CardPlaceWide />
    })
    .add('Search - Default', () => {
        return <CardPlaceWide />
    })
    .add('Profile Page - Default', () => {
        return <CardPlaceWide />
    })
    .add('Small Card - Default', () => {
        return <CardPlaceWide />
    })
