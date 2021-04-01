import { TextField } from '@material-ui/core'
import styled, { css } from 'styled-components'

type ICustomTextField = {
    error?: boolean
}

export const CustomTextField = styled(TextField)<ICustomTextField>`
    border-radius: 4px;
    border: solid 2px rgba(30, 31, 34, 0.1);
    background-color: ${props => props.theme.white};
    width: 100%;
    height: 100%;

    fieldset {
        border: 0;
    }

    .MuiFormLabel-root.Mui-focused {
        /* background-color: white; */
        color: grey;
        /* z-index: 100; */
    }

    input {
        /* caret-color: black; */
        /* z-index: 99; */
    }

    ${props => {
        if (props.error === true) {
            return css`
                border: solid 2px ${props.theme.dustyRed};
                .MuiFormLabel-root {
                    color: ${props => props.theme.dustyRed} !important;
                }
                input {
                    color: ${props => props.theme.dustyRed} !important;
                }
            `
        }
    }}
`