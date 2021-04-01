import { storiesOf } from '@storybook/react'
import HaveYouBeenTo from 'components/HaveYouBeenTo/HaveYouBeenTo'
import React from 'react'

export const HaveYouBeenToData = {
    default: {
        placeID: 0,
        placeName: "Nakamura's",
    },
}

storiesOf('Have You Been To', module).add('Default', () => {
    return <HaveYouBeenTo placeID={HaveYouBeenToData.default.placeID} placeName={HaveYouBeenToData.default.placeName} />
})
