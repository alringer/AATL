import LocationOnIcon from '@material-ui/icons/LocationOn'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import { CustomTextField } from 'style/TextField/TextField.style'
import styled from 'styled-components'

export const SearchInputFieldsContainer = styled.div`
    display: flex;
    width: 100%;

    @media ${device.mobile} {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;   
    }
    @media ${device.tablet} {
        flex-direction: row;
        justify-content: center;
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
    height: inherit;
`
export const CustomAutoComplete = styled(Autocomplete)`
    width: 100%;
    height: 100%;
    border: solid 2px rgba(30, 31, 34, 0.1);
    border-radius: 4px;
    @media ${device.mobile} {
        width: 100%;
    }
    @media ${device.tablet} {
        width: 290px;
        margin-right: 15px; 
    }

    .MuiTextField-root {
        border: transparent;
    }

    ${props => {
        if (props.className === 'error') {
            return css`
                input {
                    color: ${props => props.theme.dustyRed} !important;
                }
                fieldset {
                    border-color: color: ${props => props.theme.dustyRed} !important;
                }
                .MuiFormLabel-root {
                    color: ${props => props.theme.dustyRed} !important;
                }
            `
        }
    }}
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

export const SuggestionOption = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 5px;
`

export const SuggestionOptionUseMyLocation = styled(SuggestionOption)`
    color: ${props => props.theme.mushroom};
`


export const LocationIcon = styled(LocationOnIcon)`
    color: ${props => props.theme.mushroom};
    margin-right: 5px;
`