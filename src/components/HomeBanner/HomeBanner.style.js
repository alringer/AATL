import { device } from 'style/device'
import styled from 'styled-components'

export const HomeBannerContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

export const HomeBannerImageContainer = styled.div`
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
        /* background-blend-mode: multiply;
        background-image: linear-gradient(to bottom, #cdab95, #cdab95); */
    }
`

export const HomeBannerCenterContentContainer = styled.div`
    position: absolute;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export const HomeBannerBottomContentContainer = styled.div`
    position: absolute;
    
    bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export const HomeBannerTitleText = styled.p`
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    font-family: 'EksellDisplay-Small';
    font-size: 56px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.21;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.white};
`
export const HomeBannerSubTitleText = styled.p`
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.04);
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: italic;
    line-height: 2.39;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.white};

    margin-bottom: 30.5px;
`
export const HomeBannerFooterText = styled.p`
    margin-top: 8px;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.white};
`
