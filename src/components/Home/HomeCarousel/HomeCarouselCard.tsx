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
import { concatCategories } from 'utilities/helpers/concatStrings'
import { ICategory } from 'utilities/types/category'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'

interface IHomeCarouselCardProps {
    featuredRecommendationList: IRecommendationListMeta | null
    isCurrent: boolean
    handleMoveForward: () => void
    handleMoveBackward: () => void
    length: number
}

const HomeCarouselCard: React.FC<IHomeCarouselCardProps> = ({
    featuredRecommendationList,
    handleMoveForward,
    handleMoveBackward,
    isCurrent,
    length,
}) => {
    return featuredRecommendationList ? (
        <HomeCarouselCardContainer key={featuredRecommendationList.id}>
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
                    {featuredRecommendationList.categories
                        ? concatCategories(
                              featuredRecommendationList.categories.map((category: ICategory) => category.longName)
                          )
                        : ''}
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
                {length > 1 && (
                    <>
                        <HomeCarouselBackwardIconButton onClick={handleMoveBackward} isCurrent={isCurrent}>
                            <HomeCarouselForwardIcon />
                        </HomeCarouselBackwardIconButton>
                        <HomeCarouselForwardIconButton onClick={handleMoveForward} isCurrent={isCurrent}>
                            <HomeCarouselForwardIcon />
                        </HomeCarouselForwardIconButton>
                    </>
                )}
            </HomeCarouselTextContainer>
        </HomeCarouselCardContainer>
    ) : null
}

export default HomeCarouselCard
