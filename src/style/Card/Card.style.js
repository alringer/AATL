import { CustomIconButton } from 'style/Button/IconButton.style'
import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { device } from 'style/device'
import { ImageContainer } from 'style/ImageContainer/ImageContainer'
import styled, { keyframes } from 'styled-components'

export const CardContainer = styled(ContentWrapper)`
    transition: all 0.2s linear;

    :hover {
        box-shadow: 0 3px 50px 0 #dedede;
        transform: translateY(-2px);
        cursor: pointer;
    }
`

export const ImageButtonsContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const CardIcon = styled(CustomIconButton)`
    width: 48px;
    height: 48px;

    img {
        height: fit-content !important;
    }
`

export const TooltipIcon = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    cursor: default;
    img {
        height: fit-content !important;
    }
`

export const WideCardContainer = styled(CardContainer)`
    display: flex;
    width: 100%;
    border: solid 2px rgba(54, 57, 64, 0.06);
    
    @media ${device.mobile} {
        flex-direction: column;
        height: 100%;
        justify-content: flex-start;
        align-items: center;
    }

    @media ${device.tablet} {
        flex-direction: row;
        height: 290px;
        justify-content: flex-start;
        align-items: flex-start;
    }

    @media ${device.laptop} {
        flex-direction: row;
        height: 290px;
        justify-content: flex-start;
        align-items: flex-start;
    }
`

export const WideCardImageContainer = styled(ImageContainer)`
    position: relative;
    height: 100%;

    @media ${device.mobile} {
        width: 100%;
        height: 160px;
    }

    @media ${device.tablet} {
        width: 300px;
        height: 100%;
    }

    @media ${device.laptop} {
        width: 300px;
        height: 100%;
    }
`

export const WideCardContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex: 1;
    height: 100%;

    @media ${device.mobile} {
        padding: 8px 16px 39px;
    }

    @media ${device.tablet} {
        padding: 20px;
    }

    @media ${device.laptop} {
        padding: 30px;
    }
`

export const WideHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const WideHeaderLeftContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

export const WideHeaderTooltipIconsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
`

export const WideButtonsContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`

export const WideContentTopContainer = styled.div`
    width: 100%;
`
export const WideContentMiddleContainer = styled.div`
    width: 100%;
    @media ${device.mobile} {
        margin-top: 10px;
    }

    @media ${device.tablet} {
        margin-top: 10px;
    }

    @media ${device.laptop} {
        margin-top: 10px;
    }
`
export const WideContentBottomContainer = styled.div`
    width: 100%;
    @media ${device.mobile} {
        margin-top: 10px;
    }

    @media ${device.tablet} {
        margin-top: 10px;
    }

    @media ${device.laptop} {
        margin-top: 10px;
    }
`

export const WidePlaceNameText = styled.p`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.93;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};

    @media ${device.mobile} {
        font-size: 20px;
    }

    @media ${device.tablet} {
        font-size: 24px;
    }

    @media ${device.laptop} {
        font-size: 30px;
    }
`

export const WidePlaceAddressText = styled.p`
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.83;
    letter-spacing: 2px;
    color: ${props => props.theme.charcoalGrey};

    @media ${device.mobile} {
        margin-top: 5px;
    }

    @media ${device.tablet} {
        margin-top: 8px;
    }

    @media ${device.laptop} {
        margin-top: 8px;
    }
`

export const WidePlaceCategoryText = styled.p`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${props => props.theme.mushroom};

    @media ${device.mobile} {
        font-size: 10px;
        margin-top: 5px;
    }

    @media ${device.tablet} {
        font-size: 10px;
        margin-top: 5px;
    }

    @media ${device.laptop} {
        font-size: 12px;
        margin-top: 5px;
    }
`

export const WideTitleText = styled.p`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: ${props => props.theme.darkGrey};

    @media ${device.mobile} {
        font-size: 15px;
    }

    @media ${device.tablet} {
        font-size: 18px;
    }

    @media ${device.laptop} {
        font-size: 18px;
    }
`

export const WideSummaryText = styled.p`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: ${props => props.theme.darkGrey};

    @media ${device.mobile} {
        font-size: 11px;
        margin-top: 5px;
    }

    @media ${device.tablet} {
        font-size: 14px;
        margin-top: 0;
    }

    @media ${device.laptop} {
        font-size: 14px;
        margin-top: 0;
    }
`

export const WideAuthorNameText = styled.p`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};

    @media ${device.mobile} {
        font-size: 14px;
    }

    @media ${device.tablet} {
        font-size: 16px;
    }

    @media ${device.laptop} {
        font-size: 16px;
    }
`

export const WideAuthorTitleText = styled.p`
    opacity: 0.4;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${props => props.theme.charcoalGrey};

    @media ${device.mobile} {
        margin-top: 9px;
        font-size: 10px;
    }

    @media ${device.tablet} {
        margin-top: 5px;
        font-size: 10px;
    }

    @media ${device.laptop} {
        margin-top: 5px;
        font-size: 12px;
    }
`

const slideLeft = keyframes`
    0% {
        transform: translateX(20px);
        opacity: 0;
    }
    25% {
        opacity: 1;
        transform: translateX(0);
    }
`
const slideDown = keyframes`
    0% {
        transform: translateY(-20px);
        opacity: 0;
    }
    25% {
        opacity: 1;
        transform: translateY(0);
    }
`

export const MoreHorizontalContainer = styled.div`
    position: absolute;
    right: 50px;
    display: flex;
    flex-direction: row;
    background-color: #f6f1ee;
    border-radius: 27px;

    animation: ${slideLeft} 1s;
`

export const MoreVerticalContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    background-color: #f6f1ee;
    border-radius: 27px;
    top: 50px;

    animation: ${slideDown} 1s;
`