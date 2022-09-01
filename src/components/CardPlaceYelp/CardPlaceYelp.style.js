import { CustomButton } from 'style/Button/Button.style'
import {
    CardAnchor,
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
    WidePlaceCategoryText,
    WidePlaceNameText,
    WideSummaryText,
    WideTitleText,
} from 'style/Card/Card.style'
import { device } from 'style/device'
import styled, { css } from 'styled-components'

export const CardPlaceWideCardContainer = styled(WideCardContainer)`
    ${(props) => {
        if (props.id === 'search') {
            return css`
                @media ${device.tablet} {
                    height: 220px;
                    min-height: 200px;
                }
                ${CardPlaceWideCardImageContainer} {
                    @media ${device.tablet} {
                        height: 100% !important;
                        width: 300px !important;
                    }
                }

                ${CardPlaceWideCardContentContainer} {
                    @media ${device.tablet} {
                        padding: 20px !important;
                        min-height: 0;
                    }

                    @media ${device.laptop} {
                        padding: 20px !important;
                    }
                }
            `
        }
    }}
`
export const CardPlaceWideCardImageContainer = styled(WideCardImageContainer)`
    @media ${device.mobile} {
        height: 160px;
        width: 100%;
    }

    @media ${device.tablet} {
        height: 100%;
        width: 300px;
    }
    @media ${device.laptop} {
    }
`
export const CardPlaceWideCardContentContainer = styled(WideCardContentContainer)`
    position: relative;
    @media ${device.mobile} {
        width: 100%;
    }
`
export const CardPlaceWideHeaderContainer = styled(WideHeaderContainer)``
export const CardPlaceWideButtonsContainer = styled(WideButtonsContainer)`
    position: absolute;
    top: 20px;
    right: 20px;
`
export const CardPlaceWideContentTopContainer = styled(WideContentTopContainer)``
export const CardPlaceWideContentMiddleContainer = styled(WideContentMiddleContainer)``
export const CardPlaceWideContentBottomContainer = styled(WideContentBottomContainer)``
export const CardPlaceWidePlaceNameText = styled(WidePlaceNameText)``
export const CardPlaceWidePlaceCategoryText = styled(WidePlaceCategoryText)``
export const CardPlaceWideTitleText = styled(WideTitleText)``
export const CardPlaceWideSummaryText = styled(WideSummaryText)``
export const CardPlaceWideAuthorNameText = styled(WideAuthorNameText)``
export const CardPlaceWideAuthorTitleText = styled(WideAuthorTitleText)``
export const CardPlaceWideAnchor = styled(CardAnchor)``

export const CardPlaceYelpButton = styled(CustomButton)`
    color: ${(props) => props.theme.pinkishTan};
    background-color: ${(props) => props.theme.white};
    border-color: ${(props) => props.theme.darkGreyOpaque};
    padding: 13px 18px !important;
    white-space: nowrap;

    :hover {
        border-color: ${(props) => props.theme.darkGreyOpaque};
        background-color: ${(props) => props.theme.white};
    }

    margin-top: 20px;
`
