import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { device } from 'style/device'
import styled from 'styled-components'

export const ListContainer = styled(ContentWrapper)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    @media ${device.mobile} {
        padding-top: 40px;
        padding-bottom: 40px;
    }
    @media ${device.tablet} {
        padding-top: 64px;
        padding-bottom: 64px;
    }
    @media ${device.laptop} {
        padding-top: 128px;
        padding-bottom: 100px;
    }
`

export const RecommendationCardContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${device.mobile} {
        margin: 5px 0px;
    }
    @media ${device.tablet} {
        margin: 10px 0px;
    }
    @media ${device.laptop} {
        margin: 10px 0px;
    }
`

export const PlaceCardsGrid = styled.div`
    width: 100%;
    display: grid;
    justify-content: space-between; 

    @media ${device.mobile} {
        grid-template-columns: auto;
        row-gap: 10px;
    }
    @media ${device.tablet} {
        grid-template-columns: 1fr 1fr;
        row-gap: 40px;
    }
    @media ${device.laptop} {
        grid-template-columns: 1fr 1fr 1fr;
        row-gap: 50px;
    }
`
export const PlaceCardContainer = styled.div``

// Texts
export const ListTitle = styled.p`
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.charcoalGrey};
    text-align: center;

    @media ${device.mobile} {
        font-size: 20px;
    }
    @media ${device.tablet} {
        font-size: 36px;
    }
    @media ${device.laptop} {
        font-size: 36px;
    }
`
export const ListSubTitle = styled.p`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.darkGrey};
    text-align: center;

    @media ${device.mobile} {
        font-size: 13px;
        margin-top: 5px;
        margin-bottom: 20px;    
    }
    @media ${device.tablet} {
        font-size: 16px;
        margin-top: 8px;
        margin-bottom: 30px;    
    }
    @media ${device.laptop} {
        font-size: 16px;
        margin-top: 20px;
        margin-bottom: 40px;    
    }
`
