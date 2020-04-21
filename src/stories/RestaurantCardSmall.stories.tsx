import { storiesOf } from '@storybook/react'
import RestaurantImage from 'assets/restaurant_image.jpg'
import RestaurantImageTwo from 'assets/restaurant_image2.jpeg'
import RestaurantCardSmall from 'components/RestaurantCardSmall/RestaurantCardSmall'
import React from 'react'

export const RestaurantCardData = {
    default: {
        restaurantID: 0,
        restaurantName: "Nakamura's",
        restaurantCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        restaurantDescription:
            'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        restaurantImageSrc: RestaurantImage,
    },
    defaultDifferentImage: {
        restaurantID: 0,
        restaurantName: "Nakamura's",
        restaurantCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        restaurantDescription:
            'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        restaurantImageSrc: RestaurantImageTwo,
    },
    longName: {
        restaurantID: 0,
        restaurantName: 'Super Tasty Burger And Pizza Kitchen Place',
        restaurantCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        restaurantDescription:
            'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        restaurantImageSrc: RestaurantImage,
    },
    longDescription: {
        restaurantID: 0,
        restaurantName: "Nakamura's",
        restaurantCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        restaurantDescription:
            'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego. The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego. The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        restaurantImageSrc: RestaurantImage,
    },
    longNameAndDescription: {
        restaurantID: 0,
        restaurantName: 'Super Tasty Burger And Pizza Kitchen Place',
        restaurantCategories: ['SUSHI', 'TERIYAKI-STYLE'],
        restaurantDescription:
            'The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego. The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego. The best reason you ever had to eat sushi, drink sake, and get sake-bombed in San Diego',
        restaurantImageSrc: RestaurantImage,
    },
}

storiesOf('Restaurant Card Small', module)
    .add('Default', () => {
        return (
            <RestaurantCardSmall
                restaurantID={RestaurantCardData.default.restaurantID}
                restaurantName={RestaurantCardData.default.restaurantName}
                restaurantCategories={RestaurantCardData.default.restaurantCategories}
                restaurantDescription={RestaurantCardData.default.restaurantDescription}
                restaurantImageSrc={RestaurantCardData.default.restaurantImageSrc}
            />
        )
    })
    .add('Variant - Different Image', () => {
        return (
            <RestaurantCardSmall
                restaurantID={RestaurantCardData.defaultDifferentImage.restaurantID}
                restaurantName={RestaurantCardData.defaultDifferentImage.restaurantName}
                restaurantCategories={RestaurantCardData.defaultDifferentImage.restaurantCategories}
                restaurantDescription={RestaurantCardData.defaultDifferentImage.restaurantDescription}
                restaurantImageSrc={RestaurantCardData.defaultDifferentImage.restaurantImageSrc}
            />
        )
    })
    .add('Variant - Long Name', () => {
        return (
            <RestaurantCardSmall
                restaurantID={RestaurantCardData.longName.restaurantID}
                restaurantName={RestaurantCardData.longName.restaurantName}
                restaurantCategories={RestaurantCardData.longName.restaurantCategories}
                restaurantDescription={RestaurantCardData.longName.restaurantDescription}
                restaurantImageSrc={RestaurantCardData.longName.restaurantImageSrc}
            />
        )
    })
    .add('Variant - Long Description', () => {
        return (
            <RestaurantCardSmall
                restaurantID={RestaurantCardData.longDescription.restaurantID}
                restaurantName={RestaurantCardData.longDescription.restaurantName}
                restaurantCategories={RestaurantCardData.longDescription.restaurantCategories}
                restaurantDescription={RestaurantCardData.longDescription.restaurantDescription}
                restaurantImageSrc={RestaurantCardData.longDescription.restaurantImageSrc}
            />
        )
    })
    .add('Variant - Long Name and Description', () => {
        return (
            <RestaurantCardSmall
                restaurantID={RestaurantCardData.longNameAndDescription.restaurantID}
                restaurantName={RestaurantCardData.longNameAndDescription.restaurantName}
                restaurantCategories={RestaurantCardData.longNameAndDescription.restaurantCategories}
                restaurantDescription={RestaurantCardData.longNameAndDescription.restaurantDescription}
                restaurantImageSrc={RestaurantCardData.longNameAndDescription.restaurantImageSrc}
            />
        )
    })
