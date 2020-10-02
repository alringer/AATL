import { storiesOf } from '@storybook/react'
import CardPlaceWide, { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import React from 'react'
import { IVenue, mockVenue } from 'utilities/types/venue'

const longNameVenue: IVenue = { ...mockVenue, name: 'American Chicken Pizza Burger Ribs Sandwich Place' }

storiesOf('Card: Wide Place Card', module)
    .add('City - Default', () => {
        return <CardPlaceWide place={mockVenue} type={CardPlaceWideEnum.City} />
    })
    .add('City - Long Name', () => {
        return <CardPlaceWide place={longNameVenue} type={CardPlaceWideEnum.City} />
    })
    .add('Search - Default', () => {
        return (
            <div style={{ width: '690px' }}>
                <CardPlaceWide place={longNameVenue} type={CardPlaceWideEnum.Search} />
            </div>
        )
    })
    .add('Profile Page - Default', () => {
        return (
            <div style={{ width: '690px' }}>
                <CardPlaceWide place={longNameVenue} type={CardPlaceWideEnum.Profile} />
            </div>
        )
    })
// .add('Small Card - Default', () => {
//     return <CardPlaceWide {...PlaceBannerData.default} type={CardPlaceWideEnum.City}/>
// })
