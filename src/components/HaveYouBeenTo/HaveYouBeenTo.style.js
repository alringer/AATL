import HaveYouBeenToBackground from 'assets/have-you-been-to-background.svg'
import { CustomButton } from 'style/Button/Button.style'
import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { device } from 'style/device'
import styled from 'styled-components'

export const HaveYouBeenToContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-image: url(${HaveYouBeenToBackground});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;

    @media ${device.mobile} {
        padding: 20px 0px;
    }
    @media ${device.tablet} {
        padding: 45px 0px;
    }
    @media ${device.laptop} {
        padding: 45px 0px;
    }
`
export const HaveYouBeenToContentContainer = styled(ContentWrapper)`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const HaveYouBeenToHeader = styled.p`
    font-size: 30px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.white};
`
export const HaveYouBeenToMessage = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: italic;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.white};

    @media ${device.mobile} {
        margin-top: 8px;
    }
    @media ${device.tablet} {
        margin-top: 15px;
    }
    @media ${device.laptop} {
        margin-top: 15px;
    }
`
export const WriteARecommendationButton = styled(CustomButton)`
    color: ${props => props.theme.charcoalGrey};
    background-color: ${props => props.theme.white};
    :hover {
        background-color: ${props => props.theme.white};
    }

    margin-top: 15px;
`