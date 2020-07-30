import Dialog from '@material-ui/core/Dialog'
import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import styled from 'styled-components'

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

export const ListModalTitleText = styled.div`
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};
`

export const ListModalCardContainer = styled.div`
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
`

export const ListModalCardTextContainer = styled.div`
    display: flex;
    flex-direction: column;
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

    padding: 21px 30px;
`

// Buttons
export const AddToNewList = styled(CustomButton)`
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.mushroom};
    border-color: ${(props) => props.theme.darkGreyOpaque};
    :hover {
        border-color: ${(props) => props.theme.darkGreyOpaque};
    }
`

export const AddPlaceButton = styled(CustomButton)`
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.dustyOrange};
    :hover {
        background-color: ${(props) => props.theme.dustyOrange};
    }
    margin-left: 20px;
`

export const CancelButton = styled(CustomButton)`
    color: ${(props) => props.theme.mushroom};
    background-color: ${(props) => props.theme.white};
    border-color: ${(props) => props.theme.darkGreyOpaque};
    :hover {
        border-color: ${(props) => props.theme.darkGreyOpaque};
    }
`