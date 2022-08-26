import { device } from 'style/device'
import zIndices from 'style/zIndices'
import styled from 'styled-components'

export const HomeBannerContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    @media ${device.mobile} {
        padding: 24px 16px 34px;
    }
    @media ${device.tablet} {
        padding: 48px;
    }
    @media ${device.laptop} {
        padding: 198px 320px;
    }
`

export const HomeBannerImageContainer = styled.div`
    z-index: ${zIndices.homeBannerImage};
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
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
        background-color: rgba(0, 0, 0, 0.44);
    }
`

export const HomeBannerCenterContentContainer = styled.div`
    z-index: ${zIndices.homeBannerContent};
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export const HomeBannerBottomContentContainer = styled.div`
    position: absolute;
    z-index: ${zIndices.homeBannerContent};

    bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export const HomeBannerTitleText = styled.p`
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    font-family: 'EksellDisplay-Small';
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.21;
    letter-spacing: normal;
    text-align: center;
    color: ${(props) => props.theme.white};

    margin-bottom: 20px;

    @media ${device.tablet} {
        font-size: 48px;
    }
    @media ${device.laptop} {
        font-size: 56px;
    }
`
export const HomeBannerSubTitleText = styled.p`
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.04);
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: italic;
    line-height: 1.4;
    letter-spacing: normal;
    text-align: center;
    color: ${(props) => props.theme.white};

    margin-bottom: 25px;

    @media ${device.mobile} {
        font-size: 13px;
    }
    @media ${device.tablet} {
        font-size: 16px;
    }
    @media ${device.laptop} {
        font-size: 22px;
    }
`
export const HomeBannerSubTitleTwoText = styled.p`
    font-family: 'Rubik', sans-serif;
    /* text-shadow: 0 1px 0 rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.04); */
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
    font-size: 28px;
    font-weight: 400;
    font-stretch: normal;
    line-height: 43px;
    letter-spacing: normal;
    text-align: center;
    color: #ffc09c;

    margin-bottom: 30.5px;

    @media ${device.mobile} {
        font-size: 16px;
    }
    @media ${device.tablet} {
        font-size: 20px;
    }
    @media ${device.laptop} {
        font-size: 28px;
    }
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
    color: ${(props) => props.theme.white};
`
