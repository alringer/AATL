import { storiesOf } from '@storybook/react'
import CallToAction from 'components/CallToAction/CallToAction'
import React from 'react'

export const CallToActionData = {
    example: {
        restaurantName: 'Point Loma Seafood',
        restaurantAddress: '2805 Emerson Street',
        restaurantDescription:
            'A casual joint with ample seafood and sushi options.A casual joint with ample seafood and sushi options. A casual joint with ample seafood and sushi options. A casual joint with ample seafood and sushi options.',
    },
}

storiesOf('Call-To-Action', module).add('Large Call-To-Action', () => {
    return (
        <CallToAction
            restaurantName={CallToActionData.example.restaurantName}
            restaurantAddress={CallToActionData.example.restaurantAddress}
            restaurantDescription={CallToActionData.example.restaurantDescription}
        />
    )
})
