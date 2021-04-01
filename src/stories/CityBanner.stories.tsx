import { storiesOf } from '@storybook/react'
import CityBanner from 'components/CityBanner/CityBanner'
import React from 'react'
import { mockParentRegion } from 'utilities/types/parentRegion'

storiesOf('City Banner', module).add('Default', () => {
    return <CityBanner cityInformation={mockParentRegion} />
})
