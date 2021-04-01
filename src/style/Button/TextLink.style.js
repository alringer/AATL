import styled from 'styled-components'

export const TextLink = styled.a`
    cursor: pointer;
    text-decoration: none;
    :hover {
        text-decoration: underline;
        text-decoration-color: ${(props) => props.theme.darkGrey};
    }
`