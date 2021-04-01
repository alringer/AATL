import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { device } from 'style/device'
import styled from 'styled-components'

export const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    @media ${device.mobile} {
        padding: 0;
    }
    @media ${device.tablet} {
        padding: 24px 0;
    }
    @media ${device.laptop} {
        padding: 90px 0;
    }
`


// Header
export const SectionHeaderContainer = styled(ContentWrapper)`
    width: 100%;
    @media ${device.mobile} {
        padding: 32px 0;
    }
    @media ${device.tablet} {
        padding: 40px 0;
    }
`

export const SectionHeaderTitleText = styled.p`
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.charcoalGrey};

    @media ${device.mobile} {
        font-size: 20px;
        margin-bottom: 6px;
    }
    @media ${device.tablet} {
        font-size: 36px;
        margin-bottom: 8px;
    }
    @media ${device.laptop} {
        font-size: 36px;
        margin-bottom: 20px;
    }
`

export const SectionHeaderSubTitleText = styled.p`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.darkGrey};

    @media ${device.mobile} {
        font-size: 13px;
    }
    @media ${device.tablet} {
        font-size: 16px;
    }
`