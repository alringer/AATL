import { device } from 'style/device'
import styled from 'styled-components'

export const CityBannerContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;

    @media ${device.mobile} {
        height: 212px;
    }
    @media ${device.tablet} {
        height: 286px;
    }
    @media ${device.laptop} {
        height: 600px;
    }
`

export const CityBannerImageContainer = styled.div`
    width: 100%;
    height: 100%;
    img {
        object-fit: cover;
    }
    ::after {
            position: absolute;
            content: '';
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.25);
        }
`

export const CityName = styled.p`
    text-shadow: 0 2px 0 rgba(54, 57, 64, 0.12);
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${props => props.theme.white};

    position: absolute;

    @media ${device.mobile} {
        font-size: 30px;
        left: 10px;
        bottom: 20px;
    }
    @media ${device.tablet} {
        font-size: 50px;
        left: 24px;
        bottom: 40px;
    }
    @media ${device.laptop} {
        font-size: 58px;
        left: 250px;
        bottom: 100px;
    }
`