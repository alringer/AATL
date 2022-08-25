import {
    WideAuthorNameText,
    WideAuthorTitleText,
    WideButtonsContainer,
    WideCardContainer,
    WideCardContentContainer,
    WideCardImageContainer,
    WideContentBottomContainer,
    WideContentMiddleContainer,
    WideContentTopContainer,
    WideHeaderContainer,
    WidePlaceAddressText,
    WidePlaceCategoryText,
    WidePlaceNameText,
    WideSummaryText,
    WideTitleText,
} from 'style/Card/Card.style'
import { device } from 'style/device'
import zIndices from 'style/zIndices'
import styled, { css } from 'styled-components'

export const RecommendationCardContainer = styled(WideCardContainer)`
    position: relative;
`

type ToggleProps = {
    isToggled: boolean
}

type HighlightedProps = {
    isHighlighted: boolean
}

type ImageSrcProps = {
    src: string
}

const cssRecommendationCardContentContainer = css`
    margin-left: 300px;
`

export const RecommendationCardContentContainer = styled(WideCardContentContainer)<ToggleProps & HighlightedProps>`
    ${(props) => {
        if (props.isHighlighted === true) {
            return css`
                background-color: rgb(232.4, 236.2, 237.9);
            `
        }
    }}

    ${(props) => {
        if (props.isToggled === true) {
            return css`
                @media ${device.tablet} {
                    ${cssRecommendationCardContentContainer}
                }
                @media ${device.laptop} {
                    ${cssRecommendationCardContentContainer}
                }
            `
        }
    }}

    @media ${device.mobile} {
        width: 100%;
    }
`

const cssRecommendationCardImageContainer = css`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    z-index: ${zIndices.recommendationCardImageBackground};
`
export const RecommendationCardImageContainer = styled(WideCardImageContainer)<ToggleProps & ImageSrcProps>`
    ${(props) => {
        if (props.isToggled === true) {
            return css`
                @media ${device.tablet} {
                    ${cssRecommendationCardImageContainer}
                    ::before {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        content: '';
                        background-image: url(${props.src});
                        background-position: center;
                        background-size: cover;
                    }
                    ::after {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        content: '';
                        backdrop-filter: blur(50px);
                        background-color: rgba(0, 0, 0, 0.3);
                        /* background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 37%, rgba(0, 0, 0, 0.5)), linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255,255,255,1)); */
                    }
                }
                @media ${device.laptop} {
                }
            `
        }
    }}
`

export const RecommendationCardImage = styled.img<ToggleProps>`
    position: relative;
    width: 100%;
    height: 100%;
    z-index: ${zIndices.recommendationCardImage};

    ${(props) => {
        if (props.isToggled === true) {
            return css`
                @media ${device.mobile} {
                    height: 160px;
                    width: 100%;
                }
                @media ${device.tablet} {
                    height: 290px;
                    width: 300px;
                }
                @media ${device.laptop} {
                    height: 290px;
                    width: 300px;
                }
            `
        }
    }}
`

export const RecommendationHeaderContainer = styled(WideHeaderContainer)``

export const RecommendationButtonsContainer = styled(WideButtonsContainer)``

export const RecommendationContentTopContainer = styled(WideContentTopContainer)``
export const RecommendationContentMiddleContainer = styled(WideContentMiddleContainer)``
export const RecommendationContentBottomContainer = styled(WideContentBottomContainer)``

export const RecommendationPlaceNameText = styled(WidePlaceNameText)`
    overflow-wrap: anywhere;
`

export const RecommendationPlaceAddressText = styled(WidePlaceAddressText)``

export const RecommendationPlaceCategoryText = styled(WidePlaceCategoryText)``

export const RecommendationTitleText = styled(WideTitleText)``

export const RecommendationSummaryText = styled(WideSummaryText)``

export const RecommendationAuthorNameText = styled(WideAuthorNameText)``

export const RecommendationTimestampText = styled(WideAuthorNameText)`
    font-weight: 400;
    margin-left: 5px;
`

export const RecommendationAuthorLineContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const RecommendationAuthorTitleText = styled(WideAuthorTitleText)`
    overflow-wrap: anywhere;
`

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
