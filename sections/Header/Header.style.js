import Button from '@material-ui/core/Button'
import styled, { css } from 'styled-components'
import { device } from '../../style/device'

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.12);
    background-color: rgba(255, 255, 255, 0.6);

    @media ${device.mobile} {
        padding: 13px 16px;
    }

    @media ${device.tablet} {
        padding: 16px 20px;
        justify-content: space-between;
    }

    @media ${device.laptop} {
        padding: 20px 40px;
        justify-content: space-between;
    }
`

export const RightItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`
export const LeftItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

export const LogoContainer = styled.div`
    @media ${device.mobile} {
        width: 106.6px;
        height: 30px;
    }

    @media ${device.tablet} {
        width: 152px;
        height: 64px;
    }

    @media ${device.laptop} {
        width: 260px;
        height: 110px;
    }
`

export const MenuItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 50px;
`

export const MenuItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    ${props => {
        if (props.id === 'rightmost') {
            return css`
                margin-left: 50px;
            `
        }
    }}
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    ${props => {
        if (props.id === 'rightmost') {
            return css`
                margin-left: 10px;
            `
        }
    }}
`

export const LoginItemsContainer = styled.div``
export const AdminItemsContainer = styled.div``
export const ProfileItemsContainer = styled.div``

export const SignUpButton = styled(Button)`

`
export const LoginButton = styled(Button)`

`