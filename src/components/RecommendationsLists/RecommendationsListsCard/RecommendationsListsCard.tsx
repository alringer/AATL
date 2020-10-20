import { Tooltip } from '@material-ui/core'
import FeaturedSVG from 'assets/featured-icon.svg'
import Image from 'components/Image/Image'
import * as S from 'constants/StringConstants'
import Link from 'next/link'
import React from 'react'
import { DeviceNameEnum, size } from 'style/device'
import {
    chopStringRecommendationsListsCardContent,
    chopStringRecommendationsListsCardNumber,
    chopStringRecommendationsListsCardSubTitle,
    chopStringRecommendationsListsCardTitle
} from 'utilities/helpers/chopString'
import useWindowSize from 'utilities/hooks/useWindowSize'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'
import {
    RecommendationsListsCardAnchor,
    RecommendationsListsCardBottomContainer,
    RecommendationsListsCardContainer,
    RecommendationsListsCardContent,
    RecommendationsListsCardContentContainer,
    RecommendationsListsCardExtraInfo,
    RecommendationsListsCardHeaderContainer,
    RecommendationsListsCardIconContainer,
    RecommendationsListsCardImageContainer,
    RecommendationsListsCardSubTitle,
    RecommendationsListsCardTitle
} from './RecommendationsListsCard.style'

interface IRecommendationsListsCardProps {
    // TODO: Replace the interface with the updated DTO for RecommendationListMeta for this page
    recommendationsList: IRecommendationListMeta
}

const RecommendationsListsCard: React.FC<IRecommendationsListsCardProps> = ({ recommendationsList }) => {
    const windowSize = useWindowSize()
    const viewport: DeviceNameEnum =
        windowSize.width >= Number(size.laptop)
            ? DeviceNameEnum.laptop
            : windowSize.width >= Number(size.tablet)
            ? DeviceNameEnum.tablet
            : DeviceNameEnum.mobile

    return (
        <Link href={`/recommendation-list/${recommendationsList.id}`} passHref={true} prefetch={false}>
            <RecommendationsListsCardAnchor>
                <RecommendationsListsCardContainer>
                    <RecommendationsListsCardImageContainer>
                        <Image
                            src={recommendationsList ? recommendationsList.imageCDNUrl : null}
                            alt="recommendation-image"
                        />
                    </RecommendationsListsCardImageContainer>
                    <RecommendationsListsCardContentContainer>
                        <RecommendationsListsCardHeaderContainer>
                            <RecommendationsListsCardTitle>
                                {recommendationsList
                                    ? chopStringRecommendationsListsCardTitle(recommendationsList.title, viewport)
                                    : null}
                            </RecommendationsListsCardTitle>
                            <RecommendationsListsCardIconContainer>
                                <Tooltip title={S.TOOL_TIPS.Added} placement="top">
                                    <img src={FeaturedSVG} alt="featured-icon" />
                                </Tooltip>
                            </RecommendationsListsCardIconContainer>
                        </RecommendationsListsCardHeaderContainer>
                        <RecommendationsListsCardSubTitle>
                            {recommendationsList
                                ? chopStringRecommendationsListsCardSubTitle(recommendationsList.subtitle, viewport)
                                : null}
                        </RecommendationsListsCardSubTitle>
                        <RecommendationsListsCardContent>
                            {recommendationsList
                                ? chopStringRecommendationsListsCardContent(recommendationsList.summary, viewport)
                                : null}
                        </RecommendationsListsCardContent>
                        <RecommendationsListsCardBottomContainer>
                            <RecommendationsListsCardExtraInfo>
                                {/* TODO: Wire up data from the props */}
                                {`${chopStringRecommendationsListsCardNumber(24)} ${
                                    S.RECOMMENDATIONS_LISTS.Card.Recommendations
                                }`}
                            </RecommendationsListsCardExtraInfo>
                            <RecommendationsListsCardExtraInfo>
                                {/* TODO: Wire up data from the props */}
                                {`${chopStringRecommendationsListsCardNumber(1200)} ${
                                    S.RECOMMENDATIONS_LISTS.Card.Venues
                                }`}
                            </RecommendationsListsCardExtraInfo>
                        </RecommendationsListsCardBottomContainer>
                    </RecommendationsListsCardContentContainer>
                </RecommendationsListsCardContainer>
            </RecommendationsListsCardAnchor>
        </Link>
    )
}

export default RecommendationsListsCard
