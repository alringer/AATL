import { WideAuthorNameText, WideAuthorTitleText, WideButtonsContainer, WideCardContainer, WideCardContentContainer, WideCardImageContainer, WideContentBottomContainer, WideContentMiddleContainer, WideContentTopContainer, WideHeaderContainer, WidePlaceAddressText, WidePlaceCategoryText, WidePlaceNameText, WideSummaryText, WideTitleText } from 'style/Card/Card.style'
import styled, { css } from 'styled-components'

export const RecommendationCardContainer = styled(WideCardContainer)``
export const RecommendationCardContentContainer = styled(WideCardContentContainer)`
    ${props => {
        if (props.id === 'highlighted') {
            return css`
                background-color: rgb(232.4, 236.2, 237.9);
            `
        }
    }}
`

export const RecommendationCardImageContainer = styled(WideCardImageContainer)``


export const RecommendationHeaderContainer = styled(WideHeaderContainer)``

export const RecommendationButtonsContainer = styled(WideButtonsContainer)``

export const RecommendationContentTopContainer = styled(WideContentTopContainer)``
export const RecommendationContentMiddleContainer = styled(WideContentMiddleContainer)``
export const RecommendationContentBottomContainer = styled(WideContentBottomContainer)``

export const RecommendationPlaceNameText = styled(WidePlaceNameText)``

export const RecommendationPlaceAddressText = styled(WidePlaceAddressText)``

export const RecommendationPlaceCategoryText = styled(WidePlaceCategoryText)``

export const RecommendationTitleText = styled(WideTitleText)``

export const RecommendationSummaryText = styled(WideSummaryText)``

export const RecommendationAuthorNameText = styled(WideAuthorNameText)``

export const RecommendationAuthorTitleText = styled(WideAuthorTitleText)``

export const RecommendationTitleSpan = styled.span`
    margin-right: 10px;
`

export const RecommendationAnchor = styled.a`
    cursor: pointer;
    text-decoration: none;
    :hover {
        text-decoration: underline;
        text-decoration-color: ${(props) => props.theme.darkGrey};
    }
`