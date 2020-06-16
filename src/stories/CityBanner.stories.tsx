import { storiesOf } from '@storybook/react'
import CityBanner from 'components/CityBanner/CityBanner'
import React from 'react'

storiesOf('City Banner', module).add('Default', () => {
    return <CityBanner />
})
