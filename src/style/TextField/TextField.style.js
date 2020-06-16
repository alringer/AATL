import { TextField } from '@material-ui/core'
import styled, { css } from 'styled-components'

export const CustomTextField = styled(TextField)`
    border-radius: 4px;
    border: solid 2px rgba(30, 31, 34, 0.1);
    background-color: ${props => props.theme.white};
    width: 100%;
    height: 100%;

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