import { storiesOf } from '@storybook/react'
import CardPlaceWide from 'components/CardPlaceWide/CardPlaceWide'
import React from 'react'
import { PlaceBannerData } from 'stories/PlaceBanner.stories'

storiesOf('Card: Wide Place Card', module)
    .add('City - Default', () => {
        return <CardPlaceWide {...PlaceBannerData.default} />
    })
    .add('City - Long Name', () => {
        return <CardPlaceWide {...PlaceBannerData.longName} />
    })
    .add('Search - Default', () => {
        return <CardPlaceWide {...PlaceBannerData.default} />
    })
    .add('Profile Page - Default', () => {
        return <CardPlaceWide {...PlaceBannerData.default} />
    })
    .add('Small Card - Default', () => {
        return <CardPlaceWide {...PlaceBannerData.default} />
    })
