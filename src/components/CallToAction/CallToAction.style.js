import CallToActionLargeSVG from 'assets/call-to-action-large-background.svg'
import CallToActionSmallSVG from 'assets/call-to-action-small-background.svg'
import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import styled, { css } from 'styled-components'
import { CallToActionID } from './CallToAction'

export const CallToActionContainer = styled.div`
    display: flex;
    width: 100%;

    ${props => {
        if (props.id === CallToActionID.large) {
            return css`
                @media ${device.mobile} {
                    max-width: 360px;
                    background-image: url(${CallToActionSmallSVG});
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-start;
                    padding: 24px 20px;
                }
                @media ${device.tablet} {
                    max-width: 720px;
                    background-image: url(${CallToActionLargeSVG});
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: flex-start;
                    padding: 38px 40px;
                }
                @media ${device.laptop} {
                    max-width: 940px;
                    background-image: url(${CallToActionLargeSVG});
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: flex-start;
                    padding: 38px 40px;
                }
            `
        } else if (props.id === CallToActionID.small) {
            return css`
                background-image: url(${CallToActionSmallSVG});
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
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
        }
    }}
`

export const CallToActionContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    ${props => {
        if (props.id === CallToActionID.large) {
            return css`
                padding-bottom: 70px;
                flex: 1;
            `
        } else if (props.id === CallToActionID.small) {
            return css`
                width: 100%;
            `
        }
    }}
`

export const CallToActionButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;

    ${props => {
        if (props.id === CallToActionID.large) {
            return css`
                justify-content: flex-end;
                align-self: flex-end;
                width: auto;
                ${CallToActionNoButton} {
                    margin-right: 10px;
                }
            `
        } else if (props.id === CallToActionID.small) {
            return css`
                justify-content: space-between;
                width: 100%;
            `
        }
    }}
`

// Texts
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

    ${props => {
        if (props.id === CallToActionID.small) {
            return css`
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
            `
        }
    }}
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

// Buttons

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