import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import { CustomTextField } from 'style/TextField/TextField.style'
import styled from 'styled-components'

export const SearchInputFieldsContainer = styled.div`
    display: flex;

    @media ${device.mobile} {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;   
    }
    @media ${device.tablet} {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;   
    }
`

export const SearchAddressButtonContainer = styled.div`
    display: flex;

    @media ${device.mobile} {
        margin-top: 10px;
        width: 100%;
    }
    @media ${device.tablet} {
        margin-top: 0;
        width: auto;
    }
`

export const SearchInput = styled(CustomTextField)`
    padding: 0;
    @media ${device.mobile} {
        width: 100%;
    }
    @media ${device.tablet} {
        width: 290px;
        margin-right: 15px; 
    }
`
export const SearchButton = styled(CustomButton)`
    box-sizing: border-box;
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.dustyOrange};
    :hover {
        background-color: ${(props) => props.theme.dustyOrange};
    }
    margin-left: 10px;

    @media ${device.mobile} {
        width: 46px;
        padding: 11px;
    }
    @media ${device.tablet} {
        width: unset;
    }
`