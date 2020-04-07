import { TextField } from '@material-ui/core'
import styled from 'styled-components'

export const CustomTextField = styled(TextField)`
    border-radius: 4px;
    border: solid 2px rgba(30, 31, 34, 0.1);
    background-color: ${props => props.theme.white};
`