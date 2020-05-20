import { CustomIconButton } from 'style/Button/IconButton.style'
import styled from 'styled-components'

export const MoreOptionButton = styled(CustomIconButton)`
    border-radius: 27px;
    color: ${props => props.theme.darkSlateBlue};
    :hover {
        color: white;
        background-color: ${props => props.theme.darkSlateBlue};
        ::after {
            background-color: transparent;
            border-radius: 27px;
        }
    }
`