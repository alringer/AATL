import { storiesOf } from '@storybook/react'
import CallToAction from 'components/CallToAction/CallToAction'
import React from 'react'

export const CallToActionData = {
    default: {
        restaurantID: 0,
        restaurantName: 'Point Loma Seafood',
        restaurantAddress: '2805 Emerson Street',
        restaurantDescription: 'A casual joint with ample seafood and sushi options.',
    },
    longName: {
        restaurantID: 0,
        restaurantName: 'Super Tasty Burger Pizza Chicken Kitchen',
        restaurantAddress: '2805 Emerson Street',
        restaurantDescription: 'A casual joint with ample seafood and sushi options.',
    },
    longAddress: {
        restaurantID: 0,
        restaurantName: 'Point Loma Seafood',
        restaurantAddress: 'Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522',
        restaurantDescription: 'A casual joint with ample seafood and sushi options. ',
    },
    longDescription: {
        restaurantID: 0,
        restaurantName: 'Point Loma Seafood',
        restaurantAddress: '2805 Emerson Street',
        restaurantDescription:
            'A casual joint with ample seafood and sushi options. A casual joint with ample seafood and sushi options. A casual joint with ample seafood and sushi options. A casual joint with ample seafood and sushi options.',
    },
    longNameAddressDescription: {
        restaurantID: 0,
        restaurantName: 'Super Tasty Burger Pizza Chicken Kitchen',
        restaurantAddress: 'Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522',
        restaurantDescription:
            'A casual joint with ample seafood and sushi options. A casual joint with ample seafood and sushi options. A casual joint with ample seafood and sushi options. A casual joint with ample seafood and sushi options.',
    },
}

storiesOf('Call-To-Action', module)
    .add('Small Call-To-Action: Default', () => {
        return (
            <CallToAction
                isLarge={false}
                restaurantID={CallToActionData.default.restaurantID}
                restaurantName={CallToActionData.default.restaurantName}
                restaurantAddress={CallToActionData.default.restaurantAddress}
                restaurantDescription={CallToActionData.default.restaurantDescription}
            />
        )
    })
    .add('Small Call-To-Action: Variant - Long Name', () => {
        return (
            <CallToAction
                isLarge={false}
                restaurantID={CallToActionData.longName.restaurantID}
                restaurantName={CallToActionData.longName.restaurantName}
                restaurantAddress={CallToActionData.longName.restaurantAddress}
                restaurantDescription={CallToActionData.longName.restaurantDescription}
            />
        )
    })
    .add('Small Call-To-Action: Variant - Long Address', () => {
        return (
            <CallToAction
                isLarge={false}
                restaurantID={CallToActionData.longAddress.restaurantID}
                restaurantName={CallToActionData.longAddress.restaurantName}
                restaurantAddress={CallToActionData.longAddress.restaurantAddress}
                restaurantDescription={CallToActionData.longAddress.restaurantDescription}
            />
        )
    })
    .add('Small Call-To-Action: Variant - Long Name, Address, Description', () => {
        return (
            <CallToAction
                isLarge={false}
                restaurantID={CallToActionData.longNameAddressDescription.restaurantID}
                restaurantName={CallToActionData.longNameAddressDescription.restaurantName}
                restaurantAddress={CallToActionData.longNameAddressDescription.restaurantAddress}
                restaurantDescription={CallToActionData.longNameAddressDescription.restaurantDescription}
            />
        )
    })
    .add('Large Call-To-Action: Default', () => {
        return (
            <CallToAction
                isLarge={true}
                restaurantID={CallToActionData.default.restaurantID}
                restaurantName={CallToActionData.default.restaurantName}
                restaurantAddress={CallToActionData.default.restaurantAddress}
                restaurantDescription={CallToActionData.default.restaurantDescription}
            />
        )
    })
    .add('Large Call-To-Action: Variant - Long Name', () => {
        return (
            <CallToAction
                isLarge={true}
                restaurantID={CallToActionData.longName.restaurantID}
                restaurantName={CallToActionData.longName.restaurantName}
                restaurantAddress={CallToActionData.longName.restaurantAddress}
                restaurantDescription={CallToActionData.longName.restaurantDescription}
            />
        )
    })
    .add('Large Call-To-Action: Variant - Long Address', () => {
        return (
            <CallToAction
                isLarge={true}
                restaurantID={CallToActionData.longAddress.restaurantID}
                restaurantName={CallToActionData.longAddress.restaurantName}
                restaurantAddress={CallToActionData.longAddress.restaurantAddress}
                restaurantDescription={CallToActionData.longAddress.restaurantDescription}
            />
        )
    })
    .add('Large Call-To-Action: Variant - Long Name, Address, Description', () => {
        return (
            <CallToAction
                isLarge={true}
                restaurantID={CallToActionData.longNameAddressDescription.restaurantID}
                restaurantName={CallToActionData.longNameAddressDescription.restaurantName}
                restaurantAddress={CallToActionData.longNameAddressDescription.restaurantAddress}
                restaurantDescription={CallToActionData.longNameAddressDescription.restaurantDescription}
            />
        )
    })
