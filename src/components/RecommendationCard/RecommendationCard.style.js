import { CardContainer } from 'style/Card/Card.style'
import { device } from 'style/device'
import styled from 'styled-components'

export const RecommendationCardContainer = styled(CardContainer)`
    display: flex;
    width: 100%;
    border: solid 2px rgba(54, 57, 64, 0.06);
    
    @media ${device.mobile} {
        flex-direction: column;
        max-width: 360px;
        height: 100%;
        justify-content: flex-start;
        align-items: center;
    }

    @media ${device.tablet} {
        flex-direction: row;
        max-width: 720px;
        height: 290px;
        justify-content: flex-start;
        align-items: flex-start;
    }

    @media ${device.laptop} {
        flex-direction: row;
        max-width: 940px;
        height: 290px;
        justify-content: flex-start;
        align-items: flex-start;
    }
`

export const RecommendationCardImageContainer = styled.div`
    position: relative;
    width: 300px;
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

    img {
        object-fit: cover !important;
    }
`

export const RecommendationCardContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex: 1;
    height: 100%;

    @media ${device.mobile} {
        padding: 8px;
    }

    @media ${device.tablet} {
        padding: 20px;
    }

    @media ${device.laptop} {
        padding: 30px;
    }
`

export const RecommendationHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const RecommendationButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`

export const RecommendationContentTopContainer = styled.div`
    width: 100%;
`
export const RecommendationContentMiddleContainer = styled.div`
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
export const RecommendationContentBottomContainer = styled.div`
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

export const RecommendationRestaurantNameText = styled.p`
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

export const RecommendationRestaurantAddressText = styled.p`
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

export const RecommendationRestaurantCategoryText = styled.p`
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

export const RecommendationTitleText = styled.p`
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

export const RecommendationSummaryText = styled.p`
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

export const RecommendationAuthorNameText = styled.p`
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

export const RecommendationAuthorTitleText = styled.p`
    opacity: 0.4;
    font-family: Rubik;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${props => props.theme.charcoalGrey};

    @media ${device.mobile} {
        font-size: 10px;
    }

    @media ${device.tablet} {
        font-size: 10px;
    }

    @media ${device.laptop} {
        font-size: 12px;
    }
`