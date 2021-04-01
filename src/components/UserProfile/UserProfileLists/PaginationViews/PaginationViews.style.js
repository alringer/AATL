import MuiCallMadeIcon from '@material-ui/icons/CallMade'
import MuiDeleteForeverIcon from '@material-ui/icons/DeleteForever'
import MuiEditIcon from '@material-ui/icons/Edit'
import { CustomButton } from 'style/Button/Button.style'
import styled from 'styled-components'

export const PaginationViewsListContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export const ListControlButton = styled(CustomButton)`
    min-width: 36px !important;
    width: 36px;
    height: 36px;
    color: ${props => props.theme.darkSlateBlue};
    :hover {
        color: ${props => props.theme.white};
        background-color: ${props => props.theme.darkSlateBlue};
    }
`

export const DeleteForeverIcon = styled(MuiDeleteForeverIcon)``
export const EditIcon = styled(MuiEditIcon)``
export const CallMadeIcon = styled(MuiCallMadeIcon)``