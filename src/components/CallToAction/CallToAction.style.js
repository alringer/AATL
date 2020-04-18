import CallToActionSmallSVG from 'assets/call-to-action-small-background.svg'
import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import styled from 'styled-components'

export const CallToActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    /* TODO: Render small and large depending on the context */
    background-image: url(${CallToActionSmallSVG});
    width: 100%;
    padding: 24px 20px;

    @media ${device.mobile} {
        max-width: 300px;
        height: 300px;
    }
    @media ${device.tablet} {
        max-width: 348px;
        height: 368px;
    }
    @media ${device.laptop} {
        max-width: 300px;
        height: 318px;
    }
`

export const CallToActionContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

export const CallToActionTitle = styled.p`
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    color: ${props => props.theme.white};
`

export const CallToActionAddress = styled.p`
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${props => props.theme.white};

    margin-top: 15px;
`

export const CallToActionMessage = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${props => props.theme.white};

    margin-top: 10px;
`

export const CallToActionButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const CallToActionNoButton = styled(CustomButton)`
    color: ${props => props.theme.white};
    background-color: transparent;
    border-color: ${props => props.theme.white};
    :hover {
        background-color: transparent;
    }
`

export const CallToActionYesButton = styled(CustomButton)`
    color: ${props => props.theme.darkSlateBlue};
    background-color: ${props => props.theme.white};
    :hover {
        background-color: ${props => props.theme.white};
    }
`