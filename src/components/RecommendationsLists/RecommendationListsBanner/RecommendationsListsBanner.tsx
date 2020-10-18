import BackgroundImage from 'assets/recommendations-lists-bg.jpg'
import Image from 'components/Image/Image'
import * as S from 'constants/StringConstants'
import React from 'react'
import {
    RecommendationsListsBannerContainer,
    RecommendationsListsBannerImageContainer,
    RecommendationsListsBannerSubTitle,
    RecommendationsListsBannerTextsContainer,
    RecommendationsListsBannerTitle,
} from './RecommendationsListsBanner.style'

const RecommendationsListsBanner = () => {
    return (
        <RecommendationsListsBannerContainer>
            <RecommendationsListsBannerImageContainer>
                <Image src={BackgroundImage} alt="" />
                <RecommendationsListsBannerTextsContainer>
                    <RecommendationsListsBannerTitle>
                        {S.RECOMMENDATIONS_LISTS.Banner.Title}
                    </RecommendationsListsBannerTitle>
                    <RecommendationsListsBannerSubTitle>
                        {S.RECOMMENDATIONS_LISTS.Banner.SubTitle}
                    </RecommendationsListsBannerSubTitle>
                </RecommendationsListsBannerTextsContainer>
            </RecommendationsListsBannerImageContainer>
        </RecommendationsListsBannerContainer>
    )
}

export default RecommendationsListsBanner
