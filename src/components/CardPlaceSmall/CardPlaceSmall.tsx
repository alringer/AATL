import GrayEllipsesSVG from 'assets/gray-ellipses-icon.svg'
import GrayHeartSVG from 'assets/gray-heart-icon.svg'
import Image from 'components/Image/Image'
import React from 'react'
import { CardIcon, ImageButtonsContainer } from 'style/Card/Card.style'
import { chopStringSmallPlaceDescription } from 'utilities/helpers/chopString'
import { concatCategories } from 'utilities/helpers/concatStrings'
import { IPlace } from 'utilities/types/place'
import {
    SmallPlaceCardCategory,
    SmallPlaceCardContainer,
    SmallPlaceCardContentContainer,
    SmallPlaceCardDescriptionContainer,
    SmallPlaceCardImageContainer,
    SmallPlaceCardPlaceName,
} from './CardPlaceSmall.style'

interface IPlaceCardSmallSmallProps extends Partial<IPlace> {}

const CardPlaceSmall: React.FC<IPlaceCardSmallSmallProps> = ({
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
                    <CardIcon onClick={handleMore}>
                        <Image src={GrayEllipsesSVG} alt="ellipses-icon" />
                    </CardIcon>
                    <CardIcon onClick={handleLike}>
                        <Image src={GrayHeartSVG} alt="heart-icon" />
                    </CardIcon>
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

export default CardPlaceSmall
