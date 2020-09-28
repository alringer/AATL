import { Button as MUIButton } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import MatAddIcon from '@material-ui/icons/Add'
import MUIArrowBackIcon from '@material-ui/icons/ArrowBack'
import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import { CustomTextField } from 'style/TextField/TextField.style'
import styled, { css } from 'styled-components'

// Shared
export const CustomDialog = styled(Dialog)`
    @media ${device.tablet} {
        margin: 0;
        .MuiDialog-paper {
            margin: 0;
        }
    }
`

export const ListModalContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 100vh;

    @media ${device.mobile} {
        width: 100%;
        height: 100%;
    }
    @media ${device.tablet} {
        width: 768px;
        height: auto;
    }
    @media ${device.laptop} {
        width: 780px;
    }
`

export const ListModalMainAreaContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media ${device.mobile} {
        padding: 30px 16px;
    }
    @media ${device.tablet} {
        padding: 30px;
    }
`

export const ListModalDeleteListMessageContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media ${device.mobile} {
        padding: 30px 0;
    }
`

export const ListModalTitleText = styled.div`
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};
`

export const ListModalDeleteHighlightText = styled.span`
    color: ${props => props.theme.dustyOrange};
`


// Cards
export const ListModalLoadingContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`

export const ListModalMainContentContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media ${device.mobile} {
        margin-top: 15px;
    }
    @media ${device.tablet} {
        margin-top: 20px;
    }
`

export const ListModalCardButton = styled(MUIButton)`
    width: 100%;
    padding: 0;
    margin-bottom: 10px;
`

export const ListModalCardContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 4px;
    border: solid 2px rgba(29, 67, 84, 0.2);
    background-color: ${props => props.theme.white};

    @media ${device.mobile} {
        padding: 16.5px 16px;
    }
    @media ${device.tablet} {
        padding: 20px;
    }

    &::after {
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: transparent;
        transition: background-color .1s;
    }

    ${props => {
        if (props.id === 'selected') {
            return css`
                p {
                    color: ${props => props.theme.white};
                }
                background-color: ${(props) => props.theme.darkSlateBlue};
            `
        }
    }}

    &:hover {
        &::after {
            background-color: rgba(0,0,0,0.1);
        }
    }
`

export const ListModalCardImageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    width: 44px;
    height: 44px;

    margin-right: 20px;
`

export const ListModalCardTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

export const ListModalCardTitle = styled.p`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};

    @media ${device.mobile} {
        font-size: 14px;
    }
    @media ${device.tablet} {
        font-size: 16px;
    }
`
export const ListModalCardSubTitle = styled.p`    
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};
`

export const ListModalAddToListWideButton = styled(CustomButton)`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${(props) => props.theme.mushroom};
    background-color: transparent;
    border-color: transparent;
    :hover {
        background-color: transparent;
        border-color: transparent;
    }
`

export const AddIcon = styled(MatAddIcon)`
    color: ${(props) => props.theme.mushroom};
    margin-right: 12px;
`

// Header
export const ListModalHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
    width: 100%;
    padding: 20px 30px;
    background-color: ${props => props.theme.darkSlateBlue};
`

export const ListModalHeaderText = styled.p`
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    color: ${props => props.theme.white};
`


// Footer
export const ListModalFooterContainer = styled.div`
    margin-top: auto;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border: solid 2px rgba(54, 57, 64, 0.1);

    @media ${device.mobile} {
        padding: 21px 16px;
    }
    @media ${device.tablet} {
        padding: 21px 30px;
    }
`

export const ListModalFooterLeftContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: auto;
`
export const ListModalFooterRightContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;

    @media ${device.mobile} {
        justify-content: space-between;
        width: 100%;
    }
    @media ${device.tablet} {
        justify-content: flex-start;
        width: auto;
    }
`

export const ListModalMessage = styled.p`
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.69;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.mushroom};
`

// Buttons
export const ArrowBackIcon = styled(MUIArrowBackIcon)`
    color: white;
    margin-right: 10px; 
    height: 20px;
`

export const ListModalNavigationButton = styled(CustomButton)`
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.mushroom};
    border-color: ${(props) => props.theme.darkGreyOpaque};
    :hover {
        background-color: ${(props) => props.theme.mushroom};
        border-color: ${(props) => props.theme.darkGreyOpaque};
    }
`

export const SubmitButton = styled(CustomButton)`
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.dustyOrange};
    :hover {
        background-color: ${(props) => props.theme.dustyOrange};
    }

    margin-left: 20px;
    width: 120px;
`

export const CancelButton = styled(CustomButton)`
    color: ${(props) => props.theme.mushroom};
    background-color: ${(props) => props.theme.white};
    border-color: ${(props) => props.theme.darkGreyOpaque};
    :hover {
        background-color: ${(props) => props.theme.white};
        border-color: ${(props) => props.theme.darkGreyOpaque};
    }

    width: 120px;
`

// Inputs
export const ListModalInputRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-bottom: 20px;
`
export const ListModalInput = styled(CustomTextField)``