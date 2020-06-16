import { storiesOf } from '@storybook/react'
import CardPlaceWide, { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import React from 'react'
import { PlaceBannerData } from 'stories/PlaceBanner.stories'

storiesOf('Card: Wide Place Card', module)
    .add('City - Default', () => {
        return <CardPlaceWide {...PlaceBannerData.default} type={CardPlaceWideEnum.City} />
    })
    .add('City - Long Name', () => {
        return <CardPlaceWide {...PlaceBannerData.longName} type={CardPlaceWideEnum.City} />
    })
    .add('Search - Default', () => {
        return <CardPlaceWide {...PlaceBannerData.default} type={CardPlaceWideEnum.Search} />
    })
    .add('Profile Page - Default', () => {
        return <CardPlaceWide {...PlaceBannerData.default} type={CardPlaceWideEnum.Profile} />
    })
// .add('Small Card - Default', () => {
//     return <CardPlaceWide {...PlaceBannerData.default} type={CardPlaceWideEnum.City}/>
// })
