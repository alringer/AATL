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

export const MobileMoreOptionButton = styled(CustomIconButton)`
    border-radius: 27px;
    color: ${props => props.theme.darkSlateBlue};
    background-color: #f6f1ee;
    :hover {
        color: white;
        background-color: ${props => props.theme.darkSlateBlue};
        p {
            color: white;
        }
        ::after {
            background-color: transparent;
            border-radius: 27px;
        }
    }
    /* max-width: 80px; */
    width: 76px;
    height: 76px;
    margin-top: 10px;
`

export const MobileMoreOptionButtonLabel = styled.p`
    font-size: 11px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    word-break: normal;
    color: ${props => props.theme.darkSlateBlue};
`

export const MobileMoreOptionSpan = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`