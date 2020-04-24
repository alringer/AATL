import { storiesOf } from '@storybook/react'
import CallToAction from 'components/CallToAction/CallToAction'
import React from 'react'

export const CallToActionData = {
    default: {
        placeID: 0,
        placeName: 'Point Loma Seafood',
        placeAddress: '2805 Emerson Street',
        placeDescription: 'A casual joint with ample seafood and sushi options.',
    },
    longName: {
        placeID: 0,
        placeName: 'Super Tasty Burger Pizza Chicken Kitchen',
        placeAddress: '2805 Emerson Street',
        placeDescription: 'A casual joint with ample seafood and sushi options.',
    },
    longAddress: {
        placeID: 0,
        placeName: 'Point Loma Seafood',
        placeAddress: 'Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522',
        placeDescription: 'A casual joint with ample seafood and sushi options. ',
    },
    longDescription: {
        placeID: 0,
        placeName: 'Point Loma Seafood',
        placeAddress: '2805 Emerson Street',
        placeDescription:
            'A casual joint with ample seafood and sushi options. A casual joint with ample seafood and sushi options. A casual joint with ample seafood and sushi options. A casual joint with ample seafood and sushi options.',
    },
    longNameAddressDescription: {
        placeID: 0,
        placeName: 'Super Tasty Burger Pizza Chicken Kitchen',
        placeAddress: 'Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522',
        placeDescription:
            'A casual joint with ample seafood and sushi options. A casual joint with ample seafood and sushi options. A casual joint with ample seafood and sushi options. A casual joint with ample seafood and sushi options.',
    },
}

storiesOf('Call-To-Action', module)
    .add('Small Call-To-Action: Default', () => {
        return (
            <CallToAction
                isLarge={false}
                placeID={CallToActionData.default.placeID}
                placeName={CallToActionData.default.placeName}
                placeAddress={CallToActionData.default.placeAddress}
                placeDescription={CallToActionData.default.placeDescription}
            />
        )
    })
    .add('Small Call-To-Action: Variant - Long Name', () => {
        return (
            <CallToAction
                isLarge={false}
                placeID={CallToActionData.longName.placeID}
                placeName={CallToActionData.longName.placeName}
                placeAddress={CallToActionData.longName.placeAddress}
                placeDescription={CallToActionData.longName.placeDescription}
            />
        )
    })
    .add('Small Call-To-Action: Variant - Long Address', () => {
        return (
            <CallToAction
                isLarge={false}
                placeID={CallToActionData.longAddress.placeID}
                placeName={CallToActionData.longAddress.placeName}
                placeAddress={CallToActionData.longAddress.placeAddress}
                placeDescription={CallToActionData.longAddress.placeDescription}
            />
        )
    })
    .add('Small Call-To-Action: Variant - Long Name, Address, Description', () => {
        return (
            <CallToAction
                isLarge={false}
                placeID={CallToActionData.longNameAddressDescription.placeID}
                placeName={CallToActionData.longNameAddressDescription.placeName}
                placeAddress={CallToActionData.longNameAddressDescription.placeAddress}
                placeDescription={CallToActionData.longNameAddressDescription.placeDescription}
            />
        )
    })
    .add('Large Call-To-Action: Default', () => {
        return (
            <CallToAction
                isLarge={true}
                placeID={CallToActionData.default.placeID}
                placeName={CallToActionData.default.placeName}
                placeAddress={CallToActionData.default.placeAddress}
                placeDescription={CallToActionData.default.placeDescription}
            />
        )
    })
    .add('Large Call-To-Action: Variant - Long Name', () => {
        return (
            <CallToAction
                isLarge={true}
                placeID={CallToActionData.longName.placeID}
                placeName={CallToActionData.longName.placeName}
                placeAddress={CallToActionData.longName.placeAddress}
                placeDescription={CallToActionData.longName.placeDescription}
            />
        )
    })
    .add('Large Call-To-Action: Variant - Long Address', () => {
        return (
            <CallToAction
                isLarge={true}
                placeID={CallToActionData.longAddress.placeID}
                placeName={CallToActionData.longAddress.placeName}
                placeAddress={CallToActionData.longAddress.placeAddress}
                placeDescription={CallToActionData.longAddress.placeDescription}
            />
        )
    })
    .add('Large Call-To-Action: Variant - Long Name, Address, Description', () => {
        return (
            <CallToAction
                isLarge={true}
                placeID={CallToActionData.longNameAddressDescription.placeID}
                placeName={CallToActionData.longNameAddressDescription.placeName}
                placeAddress={CallToActionData.longNameAddressDescription.placeAddress}
                placeDescription={CallToActionData.longNameAddressDescription.placeDescription}
            />
        )
    })
