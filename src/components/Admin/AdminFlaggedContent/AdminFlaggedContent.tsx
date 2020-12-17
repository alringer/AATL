import { CircularProgress } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import AdminFlaggedCard from 'components/Admin/AdminFlaggedContent/AdminFlaggedCard'
import * as S from 'constants/StringConstants'
import React from 'react'
import { IFlaggedRecommendation } from 'utilities/types/flaggedRecommendation'
import { AdminMenuPageSubTitle, AdminMenuPageTitle } from '../AdminShared.style'
import {
    AdminFlaggedContentAscendingSortIcon,
    AdminFlaggedContentAuthorColumn,
    AdminFlaggedContentContainer,
    AdminFlaggedContentDateFlaggedColumn,
    AdminFlaggedContentDescendingSortIcon,
    AdminFlaggedContentPaginationContainer,
    AdminFlaggedContentPlaceColumn,
    AdminFlaggedContentReasonColumn,
    AdminFlaggedContentReporterColumn,
    AdminFlaggedContentSortButton,
    AdminFlaggedContentTableContainer,
    AdminFlaggedContentTableHeaderRow,
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

interface IAdminFlaggedContentProps {
    fetchFlaggedRecommendations: (page: number) => void
    listFlaggedRecommendations: IFlaggedRecommendation[]
    isLoadingFlaggedRecommendations: boolean
    currentPage: number
    currentPageCount: number
}

const AdminFlaggedContent: React.FC<IAdminFlaggedContentProps> = ({
    fetchFlaggedRecommendations,
    listFlaggedRecommendations,
    isLoadingFlaggedRecommendations,
    currentPage,
    currentPageCount,
}) => {
    const [currentRecommendations, setCurrentRecommendations] = React.useState<IFlaggedRecommendation[]>([])
    const [isDescendingReporter, setDescendingReporter] = React.useState(false)
    const [isDescendingAuthor, setDescendingAuthor] = React.useState(false)
    const [isDescendingDate, setDescendingDate] = React.useState(false)

    enum ColumnEnum {
        Reporter = 'Reporter',
        Author = 'Author',
        Date = 'Date',
    }

    // React.useEffect(() => {
    //     fetchFlaggedRecommendations(0)
    // }, [])

    React.useEffect(() => {
        setCurrentRecommendations(listFlaggedRecommendations)
    }, [listFlaggedRecommendations])

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        fetchFlaggedRecommendations(value - 1)
    }

    const handleSort = (event: React.MouseEvent<HTMLElement>) => {
        const targetEnum = event.currentTarget.id
        switch (targetEnum) {
            case ColumnEnum.Reporter:
                const sortedByReporterRecommendations = sortByReporter(currentRecommendations, isDescendingReporter)
                setDescendingReporter(!isDescendingReporter)
                // setCurrentRecommendations(sortedByReporterRecommendations)
                break
            case ColumnEnum.Author:
                const sortedByAuthorRecommendations = sortByAuthor(currentRecommendations, isDescendingAuthor)
                setDescendingAuthor(!isDescendingAuthor)
                // setCurrentRecommendations(sortedByAuthorRecommendations)
                break
            case ColumnEnum.Date:
                const sortedByDateRecommendations = sortByDate(currentRecommendations, isDescendingDate)
                setDescendingDate(!isDescendingDate)
                // setCurrentRecommendations(sortedByDateRecommendations)
                break
        }
    }

    const sortByReporter = (inputRecommendations: IFlaggedRecommendation[], isDescending: boolean) => {
        return []
    }
    const sortByAuthor = (inputRecommendations: IFlaggedRecommendation[], isDescending: boolean) => {
        return []
    }
    const sortByDate = (inputRecommendations: IFlaggedRecommendation[], isDescending: boolean) => {
        return []
    }

    return (
        <AdminFlaggedContentContainer>
            <AdminMenuPageTitle>{S.ADMIN_PAGE.AdminFlaggedContent.Title}</AdminMenuPageTitle>
            <AdminMenuPageSubTitle>{S.ADMIN_PAGE.AdminFlaggedContent.SubTitle}</AdminMenuPageSubTitle>
            <AdminFlaggedContentTableContainer>
                <AdminFlaggedContentTableHeaderRow>
                    <AdminFlaggedContentPlaceColumn isHeader={true}>
                        {S.ADMIN_PAGE.AdminFlaggedContent.Place}
                    </AdminFlaggedContentPlaceColumn>
                    <AdminFlaggedContentReporterColumn isHeader={true}>
                        {S.ADMIN_PAGE.AdminFlaggedContent.Reporter}{' '}
                        {isDescendingReporter ? (
                            <AdminFlaggedContentSortButton onClick={handleSort} id={ColumnEnum.Reporter}>
                                <AdminFlaggedContentAscendingSortIcon />
                            </AdminFlaggedContentSortButton>
                        ) : (
                            <AdminFlaggedContentSortButton onClick={handleSort} id={ColumnEnum.Reporter}>
                                <AdminFlaggedContentDescendingSortIcon />
                            </AdminFlaggedContentSortButton>
                        )}
                    </AdminFlaggedContentReporterColumn>
                    <AdminFlaggedContentAuthorColumn isHeader={true}>
                        {S.ADMIN_PAGE.AdminFlaggedContent.Author}{' '}
                        {isDescendingAuthor ? (
                            <AdminFlaggedContentSortButton onClick={handleSort} id={ColumnEnum.Author}>
                                <AdminFlaggedContentAscendingSortIcon />
                            </AdminFlaggedContentSortButton>
                        ) : (
                            <AdminFlaggedContentSortButton onClick={handleSort} id={ColumnEnum.Author}>
                                <AdminFlaggedContentDescendingSortIcon />
                            </AdminFlaggedContentSortButton>
                        )}
                    </AdminFlaggedContentAuthorColumn>
                    <AdminFlaggedContentReasonColumn isHeader={true}>
                        {S.ADMIN_PAGE.AdminFlaggedContent.Reason}
                    </AdminFlaggedContentReasonColumn>
                    <AdminFlaggedContentDateFlaggedColumn isHeader={true}>
                        {S.ADMIN_PAGE.AdminFlaggedContent.DateFlagged}{' '}
                        {isDescendingDate ? (
                            <AdminFlaggedContentSortButton onClick={handleSort} id={ColumnEnum.Date}>
                                <AdminFlaggedContentAscendingSortIcon />
                            </AdminFlaggedContentSortButton>
                        ) : (
                            <AdminFlaggedContentSortButton onClick={handleSort} id={ColumnEnum.Date}>
                                <AdminFlaggedContentDescendingSortIcon />
                            </AdminFlaggedContentSortButton>
                        )}
                    </AdminFlaggedContentDateFlaggedColumn>
                </AdminFlaggedContentTableHeaderRow>
                {isLoadingFlaggedRecommendations ? (
                    <CircularProgress />
                ) : currentRecommendations ? (
                    currentRecommendations.map((flaggedRecommendation: IFlaggedRecommendation) => {
                        return (
                            <AdminFlaggedCard
                                flaggedRecommendation={flaggedRecommendation}
                                fetchFlaggedRecommendations={fetchFlaggedRecommendations}
                                currentPage={currentPage}
                            />
                        )
                    })
                ) : (
                    'Empty'
                )}
            </AdminFlaggedContentTableContainer>
            {isLoadingFlaggedRecommendations ? null : (
                <AdminFlaggedContentPaginationContainer>
                    <Pagination
                        page={currentPage ? currentPage : 0}
                        count={currentPageCount ? currentPageCount : 0}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePagination}
                    />
                </AdminFlaggedContentPaginationContainer>
            )}
        </AdminFlaggedContentContainer>
    )
}

export default AdminFlaggedContent
