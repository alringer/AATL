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

export const CardPlaceWideForksContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

export const CardPlaceWideForkContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 24px;
    height: 24px;

    margin-right: 10px;

    cursor: pointer;
`

export const CardPlaceWideForkMessageText = styled.p`
    font-family: 'Rubik', sans-serif;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.83;
    letter-spacing: 2px;
    color: #363940;
`
