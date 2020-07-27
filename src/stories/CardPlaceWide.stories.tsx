import { storiesOf } from '@storybook/react'
import CardPlaceWide, { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import React from 'react'
import { mockVenue } from 'utilities/types/venue'

storiesOf('Card: Wide Place Card', module)
    .add('City - Default', () => {
        return <CardPlaceWide place={mockVenue} type={CardPlaceWideEnum.City} />
    })
    .add('City - Long Name', () => {
        return <CardPlaceWide place={mockVenue} type={CardPlaceWideEnum.City} />
    })
    .add('Search - Default', () => {
        return <CardPlaceWide place={mockVenue} type={CardPlaceWideEnum.Search} />
    })
    .add('Profile Page - Default', () => {
        return <CardPlaceWide place={mockVenue} type={CardPlaceWideEnum.Profile} />
    })
// .add('Small Card - Default', () => {
//     return <CardPlaceWide {...PlaceBannerData.default} type={CardPlaceWideEnum.City}/>
// })
