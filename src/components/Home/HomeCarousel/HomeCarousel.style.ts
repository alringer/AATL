import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { CustomButton } from 'style/Button/Button.style'
import { CustomIconButton } from 'style/Button/IconButton.style'
import { device } from 'style/device'
import styled, { css } from 'styled-components'

export const HomeCarouselContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;

    width: 100%;
`

// Home Carousel Card Styles
export const HomeCarouselCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    @media ${device.mobile} {
        padding-left: 8px;
        padding-right: 8px;
    }
    @media ${device.tablet} {
        padding-left: 24px;
        padding-right: 24px;
    }
    @media ${device.laptop} {
        padding-left: 0;
        padding-right: 0;
    }

    width: 100%;
`

export const HomeCarouselImageContainer = styled.div`
    width: 100%;

    @media ${device.mobile} {
        height: 200px;
    }
    @media ${device.laptop} {
        height: 350px;
    }

    img {
        object-fit: cover;
    }
`

export const HomeCarouselTextContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    background-color: ${(props) => props.theme.dustyOrange};

    @media ${device.mobile} {
        padding: 24px 10px;
        align-items: center;
    }
    @media ${device.tablet} {
        padding: 30px 54px;
        align-items: flex-start;
    }
    @media ${device.laptop} {
        padding: 45px 410px;
        align-items: center;
    }
`

export const HomeCarouselTitleText = styled.p`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: ${(props) => props.theme.white};

    @media ${device.mobile} {
        font-size: 20px;
        margin-bottom: 5px;
        line-height: 1.2;
        text-align: center;
    }
    @media ${device.tablet} {
        font-size: 36px;
        margin-bottom: 14px;
        line-height: 1.19;
        text-align: left;
    }
    @media ${device.laptop} {
        margin-bottom: 5px;
        text-align: center;
    }
`
export const HomeCarouselCategoryText = styled.p`
    max-width: 300px;

    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${(props) => props.theme.white};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media ${device.mobile} {
        margin-bottom: 15px;
        text-align: center;
    }
    @media ${device.tablet} {
        margin-bottom: 20px;
        text-align: left;
    }
    @media ${device.laptop} {
        text-align: center;
    }
`
export const HomeCarouselSubTitleText = styled.p`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: ${(props) => props.theme.white};
    line-height: 1.79;

    @media ${device.mobile} {
        font-size: 16px;
        text-align: center;
        margin-bottom: 20px;
    }
    @media ${device.tablet} {
        font-size: 24px;
        margin-bottom: 17px;
        text-align: left;
    }
    @media ${device.laptop} {
        text-align: center;
    }
`
export const HomeCarouselDescriptionText = styled.p`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: ${(props) => props.theme.white};

    @media ${device.mobile} {
        line-height: 1.8;
        font-size: 10px;
        margin-bottom: 32px;
        text-align: center;
    }
    @media ${device.tablet} {
        line-height: 1.38;
        font-size: 16px;
        margin-bottom: 27px;
        text-align: left;
    }
    @media ${device.laptop} {
        margin-bottom: 31px;
        text-align: left;
    }
`

export const HomeCarouselViewMoreButton = styled(CustomButton)`
    color: ${(props) => props.theme.charcoalGrey};
    background-color: ${(props) => props.theme.white};
    border-color: ${(props) => props.theme.white};
    :hover {
        background-color: ${(props) => props.theme.white};
        border-color: ${(props) => props.theme.white};
    }

    @media ${device.mobile} {
        margin-left: 0;
    }
    @media ${device.tablet} {
        margin-left: auto;
    }
    @media ${device.laptop} {
        margin-left: 0;
    }
`

type HomeCarouselArrowIconButton = {
    isCurrent: boolean
}

export const HomeCarouselForwardIconButton = styled(CustomIconButton)<HomeCarouselArrowIconButton>`
    position: absolute;
    right: 60px;
    top: 50%;
    transform: translateY(-50%);

    min-width: 32px !important;
    width: 32px;
    height: 32px;
    padding: 4px;

    span {
        width: fit-content;
    }

    color: ${(props) => props.theme.white};
    background-color: transparent;
    border-color: transparent;
    :hover {
        background-color: transparent;
        border-color: transparent;
    }
    ${(props) => {
        if (!props.isCurrent) {
            return css`
                display: none;
            `
        }
    }}

    @media ${device.mobile} {
        display: none;
    }
    @media ${device.laptop} {
        display: flex;
    }
`

export const HomeCarouselBackwardIconButton = styled(CustomIconButton)<HomeCarouselArrowIconButton>`
    position: absolute;
    left: 60px;
    top: 50%;
    transform: translateY(-50%);

    min-width: 32px !important;
    width: 32px;
    height: 32px;
    padding: 4px;

    span {
        width: fit-content;
    }

    color: ${(props) => props.theme.white};
    background-color: transparent;
    border-color: transparent;
    transform: scaleX(-1);
    :hover {
        background-color: transparent;
        border-color: transparent;
    }
    ${(props) => {
        if (!props.isCurrent) {
            return css`
                display: none;
            `
        }
    }}

    @media ${device.mobile} {
        display: none;
    }
    @media ${device.laptop} {
        display: flex;
    }
`

export const HomeCarouselForwardIcon = styled(ArrowForwardIosIcon)`
    color: ${(props) => props.theme.white};
`
export const HomeCarouselBackwardIcon = styled(ArrowBackIosIcon)`
    color: ${(props) => props.theme.white};
`
