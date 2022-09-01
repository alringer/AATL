import { Dialog } from '@material-ui/core'
import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import styled from 'styled-components'

export const GuidelinesModalCustomDialog = styled(Dialog)`
    position: fixed !important;
    bottom: 0 !important;
    width: 100%;
`

export const GuidelinesModalContainer = styled.div`
    padding: 30px;
`

export const GuidelinesModalDiv = styled.div`
    display: flex;
    @media ${device.mobile} {
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }
    @media ${device.tablet} {
        flex-direction: row;
        align-items: stretch;
    }
    @media ${device.laptop} {
    }
`

export const GuidelinesModalHeader = styled.p`
    font-weight: 500;
    font-size: 16px;
    line-height: 1.25;
    color: ${(props) => props.theme.mushroom};
    letter-spacing: 2.67px;
`
export const GuidelinesModalMessage = styled.p`
    color: ${(props) => props.theme.charcoalGrey};
    line-height: 1.38;
    font-size: 16px;
    font-family: Rubik;
    display: inline;
    @media ${device.mobile} {
        width: 100%;
    }
    @media ${device.tablet} {
        width: 80%;
        margin-right: 20px;
    }
    @media ${device.laptop} {
    }
`

export const GuidelinesModalOkGotIt = styled(CustomButton)`
    display: inline;
    letter-spacing: 2px;
    font-weight: 500;
    font-size: 12px;
    line-height: 1.67;
    border: solid 2px rgba(30, 31, 34, 0.1);
    background-color: white;
    max-height: 90px;
    color: ${(props) => props.theme.pinkishTan};
    @media ${device.mobile} {
        width: 200px;
        margin-top: 20px;
    }
    @media ${device.tablet} {
        width: 180px;
        height: 46px;
        margin-top: 0;
        align-self: center;
        margin-left: auto;
    }
`

export const GuidelinesModalVerticalLine = styled.span`
    @media ${device.laptop} {
        display: inline;
        border-left: 1px solid;
        border-color: ${(props) => props.theme.mushroom};

        margin-left: auto;
        margin-right: auto;
    }
`
