import { Button as MUIButton } from '@material-ui/core'
import styled from 'styled-components'

const borderWidth = '2px'

export const CustomButton = styled(MUIButton)`
    /* white-space: nowrap; */
    position: relative;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Rubik', sans-serif;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    text-align: center;
    padding: 13px 15px;
    border: solid ${borderWidth} transparent;

    &::after {
        content: '';
        position: absolute;
        top: -${borderWidth};
        left: -${borderWidth};
        right: -${borderWidth};
        bottom: -${borderWidth};
        border-radius: 4px;
        transition: all 0.1s ease-in-out;
    }

    :hover {
        &::after {
            background-color: rgba(0, 0, 0, 0.2);
        }
    }

    :disabled {
        color: ${props => props.theme.white};
        background-color: #e1e1e1;
    }
`
