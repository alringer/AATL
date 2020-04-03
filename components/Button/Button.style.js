import { Button as MUIButton } from '@material-ui/core'
import styled, { css } from 'styled-components'
import { ButtonType } from './Button'

const borderWidth = '2px'

export const CustomButton = styled(MUIButton)`
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

    ${props => {
        let color = ''
        let backgroundColor = ''
        let borderColor = 'transparent'
        if (props.id === ButtonType.SignUpDark) {
            color = props.theme.white
            backgroundColor = props.theme.darkSlateBlue
        } else if (props.id === ButtonType.Login) {
            color = props.theme.mushroom
            backgroundColor = props.theme.white
            borderColor = props.theme.darkGreyOpaque
        }
        return css`
            color: ${color};
            background-color: ${backgroundColor};
            border-color: ${borderColor};

            :hover {
                background-color: ${backgroundColor};
                &::after {
                    background-color: rgba(0, 0, 0, 0.2);
                }
            }
        `
    }}

    ${props => {
        if (props.fullWidth === true) {
            return css`
                width: 100%;
            `
        }
    }}
`
