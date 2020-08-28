import {
    HomeCarouselBackwardIconButton,
    HomeCarouselCardContainer,
    HomeCarouselCategoryText,
    HomeCarouselDescriptionText,
    HomeCarouselForwardIcon,
    HomeCarouselForwardIconButton,
    HomeCarouselImageContainer,
    HomeCarouselSubTitleText,
    HomeCarouselTextContainer,
    HomeCarouselTitleText,
    HomeCarouselViewMoreButton,
} from 'components/Home/HomeCarousel/HomeCarousel.style'
import Image from 'components/Image/Image'
import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import Link from 'next/link'
import React from 'react'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'

interface IHomeCarouselCardProps {
    featuredRecommendationList: IRecommendationListMeta | null
    isCurrent: boolean
    handleMoveForward: () => void
    handleMoveBackward: () => void
}

const HomeCarouselCard: React.FC<IHomeCarouselCardProps> = ({
    featuredRecommendationList,
    handleMoveForward,
    handleMoveBackward,
    isCurrent,
}) => {
    return featuredRecommendationList ? (
        <HomeCarouselCardContainer>
            <HomeCarouselImageContainer>
                <Image
                    src={featuredRecommendationList.imageCDNUrl ? featuredRecommendationList.imageCDNUrl : ''}
                    alt="featured-recommendation-list-image"
                />
            </HomeCarouselImageContainer>
            <HomeCarouselTextContainer>
                <HomeCarouselTitleText>
                    {featuredRecommendationList.title ? featuredRecommendationList.title : ''}
                </HomeCarouselTitleText>
                <HomeCarouselCategoryText>
                    Category Category Category Category Category Category Category Category Category Category Category
                    Category Category Category Category Category
                </HomeCarouselCategoryText>
                <HomeCarouselSubTitleText>
                    {featuredRecommendationList.subtitle ? featuredRecommendationList.subtitle : ''}
                </HomeCarouselSubTitleText>
                <HomeCarouselDescriptionText>
                    {featuredRecommendationList.summary ? featuredRecommendationList.summary : ''}
                </HomeCarouselDescriptionText>
                <Link
                    href={`${R.ROUTE_ITEMS.recommendationList}/${featuredRecommendationList.id}`}
                    passHref={true}
                    prefetch={false}
                >
                    <HomeCarouselViewMoreButton>{S.BUTTON_LABELS.ReadMore}</HomeCarouselViewMoreButton>
                </Link>
                <HomeCarouselBackwardIconButton onClick={handleMoveBackward} isCurrent={isCurrent}>
                    <HomeCarouselForwardIcon />
                </HomeCarouselBackwardIconButton>
                <HomeCarouselForwardIconButton onClick={handleMoveForward} isCurrent={isCurrent}>
                    <HomeCarouselForwardIcon />
                </HomeCarouselForwardIconButton>
            </HomeCarouselTextContainer>
        </HomeCarouselCardContainer>
    ) : null
}

export default HomeCarouselCard
