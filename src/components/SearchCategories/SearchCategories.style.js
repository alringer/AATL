import { TextLink } from 'style/Button/TextLink.style'
import styled, { css } from 'styled-components'

export const SearchWorkBenchCategoriesContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const SearchWorkBenchCategoriesText = styled(TextLink)`
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.67;
    letter-spacing: 2px;
    color: ${props => props.theme.charcoalGrey};

    ${props => {
        if (props.id === 'bold') {
            return css`
                font-weight: bold;
                color: ${(props) => props.theme.darkGrey};
            `

        }
    }}
`