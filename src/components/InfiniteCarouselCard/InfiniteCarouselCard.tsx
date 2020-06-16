import Image from 'components/Image/Image'
import {
    InfiniteCarouselCardBodyContainer,
    InfiniteCarouselCardCategoryText,
    InfiniteCarouselCardCheckItOutButton,
    InfiniteCarouselCardContainer,
    InfiniteCarouselCardContentContainer,
    InfiniteCarouselCardDescriptionContainer,
    InfiniteCarouselCardDescriptionText,
    InfiniteCarouselCardImageContainer,
    InfiniteCarouselCardPlaceName,
} from 'components/InfiniteCarouselCard/InfiniteCarouselCard.style'
import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import { useRouter } from 'next/router'
import React from 'react'
import { chopStringInfiniteCarouselCardDescription } from 'utilities/helpers/chopString'
import { concatCategories } from 'utilities/helpers/concatStrings'
import { IInfiniteCarouselCard } from 'utilities/types/infiniteCarousel'

interface IInfiniteCarouselCardProps extends IInfiniteCarouselCard {}

const InfiniteCarouselCard: React.FC<IInfiniteCarouselCardProps> = ({
    imgSrc,
    placeName,
    placeCategories,
    placeDescription,
    placeID,
}) => {
    const router = useRouter()

    const handleCheckItOut = () => {
        router.push(`${R.ROUTE_ITEMS.restaurant}/${placeID}`)
    }

    return (
        <InfiniteCarouselCardContainer key={placeID}>
            <InfiniteCarouselCardImageContainer>
                <Image src={imgSrc} alt="place-image" />
                <InfiniteCarouselCardPlaceName>{placeName}</InfiniteCarouselCardPlaceName>
            </InfiniteCarouselCardImageContainer>
            <InfiniteCarouselCardContentContainer>
                <InfiniteCarouselCardCategoryText>{concatCategories(placeCategories)}</InfiniteCarouselCardCategoryText>
                <InfiniteCarouselCardBodyContainer>
                    <InfiniteCarouselCardDescriptionContainer>
                        <InfiniteCarouselCardDescriptionText>
                            {chopStringInfiniteCarouselCardDescription(placeDescription)}
                        </InfiniteCarouselCardDescriptionText>
                    </InfiniteCarouselCardDescriptionContainer>
                    <InfiniteCarouselCardCheckItOutButton onClick={handleCheckItOut}>
                        {S.BUTTON_LABELS.CheckItOut}
                    </InfiniteCarouselCardCheckItOutButton>
                </InfiniteCarouselCardBodyContainer>
            </InfiniteCarouselCardContentContainer>
        </InfiniteCarouselCardContainer>
    )
}

export default InfiniteCarouselCard
