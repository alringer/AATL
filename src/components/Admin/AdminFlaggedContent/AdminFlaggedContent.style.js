import SortIcon from '@material-ui/icons/Sort'
import styled from 'styled-components'

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
    height: 116px;

    padding: 15px 20px;
`

export const AdminFlaggedContentTableHeaderRow = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 20px 9px 20px;
`

export const AdminFlaggedContentPlaceColumn = styled.div`
    width: 150px;

    margin-right: 40px;
`
export const AdminFlaggedContentReporterColumn = styled.div`
    display: flex;
    width: 130px;

    margin-right: 40px;
`
export const AdminFlaggedContentAuthorColumn = styled.div`
    display: flex;
    width: 130px;

    margin-right: 40px;
`
export const AdminFlaggedContentReasonColumn = styled.div`
    width: 240px;

    margin-right: 40px;
`
export const AdminFlaggedContentDateFlaggedColumn = styled.div`
    display: flex;
    width: 140px;

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

export const AdminFlaggedContentSortIcon = styled(SortIcon)`
    margin-left: 5px;
    color: ${(props) => props.theme.mushroom};
    cursor: pointer;
`
