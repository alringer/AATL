import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import Icon from '@mdi/react'
import { CustomIconButton } from 'style/Button/IconButton.style'
import styled, { css } from 'styled-components'

export const AdminFlaggedContentContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const AdminFlaggedContentTableContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 41px;
`

export const AdminFlaggedContentTableRow = styled.div`
    display: flex;
    flex-direction: row;
    box-shadow: inset 0 -1px 0 0 #e9e9e9;
    min-height: 116px;

    padding: 15px 20px;
`

export const AdminFlaggedContentTableHeaderRow = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 20px 9px 20px;
`

type HeaderProp = {
    isHeader?: boolean
}

export const AdminFlaggedContentColumn = styled.div<HeaderProp>`
    display: flex;
    ${(props) => {
        if (props.isHeader === true) {
            return css`
                align-items: center;
            `
        }
    }}
`

export const AdminFlaggedContentPlaceColumn = styled(AdminFlaggedContentColumn)`
    width: 150px;

    margin-right: 40px;
`
export const AdminFlaggedContentReporterColumn = styled(AdminFlaggedContentColumn)`
    width: 130px;

    margin-right: 40px;
`
export const AdminFlaggedContentAuthorColumn = styled(AdminFlaggedContentColumn)`
    width: 130px;

    margin-right: 40px;
`
export const AdminFlaggedContentReasonColumn = styled(AdminFlaggedContentColumn)`
    width: 240px;

    margin-right: 40px;

    word-break: break-all;
`
export const AdminFlaggedContentDateFlaggedColumn = styled(AdminFlaggedContentColumn)`
    width: 160px;

    margin-right: 40px;
`

export const AdminFlaggedContentClickableText = styled.a`
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    text-decoration: underline;
    cursor: pointer;
    color: ${(props) => props.theme.darkSlateBlue};
`

export const AdminFlaggedContentPaginationContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;

    margin-top: 30px;
`

export const AdminFlaggedContentSortButton = styled(CustomIconButton)`
    margin-left: 5px;
`

export const AdminFlaggedContentAscendingSortIcon = styled(ArrowUpwardIcon)`
    color: ${(props) => props.theme.mushroom};
`

export const AdminFlaggedContentDescendingSortIcon = styled(ArrowDownwardIcon)`
    color: ${(props) => props.theme.mushroom};
`

export const AdminFlaggedContentSortIcon = styled(Icon)`
    /* margin-left: 5px; */
    color: ${(props) => props.theme.mushroom};
    /* cursor: pointer; */
`
