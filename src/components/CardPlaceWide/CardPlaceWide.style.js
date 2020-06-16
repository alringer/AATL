import { WideAuthorTitleText, WideButtonsContainer, WideCardContainer, WideCardContentContainer, WideCardImageContainer, WideContentBottomContainer, WideContentMiddleContainer, WideContentTopContainer, WideHeaderContainer, WidePlaceCategoryText, WidePlaceNameText, WideSummaryText } from 'style/Card/Card.style'
import { device } from 'style/device'
import styled, { css } from 'styled-components'

export const CardPlaceWideCardContainer = styled(WideCardContainer)`
     ${(props) => {
            if (props.id === 'search') {
                return css`
                    @media ${device.tablet} {
                        height: 250px !important;
                    }
                    ${CardPlaceWideCardImageContainer} {
                        @media ${device.tablet} {
                            height: 100% !important;
                            width: 220px !important;
                        }
                    }

                    ${CardPlaceWideCardContentContainer} {
                        @media ${device.tablet} {
                            padding: 20px !important;
                        }

                        @media ${device.laptop} {
                            padding: 20px !important;
                        }
                    }
                `
            }
        }}
`
export const CardPlaceWideCardImageContainer = styled(WideCardImageContainer)``
export const CardPlaceWideCardContentContainer = styled(WideCardContentContainer)``
export const CardPlaceWideHeaderContainer = styled(WideHeaderContainer)``
export const CardPlaceWideButtonsContainer = styled(WideButtonsContainer)``
export const CardPlaceWideContentTopContainer = styled(WideContentTopContainer)``
export const CardPlaceWideContentMiddleContainer = styled(WideContentMiddleContainer)``
export const CardPlaceWideContentBottomContainer = styled(WideContentBottomContainer)``
export const CardPlaceWidePlaceNameText = styled(WidePlaceNameText)``
export const CardPlaceWidePlaceCategoryText = styled(WidePlaceCategoryText)``
export const CardPlaceWideSummaryText = styled(WideSummaryText)``
export const CardPlaceWideAuthorTitleText = styled(WideAuthorTitleText)``