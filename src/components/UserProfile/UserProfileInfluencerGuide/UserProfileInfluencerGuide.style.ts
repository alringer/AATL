import { CustomButton } from 'style/Button/Button.style'
import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { device } from 'style/device'
import styled, { css } from 'styled-components'

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

export const UserProfileInfluencerGuideIconsContainer = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

export const UserProfileInfluencerGuideRecommendationIconsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    margin-bottom: 14px;
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

export const UserProfileInfluencerGuideIconText = styled.p`
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${props => props.theme.mushroom};
`

export const UserProfileInfluencerGuideRecommendationWritten = styled.p`
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.mushroom};
`

// export const UserProfileInfluencerGuide
// export const UserProfileInfluencerGuide
// export const UserProfileInfluencerGuide
// export const UserProfileInfluencerGuide
// export const UserProfileInfluencerGuide