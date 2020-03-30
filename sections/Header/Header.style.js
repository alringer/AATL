import styled from 'styled-components'
import { device } from '../../style/device'

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.12);
    background-color: rgba(255, 255, 255, 0.6);

    /* tablet */

    /* laptop */
    @media ${device.laptop} {
        padding: 20px 40px;
        /* height: 150px; */
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

export const MenuItemsContainer = styled.div``
export const LoginItemsContainer = styled.div``
export const AdminItemsContainer = styled.div``
export const ProfileItemsContainer = styled.div``