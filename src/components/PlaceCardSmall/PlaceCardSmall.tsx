import GrayEllipsesSVG from 'assets/gray-ellipses-icon.svg'
import GrayHeartSVG from 'assets/gray-heart-icon.svg'
import Image from 'components/Image/Image'
import React from 'react'
import { ImageButtonsContainer, RecommendationIcon } from 'style/Card/Card.style'
import { chopStringSmallPlaceDescription } from 'utilities/helpers/chopString'
import { concatCategories } from 'utilities/helpers/concatStrings'
import {
    SmallPlaceCardCategory,
    SmallPlaceCardContainer,
    SmallPlaceCardContentContainer,
    SmallPlaceCardDescriptionContainer,
    SmallPlaceCardImageContainer,
    SmallPlaceCardPlaceName,
} from './PlaceCardSmall.style'

interface IPlaceCardSmallSmallProps {
    placeID: number
    placeName: string
    placeCategories: string[]
    placeDescription: string
    placeImageSrc: string
}

const PlaceCardSmall: React.FC<IPlaceCardSmallSmallProps> = ({
    placeID,
    placeImageSrc,
    placeName,
    placeCategories,
    placeDescription,
}) => {
    const handleView = () => {
        // TODO: Take the user to the place page
        console.log('Place clicked. Take the user to the place page with ID: ', placeID)
    }

    const handleLike = (e: React.MouseEvent<HTMLElement>) => {
        // TODO: Call API to like the place
        e.stopPropagation()
        console.log('Place heart clicked. place ID: ', placeID)
    }

    const handleMore = (e: React.MouseEvent<HTMLElement>) => {
        // TODO: Display more options
        e.stopPropagation()
        console.log('Place ellipses clicked. place ID: ', placeID)
    }

    return (
        <SmallPlaceCardContainer onClick={handleView}>
            <SmallPlaceCardImageContainer>
                <Image src={placeImageSrc} alt="place-image" />
                <ImageButtonsContainer>
                    <RecommendationIcon onClick={handleMore}>
                        <Image src={GrayEllipsesSVG} alt="ellipses-icon" />
                    </RecommendationIcon>
                    <RecommendationIcon onClick={handleLike}>
                        <Image src={GrayHeartSVG} alt="heart-icon" />
                    </RecommendationIcon>
                </ImageButtonsContainer>
            </SmallPlaceCardImageContainer>
            <SmallPlaceCardContentContainer>
                <SmallPlaceCardPlaceName>{placeName}</SmallPlaceCardPlaceName>
                <SmallPlaceCardCategory>{concatCategories(placeCategories)}</SmallPlaceCardCategory>
                <SmallPlaceCardDescriptionContainer>
                    <span>{chopStringSmallPlaceDescription(placeDescription)}</span>
                </SmallPlaceCardDescriptionContainer>
            </SmallPlaceCardContentContainer>
        </SmallPlaceCardContainer>
    )
}

export default PlaceCardSmall
