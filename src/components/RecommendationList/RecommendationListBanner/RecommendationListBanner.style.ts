import CallMadeIcon from '@material-ui/icons/CallMade'
import { CustomButton } from 'style/Button/Button.style'
import { CustomIconButton } from 'style/Button/IconButton.style'
import { device } from 'style/device'
import styled from 'styled-components'

type RecommendationListBannerContainer = {
    backgroundImageURL: string
}

export const RecommendationListBannerContainer = styled.div<RecommendationListBannerContainer>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-image: url(${(props) => props.backgroundImageURL});
    background-position: center;
    background-origin: center;
    background-repeat: no-repeat;
    background-size: cover;

    width: 100%;

    @media ${device.mobile} {
        padding: 16px;
    }
    @media ${device.tablet} {
        padding: 14px;
    }
    @media ${device.laptop} {
        padding: 40px;
    }
`

export const RecommendationListBannerButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

    @media ${device.mobile} {
        margin-bottom: 114px;
    }
    @media ${device.tablet} {
        margin-bottom: 74px;
    }
    @media ${device.laptop} {
        margin-bottom: 301px;
    }
`
export const RecommendationListBannerContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;

    @media ${device.mobile} {
        margin-bottom: 4px;
        margin-left: 0;
    }
    @media ${device.tablet} {
        margin-bottom: 6px;
        margin-left: 10px;
    }
    @media ${device.laptop} {
        margin-bottom: 10px;
        margin-left: 210px;
    }
`

export const RecommendationListBannerTitle = styled.p`
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

export const RecommendationListBannerDescription = styled.p`
    text-shadow: 0 2px 0 rgba(54, 57, 64, 0.12);
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: ${(props) => props.theme.white};

    @media ${device.mobile} {
        font-size: 16px;
        line-height: 1.5;
    }
    @media ${device.tablet} {
        font-size: 24px;
        line-height: 1.5;
    }
    @media ${device.laptop} {
        font-size: 24px;
        line-height: 1.17;
    }
`

export const RecommendationListBannerButton = styled(CustomButton)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    min-width: 88px;
    margin-left: 10px;

    color: ${(props) => props.theme.white};
    background-color: transparent;
    border-color: ${(props) => props.theme.white};
    :hover {
        background-color: transparent;
        border-color: ${(props) => props.theme.white};
    }
`

export const RecommendationListBannerIconButton = styled(CustomIconButton)`
    min-width: 32px !important;
    width: 32px;
    height: 32px;
    padding: 4px;

    span {
        width: fit-content;
    }

    color: ${(props) => props.theme.white};
    background-color: transparent;
    border-color: ${(props) => props.theme.white};
    :hover {
        background-color: transparent;
        border-color: ${(props) => props.theme.white};
    }
`

export const RecommendationListBannerShareIcon = styled(CallMadeIcon)`
    width: 18px;
    height: 18px;
    color: white;

    margin-right: 6px;
`
