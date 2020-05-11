import { CustomButton } from 'style/Button/Button.style'
import { TextLink } from 'style/Button/TextLink.style'
import { device } from 'style/device'
import styled, { css } from 'styled-components'

export const ModalContainer = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white;
    backdrop-filter: blur(10px);
    background-color: rgba(24, 26, 34, 0.64);
`

export const ModalContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* TODO: Determine the proper max-height */
    max-height: 100vh;

    @media ${device.mobile} {
        width: 100%;
        /* 100% correct? */
        height: 100%;
    }
    @media ${device.tablet} {
        width: 560px;
        height: auto;
    }
    @media ${device.laptop} {
        width: 560px;
    }
`

export const ModalHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    background-color: ${props => props.theme.darkSlateBlue};

    @media ${device.mobile} {
        padding: 16px;
        justify-content: space-between;
    }
    @media ${device.tablet} {
        padding: 16px 30px;
        justify-content: center;
    }
`

export const ModalBodyContainer = styled.div`
    flex-grow: 1;
    background-color: white;

    @media ${device.mobile} {
        padding: 24px 16px;
    }
    @media ${device.tablet} {
        padding: 30px 50px 40px;
    }
`

export const ModalDivider = styled.hr`
    width: 100%;
    height: 1px;
    border-color: ${props => props.theme.darkGreyOpaque};
    margin-top: 30px;
    margin-bottom: 30px;
`

export const ModalRowContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    ${props => {
        if (props.id === 'marginTop') {
            return css`
                margin-top: 20px;
            `
        }
    }}
`

// Footer
export const ModalFooterRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;

    margin-top: 38px;
`

export const ModalFooterText = styled.p`
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    text-align: right;
    color: ${props => props.theme.charcoalGrey};
`

export const ModalFooterTextLink = styled(TextLink)`
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
`
export const ModalFooterSignUp = styled(ModalFooterTextLink)`
    color: ${props => props.theme.dustyOrange};
`
export const ModalFooterSignIn = styled(ModalFooterTextLink)`
    color: ${props => props.theme.mushroom};
`

// Texts
export const ModalHeaderText = styled.p`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    color: ${props => props.theme.white};

    @media ${device.mobile} {
        opacity: 0.96;
        font-size: 12px;
        line-height: 1.67;
        letter-spacing: 2px;
        text-align: left;
    }
    @media ${device.tablet} {
        opacity: 1;
        font-size: 36px;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
    }
`

export const ModalIntroductoryText = styled.p`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};

    @media ${device.mobile} {
        font-size: 13px;
        text-align: left;
    }
    @media ${device.tablet} {
        font-size: 16px;
        text-align: center;
    }
`

export const ModalErrorText = styled.p`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${props => props.theme.dustyRed};

    @media ${device.mobile} {
        font-size: 13px;
        text-align: left;
    }
    @media ${device.tablet} {
        font-size: 16px;
        text-align: center;
    }
`

// Sign In
export const ForgotYourPassword = styled(TextLink)`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${props => props.theme.mushroom};

    @media ${device.mobile} {
        font-size: 10px;
    }
    @media ${device.tablet} {
        font-size: 12px;
    }
    
    margin-top: 6px;
`

// Buttons
export const AuthenticationWhiteButton= styled(CustomButton)`
    width: 100%;
    
    color: ${props => props.theme.pinkishTan};
    background-color: ${props => props.theme.white};
    border-color: ${props => props.theme.darkGreyOpaque};
    :hover {
        /* border-color: ${props => props.theme.darkGreyOpaque}; */
    }
`

export const AuthenticationOrangeButton = styled(CustomButton)`
    width: 100%;
    
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.dustyOrange};
    :hover {
        background-color: ${props => props.theme.dustyOrange};
    }
`
