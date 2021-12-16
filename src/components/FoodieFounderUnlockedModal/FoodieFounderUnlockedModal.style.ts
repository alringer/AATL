import Dialog from '@material-ui/core/Dialog'
import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import styled from 'styled-components'

export const FoodieFounderModalCustomDialog = styled(Dialog)`
    @media ${device.tablet} {
        margin: 0;
        .MuiDialog-paper {
            margin: 0;
        }
    }
`
export const FoodieFounderModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 100vh;

    @media ${device.mobile} {
        width: 100%;
        height: 100%;
    }
    @media ${device.tablet} {
        width: 700px;
        height: auto;
    }
    @media ${device.laptop} {
        width: 780px;
    }
`

export const FoodieFounderModalTitle = styled.p`
    font-size: 36px;
    font-family: Rubik;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: normal;
    text-align: center;
    color: ${(props) => props.theme.darkGrey};

    @media ${device.laptop} {
        margin-top: 60px;
    }
    @media ${device.tablet} {
        margin-top: 60px;
    }
    @media ${device.mobile} {
        margin-top: 55px;
    }
`
export const FoodieFounderModalBadge = styled.img`
    opacity: 0.75;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
`
export const FoodieFounderModalSubtitle = styled.p`
    font-family: Rubik;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: center;
    margin-top: 10px;
    color: ${(props) => props.theme.darkGrey};
`
export const FoodieFounderModalMessage = styled.p`
    text-align: center;
    font-family: Rubik;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${(props) => props.theme.darkGrey};
    margin-left: auto;
    margin-right: auto;
    @media ${device.laptop} {
        margin-top: 30px;
        width: 436px;
    }
    @media ${device.tablet} {
        margin-top: 30px;
        width: 436px;
    }
    @media ${device.mobile} {
        margin-top: 20px;
        width: 324px;
    }
`
export const FoodieFounderModalOkCool = styled(CustomButton)`
    color: ${(props) => props.theme.mushroom};
    letter-spacing: 2px;
    font-weight: 500;
    font-size: 12px;
    border: solid 2px rgba(30, 31, 34, 0.1);
    background-color: white;
    width: 120px;
    margin-left: auto;
    margin-right: auto;
    @media ${device.laptop} {
        margin-top: 60px;
        margin-bottom: 76px;
    }
    @media ${device.tablet} {
        margin-top: 60px;
        margin-bottom: 76px;
    }
    @media ${device.mobile} {
        margin-top: 30px;
        margin-bottom: 55px;
    }
`
export const FoodieFounderText = styled.span`
    color: ${(props) => props.theme.dustyOrange};
`
