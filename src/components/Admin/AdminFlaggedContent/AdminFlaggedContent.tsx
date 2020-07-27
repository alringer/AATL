import DropdownIconSrc from 'assets/dropDownIcon.svg'
import React from 'react'
import { AdminMenuPageSubTitle, AdminMenuPageTitle } from '../AdminShared.style'
import {
    AdminFlaggedContentAuthorColumn,
    AdminFlaggedContentClickableText,
    AdminFlaggedContentContainer,
    AdminFlaggedContentDateFlaggedColumn,
    AdminFlaggedContentPlaceColumn,
    AdminFlaggedContentReasonColumn,
    AdminFlaggedContentReporterColumn,
    AdminFlaggedContentSortIcon,
    AdminFlaggedContentTableContainer,
    AdminFlaggedContentTableHeaderRow,
    AdminFlaggedContentTableRow,
} from './AdminFlaggedContent.style'

const mockData = [
    {
        place: 'Phuong Trang',
        reporter: 'Josh Brogah',
        author: 'Yoon',
        reason: 'Inappropriate language in the description',
        dateFlagged: 'April 10, 2020',
    },
    {
        place: 'Phuong Trang',
        reporter: 'Josh Brogah',
        author: 'Yoon',
        reason: 'Inappropriate language in the description',
        dateFlagged: 'April 10, 2020',
    },

    {
        place: 'Phuong Trang',
        reporter: 'Josh Brogah',
        author: 'Yoon',
        reason: 'Inappropriate language in the description',
        dateFlagged: 'April 10, 2020',
    },

    {
        place: 'Phuong Trang',
        reporter: 'Josh Brogah',
        author: 'Yoon',
        reason: 'Inappropriate language in the description',
        dateFlagged: 'April 10, 2020',
    },
]

interface IAdminFlaggedContentProps {}

const AdminFlaggedContent: React.FC<IAdminFlaggedContentProps> = () => {
    return (
        <AdminFlaggedContentContainer>
            <AdminMenuPageTitle>Flagged Content</AdminMenuPageTitle>
            <AdminMenuPageSubTitle>This page contains content that has been flagged by users.</AdminMenuPageSubTitle>
            <AdminFlaggedContentTableContainer>
                <AdminFlaggedContentTableHeaderRow>
                    <AdminFlaggedContentPlaceColumn>Place</AdminFlaggedContentPlaceColumn>
                    <AdminFlaggedContentReporterColumn>
                        Reporter <AdminFlaggedContentSortIcon />
                    </AdminFlaggedContentReporterColumn>
                    <AdminFlaggedContentAuthorColumn>
                        Author <AdminFlaggedContentSortIcon />
                    </AdminFlaggedContentAuthorColumn>
                    <AdminFlaggedContentReasonColumn>Reason</AdminFlaggedContentReasonColumn>
                    <AdminFlaggedContentDateFlaggedColumn>
                        Date Flagged <AdminFlaggedContentSortIcon />
                    </AdminFlaggedContentDateFlaggedColumn>
                </AdminFlaggedContentTableHeaderRow>
                {mockData.map((flaggedContentItem: any) => {
                    return (
                        <AdminFlaggedContentTableRow>
                            <AdminFlaggedContentPlaceColumn>{flaggedContentItem.place}</AdminFlaggedContentPlaceColumn>
                            <AdminFlaggedContentReporterColumn>
                                <AdminFlaggedContentClickableText>
                                    {flaggedContentItem.reporter}
                                </AdminFlaggedContentClickableText>
                            </AdminFlaggedContentReporterColumn>
                            <AdminFlaggedContentAuthorColumn>
                                <AdminFlaggedContentClickableText>
                                    {flaggedContentItem.author}
                                </AdminFlaggedContentClickableText>
                            </AdminFlaggedContentAuthorColumn>
                            <AdminFlaggedContentReasonColumn>
                                {flaggedContentItem.reason}
                            </AdminFlaggedContentReasonColumn>
                            <AdminFlaggedContentDateFlaggedColumn>
                                {flaggedContentItem.dateFlagged}
                            </AdminFlaggedContentDateFlaggedColumn>
                            <img src={DropdownIconSrc} alt="dropdown-icon" />
                        </AdminFlaggedContentTableRow>
                    )
                })}
            </AdminFlaggedContentTableContainer>
        </AdminFlaggedContentContainer>
    )
}

export default AdminFlaggedContent
