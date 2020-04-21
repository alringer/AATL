import GrayEllipsesSVG from 'assets/gray-ellipses-icon.svg'
import GrayHeartSVG from 'assets/gray-heart-icon.svg'
import Image from 'components/Image/Image'
import React from 'react'
import { ImageButtonsContainer, RecommendationIcon } from 'style/Card/Card.style'
import { chopStringSmallPlaceDescription } from 'utilities/helpers/chopString'
import { concatCategories } from 'utilities/helpers/concatStrings'
import {
    SmallRestaurantCardCategory,
    SmallRestaurantCardContainer,
    SmallRestaurantCardContentContainer,
    SmallRestaurantCardDescriptionContainer,
    SmallRestaurantCardImageContainer,
    SmallRestaurantCardRestaurantName,
} from './RestaurantCardSmall.style'

interface IRestaurantCardSmallSmallProps {
    restaurantID: number
    restaurantName: string
    restaurantCategories: string[]
    restaurantDescription: string
    restaurantImageSrc: string
}

const RestaurantCardSmall: React.FC<IRestaurantCardSmallSmallProps> = ({
    restaurantID,
    restaurantImageSrc,
    restaurantName,
    restaurantCategories,
    restaurantDescription,
}) => {
    const handleView = () => {
        // TODO: Take the user to the restaurant page
        console.log('Restaurant clicked. Take the user to the restaurant page with ID: ', restaurantID)
    }

    const handleLike = (e: React.MouseEvent<HTMLElement>) => {
        // TODO: Call API to like the restaurant
        e.stopPropagation()
        console.log('Restaurant heart clicked. Restaurant ID: ', restaurantID)
    }

    const handleMore = (e: React.MouseEvent<HTMLElement>) => {
        // TODO: Display more options
        e.stopPropagation()
        console.log('Restaurant ellipses clicked. Restaurant ID: ', restaurantID)
    }

    return (
        <SmallRestaurantCardContainer onClick={handleView}>
            <SmallRestaurantCardImageContainer>
                <Image src={restaurantImageSrc} alt="restaurant-image" />
                <ImageButtonsContainer>
                    <RecommendationIcon onClick={handleMore}>
                        <Image src={GrayEllipsesSVG} alt="ellipses-icon" />
                    </RecommendationIcon>
                    <RecommendationIcon onClick={handleLike}>
                        <Image src={GrayHeartSVG} alt="heart-icon" />
                    </RecommendationIcon>
                </ImageButtonsContainer>
            </SmallRestaurantCardImageContainer>
            <SmallRestaurantCardContentContainer>
                <SmallRestaurantCardRestaurantName>{restaurantName}</SmallRestaurantCardRestaurantName>
                <SmallRestaurantCardCategory>{concatCategories(restaurantCategories)}</SmallRestaurantCardCategory>
                <SmallRestaurantCardDescriptionContainer>
                    <span>{chopStringSmallPlaceDescription(restaurantDescription)}</span>
                </SmallRestaurantCardDescriptionContainer>
            </SmallRestaurantCardContentContainer>
        </SmallRestaurantCardContainer>
    )
}

export default RestaurantCardSmall
