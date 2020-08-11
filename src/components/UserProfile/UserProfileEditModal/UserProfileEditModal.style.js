import Dialog from '@material-ui/core/Dialog'
import MUIArrowBackIcon from '@material-ui/icons/ArrowBack'
import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import { CustomTextField } from 'style/TextField/TextField.style'
import styled from 'styled-components'

// Content Area
export const UserProfileBannerInputsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const UserProfileBannerLeftContainer = styled.div``
export const UserProfileBannerRightContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 40px;
`


// Main
export const CustomDialog = styled(Dialog)`
    @media ${device.tablet} {
        margin: 0;
        .MuiDialog-paper {
            margin: 0;
        }
    }
`

export const UserProfileEditModalContentContainer = styled.div`
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
        width: 1077px;
    }
`

export const UserProfileEditModalMainContentContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media ${device.mobile} {
        margin-top: 15px;
    }
    @media ${device.tablet} {
        margin-top: 20px;
    }
`


export const UserProfileEditModalMainAreaContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media ${device.mobile} {
        padding: 30px 16px;
    }
    @media ${device.tablet} {
        padding: 30px;
    }
`

// Header
export const UserProfileEditModalHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
    width: 100%;
    padding: 20px 30px;
    background-color: ${props => props.theme.darkSlateBlue};
`

export const UserProfileEditModalHeaderText = styled.p`
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    color: ${props => props.theme.white};
`

// Footer
export const UserProfileEditModalFooterContainer = styled.div`
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

export const UserProfileEditModalFooterLeftContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: auto;
`
export const UserProfileEditModalFooterRightContainer = styled.div`
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

export const UserProfileEditModalMessage = styled.p`
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

export const UserProfileEditModalNavigationButton = styled(CustomButton)`
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

export const NameInput = styled(CustomTextField)`
    width: 100%;
`

export const TitleInput = styled(CustomTextField)`
    width: 100%;

    margin-top: 20px;
`

export const MultiInput = styled(CustomTextField)`
    height: 228px;

    margin-top: 22px;
`