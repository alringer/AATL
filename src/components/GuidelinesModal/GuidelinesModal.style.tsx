import { Dialog } from '@material-ui/core'
import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import styled from 'styled-components'

export const GuidelinesModalCustomDialog = styled(Dialog)`
    position: fixed !important;
    bottom: 0 !important;
    width: 100%;
`

export const GuidelinesModalHeader = styled.p`
    font-weight: 500;
    font-size: 16px;
    line-height: 1.25;
    color: ${(props) => props.theme.mushroom};
    letter-spacing: 2.67px;
    margin-left: 37px;
    margin-top: 30px;
`
export const GuidelinesModalMessage = styled.p`
    color: ${(props) => props.theme.charcoalGrey};
    line-height: 1.38;
    font-size: 16px;
    font-family: RubikRoman;
    margin-left: 37px;
    margin-top: 13px;
    margin-right: 40px;
    margin-bottom: 40px;
    display: inline;
    width: 1100px;
    @media ${device.laptop} {
        height: 88px;
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
    margin-top: 26px;
    margin-right: 40px;
    margin-bottom: 40px;
    max-height: 90px;
    color: ${(props) => props.theme.pinkishTan};
    @media ${device.mobile} {
        width: 200px;
    }
    @media ${device.laptop} {
        width: 180px;
        height: 46px;
    }
`
export const GuidelinesModalDiv = styled.div`
    display: flex;
    @media ${device.tablet} {
        align-items: center;
    }
    @media ${device.mobile} {
        align-items: center;
    }
    @media ${device.laptop} {
        align-items: normal;
    }
`

export const GuidelinesModalVerticalLine = styled.span`
    @media ${device.laptop} {
        display: inline;
        border-left: 1px solid;
        border-color: ${(props) => props.theme.mushroom};
        margin-top: 13px;
        margin-right: 40px;
        height: 88px;
    }
`

export const GuidelinesModalContainer = styled.div``
