import { CardContainer } from 'style/Card/Card.style'
import { device } from 'style/device'
import { NoWrapText } from 'style/NoWrapText/NoWrapText.style'
import styled from 'styled-components'

export const SmallRestaurantCardContainer = styled(CardContainer)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media ${device.mobile} {
        width: 344px;
        height: 354px;
    }
    @media ${device.tablet} {
        width: 348px;
        height: 354px;
    }
    @media ${device.desktop} {
        width: 300px;
        height: 368px;
    }
`
export const SmallRestaurantCardImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 160px;
`
export const SmallRestaurantCardContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    padding: 20px;
`
export const SmallRestaurantCardDescriptionContainer = styled.div`
    margin-top: 8px;
    height: 70px;
`

// Texts
export const Span = styled.span`
    max-width: 100% !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    word-wrap: normal !important;
`

export const SmallRestaurantCardRestaurantName = styled(NoWrapText)`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};
    font-size: 24px;
`
export const SmallRestaurantCardCategory = styled(NoWrapText)`
    margin-top: 5px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${props => props.theme.mushroom};
    font-size: 12px;
`
export const SmallRestaurantCardDescription = styled.p`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};
    font-size: 14px;
`