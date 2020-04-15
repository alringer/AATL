import styled, { css } from 'styled-components'

const activeOpacity = '0.96'

const activeItemCSS = css`
    opacity: ${activeOpacity};
`

export const MenuItemAnchor = styled.a`
    
`

export const MenuItemText = styled.p`
    opacity: 0.6;
    font-family: 'Rubik', sans-serif;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${props => props.theme.darkGrey};
    cursor: pointer;

    :hover {
        ${activeItemCSS}
    }

    ${props => {
        if (props.id === 'active') {
            return activeItemCSS}
        }
    }}
`
