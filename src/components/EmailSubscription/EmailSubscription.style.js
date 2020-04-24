import { CustomButton } from 'style/Button/Button.style'
import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { device } from 'style/device'
import { CustomTextField } from 'style/TextField/TextField.style'
import styled, { css } from 'styled-components'

export const EmailSubscriptionContainer = styled(ContentWrapper)`
    display: flex;

    @media ${device.mobile} {
        padding-top: 24px;
        padding-bottom: 34px;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    @media ${device.tablet} {
        padding-top: 24px;
        padding-bottom: 50px;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    @media ${device.laptop} {
        padding-top: 100px;
        padding-bottom: 120px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        text-align: left;
    }
`

export const EmailSubscriptionRow = styled.div`
    display: flex;
    width: 100%;
    height: 100%;

    @media ${device.mobile} {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        ${props => {
        if (props.id === 'marginTop') {
            return css`
                margin-top: 8px;
            `
        }
    }}
    }
    @media ${device.tablet} {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    @media ${device.laptop} {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        ${props => {
            if (props.id === 'marginTop') {
                return css`
                    margin-top: 18px;
                `
            }
        }}
    }

`

export const EmailSubscriptionTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;

    @media ${device.mobile} {
        width: 100%;
    }
    @media ${device.tablet} {
        width: 100%;
        max-width: 680px;
    }
    @media ${device.laptop} {
        width: 50%;
        max-width: none;
    }
`
export const EmailSubscriptionTitle = styled.p`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};

    @media ${device.mobile} {
        font-size: 20px;
        line-height: normal;
    }
    @media ${device.tablet} {
        font-size: 36px;
        line-height: 1.19;
    }
    @media ${device.laptop} {
        font-size: 36px;
        line-height: 1.19;
    }
`
export const EmailSubscriptionBody = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};

    @media ${device.mobile} {
        font-size: 11px;
        line-height: 1.64;
    }
    @media ${device.tablet} {
        font-size: 16px;
        line-height: 1.38;
    }
    @media ${device.laptop} {
        font-size: 16px;
        line-height: 1.38;
    }
`
export const EmailSubscriptionFormContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    @media ${device.mobile} {
        margin-top: 24px;
        height: 44px;
        width: 100%;
        max-width: 330px;
    }
    @media ${device.tablet} {
        margin-top: 24px;
        height: 100%;
        width: 100%;
        max-width: 530px;
    }
    @media ${device.laptop} {
        margin-top: 0px;
        height: 100%;
        width: 40%;
        max-width: none;
    }
`

export const EmailSubscriptionTextInput = styled(CustomTextField)``

export const EmailSubscriptionButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media ${device.mobile} {
        margin-left: 0px;
    }
    @media ${device.tablet} {
        margin-left: 10px;
    }
    @media ${device.laptop} {
        margin-left: 10px;
    }
`

export const EmailSubscriptionSubscribeButton = styled(CustomButton)`
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.darkSlateBlue};
    border: 0;
    :hover {
        background-color: ${props => props.theme.darkSlateBlue};
    }
`