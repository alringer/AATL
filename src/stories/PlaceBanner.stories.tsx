import { storiesOf } from '@storybook/react'
import PlaceImage from 'assets/sushi_image.png'
import PlaceBanner from 'components/PlaceBanner/PlaceBanner'
import React from 'react'

export const PlaceBannerData = {
    default: {
        placeID: 0,
        placeName: "Nakamura's",
        placeCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        placeDescription: 'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        placeImageSrc: PlaceImage,
        placeCity: 'San Diego',
        placeAddress: '1234 Sanctum St.',
        placeAddressTwo: 'Apt. 123',
        placeState: 'California',
        placeStatePostal: 'CA',
        placeZip: '12345',
        placeNumberOfRecommendations: 1234,
        placeRating: 'Highly Recommended',
        placeWebsiteURL: 'https://seamgen.com',
        placeNumber: '1231231234',
    },
}

storiesOf('Place Banner', module).add('Default', () => {
    return <PlaceBanner {...PlaceBannerData.default} />
})
