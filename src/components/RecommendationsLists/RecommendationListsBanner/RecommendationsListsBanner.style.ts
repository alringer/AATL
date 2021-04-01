import { device } from 'style/device'
import zIndices from 'style/zIndices'
import styled from 'styled-components'

export const RecommendationsListsBannerContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;

    @media ${device.mobile} {
        height: 420px;
    }
    @media ${device.tablet} {
        height: 320px;
    }
    @media ${device.laptop} {
        height: 600px;
    }
`

export const RecommendationsListsBannerImageContainer = styled.div`
    width: 100%;
    height: 100%;
    z-index: ${zIndices.recommendationsListsImage};
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
    }
`

export const RecommendationsListsBannerTextsContainer = styled.div`
    position: absolute;
    z-index: ${zIndices.recommendationsListsContent};

    @media ${device.mobile} {
        bottom: 0;
        padding: 40px 10px;
    }
    @media ${device.tablet} {
        padding: 0;
        left: 24px;
        bottom: 40px;
        max-width: 700px;
    }
    @media ${device.laptop} {
        left: 250px;
        bottom: 100px;
        max-width: 742px;
    }
`

export const RecommendationsListsBannerTitle = styled.p`
    text-shadow: 0 2px 0 rgba(54, 57, 64, 0.12);
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${(props) => props.theme.white};

    @media ${device.mobile} {
        font-size: 24px;
    }
    @media ${device.tablet} {
        font-size: 36px;
    }
    @media ${device.laptop} {
        font-size: 58px;
    }
`

export const RecommendationsListsBannerSubTitle = styled.p`
    text-shadow: 0 2px 0 rgba(54, 57, 64, 0.12);
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: ${(props) => props.theme.white};

    @media ${device.mobile} {
        font-size: 16px;
        line-height: 1.5;
        margin-top: 10px;
    }
    @media ${device.tablet} {
        font-size: 24px;
        line-height: 1.5;
        margin-top: 10px;
    }
    @media ${device.laptop} {
        font-size: 24px;
        line-height: 1.17;
        margin-top: 10px;
    }
`
