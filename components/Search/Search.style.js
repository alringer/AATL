import { FormControl } from '@material-ui/core'
import styled from 'styled-components'
import { CustomButton } from '../../style/Button/Button.style'

export const SearchButton = styled(CustomButton)`
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.dustyOrange};
    :hover {
        background-color: ${props => props.theme.dustyOrange};
    }
    margin-left: 10px;
`

export const HeaderSearchContainer = styled.div`
    display: flex;
    width: 300px;
`
export const PlaceholderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

export const PlaceholderTextBold = styled.p`
    font-weight: 500;   
    color: ${props => props.theme.charcoalGrey};
`


export const PlaceholderTextNormal = styled.p`
    opacity: 0.4;
    color: ${props => props.theme.charcoalGrey};
`

export const HeaderSearchTabletContainer = styled(FormControl)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;

    /* Input Style for tablet header search only */
    input {
        box-sizing: border-box;
        height: 96px;
    }
`