import { CustomButton } from 'style/Button/Button.style'
import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { device } from 'style/device'
import styled, { css, keyframes } from 'styled-components'

export const UserProfileInfluencerGuideContainer = styled(ContentWrapper)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;

    border-bottom: solid 1px #e8e8e8;

    @media ${device.mobile} {
        padding: 20px 0;
    }
    @media ${device.tablet} {
        padding: 100px 0;
    }
`
export const UserProfileInfluencerGuideTextsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1;
`

export const UserProfileInfluencerGuideHeader = styled.p`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: normal;

    margin-bottom: 20px;

    @media ${device.mobile} {
        font-size: 20px;
        color: ${props => props.theme.charcoalGrey};
    }
    @media ${device.tablet} {
        font-size: 36px;
        color: ${props => props.theme.darkSlateBlue};
    }

`

export const UserProfileInfluencerGuideMessage = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${props => props.theme.darkGrey};

    margin-bottom: 20px;
`

export const UserProfileInfluencerGuideButton = styled(CustomButton)`
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.dustyOrange};

    :hover {
        background-color: ${props => props.theme.dustyOrange};
    }

    @media ${device.mobile} {
        align-self: center;
    }
    @media ${device.tablet} {
        align-self: auto;
    }
`

type isLockedProp = {
    isLocked: boolean
}

export const UserProfileInfluencerGuideIconsContainer = styled.div<isLockedProp>`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    ${props => {
        if (props.isLocked === false) {
            return css`
                justify-content: center;
            `
        }
    }}
`

type fadeOutProp  = {
    fadeOut?: boolean
}

type fadeInProp = {
    fadeIn?: boolean
}

const fadeOutSlide = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }

  to {
    opacity: 0;
    transform: translateX(20px);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const UserProfileInfluencerGuideRecommendationIconsContainer = styled.div<fadeOutProp>`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    margin-bottom: 14px;
    ${props => {
        if (props.fadeOut === true) {
            return css`
                animation: ${fadeOutSlide} 1s linear 1;
            `
        }
    }}
`

type UserProfileInfluencerGuideIconSpanType = {
    recommendationsCount: number
    target: number
}

export const UserProfileInfluencerGuideIconSpan = styled.span<UserProfileInfluencerGuideIconSpanType>`
    width: 56px;
    height: 56px;
    border: dashed 2px ${props => props.theme.mushroom};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    opacity: 0.5;

    ${props => {
        if (props.recommendationsCount === props.target) {
            return css`
                opacity: 1;
                background-color: ${props => props.theme.mushroom};
                border: transparent;

                ${UserProfileInfluencerGuideIconText} {
                    color: ${props => props.theme.white};
                }
            `
        } else if (props.recommendationsCount > props.target) {
            return css`
                opacity: 0.5;
                background-color: ${props => props.theme.mushroom};
                border: transparent;

                ${UserProfileInfluencerGuideIconText} {
                    color: ${props => props.theme.white};
                }
            `
        }
    }}
`

export const UserProfileInfluencerGuideUnlockedIcon = styled.img<isLockedProp>`
    width: 100px;
    height: 100px;
    border-radius: 50%;

    margin-bottom: 24px;

    ${props => {
        if (props.isLocked === false) {
            return css`
                animation: ${fadeIn} 1s linear 1;
            `
        }
    }}
`

export const UserProfileInfluencerGuideLockedIcon = styled.img<isLockedProp>`
    width: 60px;
    height: 60px;
    border-radius: 50%;

    margin-bottom: 24px;
    position: relative;

    ::after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        content: '';
        backdrop-filter: blur(50px);
        background-color: rgba(0,0,0,0.3);
    }

        ${props => {
        if (props.isLocked === false) {
            return css`
                animation: ${fadeOut} 1s linear 1;
            `
        }
    }}
`

export const UserProfileInfluencerGuideIconText = styled.p`
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${props => props.theme.mushroom};
`

export const UserProfileInfluencerGuideRecommendationWritten = styled.p<fadeOutProp & fadeInProp>`
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.mushroom};

    ${props => {
        if (props.fadeOut === true) {
            return css`
                animation: ${fadeOut} 1s linear 1;
            `
        }
        if (props.fadeIn === true) {
            return css`
                animation: ${fadeIn} 1s linear 1;
            `
        }
    }}
`

// export const UserProfileInfluencerGuide
// export const UserProfileInfluencerGuide
// export const UserProfileInfluencerGuide
// export const UserProfileInfluencerGuide
// export const UserProfileInfluencerGuide