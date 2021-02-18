import { CircularProgress } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { mdiSort } from '@mdi/js'
import AdminFlaggedCard from 'components/Admin/AdminFlaggedContent/AdminFlaggedCard'
import * as S from 'constants/StringConstants'
import React from 'react'
import { IFlaggedRecommendation, IFlaggedRecommendationSort } from 'utilities/types/flaggedRecommendation'
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
    AdminFlaggedContentSortIcon,
    AdminFlaggedContentTableContainer,
    AdminFlaggedContentTableHeaderRow,
} from './AdminFlaggedContent.style'

interface IAdminFlaggedContentProps {
    fetchFlaggedRecommendations: (page: number, sort: IFlaggedRecommendationSort) => void
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
    const [currentSortEnum, setCurrentSortEnum] = React.useState<IFlaggedRecommendationSort>(
        IFlaggedRecommendationSort.authorDesc
    )
    const [isHoveredReporter, setHoveredReporter] = React.useState(false)
    const [isHoveredAuthor, setHoveredAuthor] = React.useState(false)
    const [isHoveredDate, setHoveredDate] = React.useState(false)

    enum ColumnEnum {
        Reporter = 'Reporter',
        Author = 'Author',
        Date = 'Date',
    }

    React.useEffect(() => {
        setCurrentRecommendations(listFlaggedRecommendations)
    }, [listFlaggedRecommendations])

    React.useEffect(() => {
        console.log('Current sort enum: ', currentSortEnum)
    }, [currentSortEnum])

    const handleMouseEnterSort = (e: React.MouseEvent<HTMLInputElement>) => {
        const targetEnum = e.currentTarget.id
        switch (targetEnum) {
            case ColumnEnum.Reporter:
                setHoveredReporter(true)
                break
            case ColumnEnum.Author:
                setHoveredAuthor(true)
                break
            case ColumnEnum.Date:
                setHoveredDate(true)
                break
        }
    }

    const handleMouseLeaveSort = (e: React.MouseEvent<HTMLInputElement>) => {
        const targetEnum = e.currentTarget.id
        switch (targetEnum) {
            case ColumnEnum.Reporter:
                setHoveredReporter(false)
                break
            case ColumnEnum.Author:
                setHoveredAuthor(false)
                break
            case ColumnEnum.Date:
                setHoveredDate(false)
                break
        }
    }

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        fetchFlaggedRecommendations(value - 1, currentSortEnum)
    }

    const handleSort = (event: React.MouseEvent<HTMLElement>) => {
        const targetEnum = event.currentTarget.id
        switch (targetEnum) {
            case ColumnEnum.Reporter:
                if (currentSortEnum === IFlaggedRecommendationSort.reporterDesc) {
                    setCurrentSortEnum(IFlaggedRecommendationSort.reporterAsc)
                    sortFlaggedRecommendations(IFlaggedRecommendationSort.reporterAsc)
                } else {
                    setCurrentSortEnum(IFlaggedRecommendationSort.reporterDesc)
                    sortFlaggedRecommendations(IFlaggedRecommendationSort.reporterDesc)
                }
                break
            case ColumnEnum.Author:
                if (currentSortEnum === IFlaggedRecommendationSort.authorDesc) {
                    setCurrentSortEnum(IFlaggedRecommendationSort.authorAsc)
                    sortFlaggedRecommendations(IFlaggedRecommendationSort.authorAsc)
                } else {
                    setCurrentSortEnum(IFlaggedRecommendationSort.authorDesc)
                    sortFlaggedRecommendations(IFlaggedRecommendationSort.authorDesc)
                }
                break
            case ColumnEnum.Date:
                if (currentSortEnum === IFlaggedRecommendationSort.dateDesc) {
                    setCurrentSortEnum(IFlaggedRecommendationSort.dateAsc)
                    sortFlaggedRecommendations(IFlaggedRecommendationSort.dateAsc)
                } else {
                    setCurrentSortEnum(IFlaggedRecommendationSort.dateDesc)
                    sortFlaggedRecommendations(IFlaggedRecommendationSort.dateDesc)
                }
                break
        }
    }

    const sortFlaggedRecommendations = (sort: IFlaggedRecommendationSort) => {
        fetchFlaggedRecommendations(currentPage - 1, sort)
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
                        {S.ADMIN_PAGE.AdminFlaggedContent.Reporter}
                        <AdminFlaggedContentSortButton
                            onClick={handleSort}
                            onMouseEnter={handleMouseEnterSort}
                            onMouseLeave={handleMouseLeaveSort}
                            id={ColumnEnum.Reporter}
                        >
                            {currentSortEnum === IFlaggedRecommendationSort.reporterDesc ? (
                                <AdminFlaggedContentDescendingSortIcon />
                            ) : currentSortEnum === IFlaggedRecommendationSort.reporterAsc ? (
                                <AdminFlaggedContentAscendingSortIcon />
                            ) : isHoveredReporter ? (
                                <AdminFlaggedContentDescendingSortIcon />
                            ) : (
                                <AdminFlaggedContentSortIcon
                                    path={mdiSort}
                                    title="Sort"
                                    size={1}
                                    vertical
                                    rotate={360}
                                />
                            )}
                        </AdminFlaggedContentSortButton>
                    </AdminFlaggedContentReporterColumn>
                    <AdminFlaggedContentAuthorColumn isHeader={true}>
                        {S.ADMIN_PAGE.AdminFlaggedContent.Author}{' '}
                        <AdminFlaggedContentSortButton
                            onClick={handleSort}
                            onMouseEnter={handleMouseEnterSort}
                            onMouseLeave={handleMouseLeaveSort}
                            id={ColumnEnum.Author}
                        >
                            {currentSortEnum === IFlaggedRecommendationSort.authorDesc ? (
                                <AdminFlaggedContentDescendingSortIcon />
                            ) : currentSortEnum === IFlaggedRecommendationSort.authorAsc ? (
                                <AdminFlaggedContentAscendingSortIcon />
                            ) : isHoveredAuthor ? (
                                <AdminFlaggedContentDescendingSortIcon />
                            ) : (
                                <AdminFlaggedContentSortIcon
                                    path={mdiSort}
                                    title="Sort"
                                    size={1}
                                    vertical
                                    rotate={360}
                                />
                            )}
                        </AdminFlaggedContentSortButton>
                    </AdminFlaggedContentAuthorColumn>
                    <AdminFlaggedContentReasonColumn isHeader={true}>
                        {S.ADMIN_PAGE.AdminFlaggedContent.Reason}
                    </AdminFlaggedContentReasonColumn>
                    <AdminFlaggedContentDateFlaggedColumn isHeader={true}>
                        {S.ADMIN_PAGE.AdminFlaggedContent.DateFlagged}{' '}
                        <AdminFlaggedContentSortButton
                            onClick={handleSort}
                            onMouseEnter={handleMouseEnterSort}
                            onMouseLeave={handleMouseLeaveSort}
                            id={ColumnEnum.Date}
                        >
                            {currentSortEnum === IFlaggedRecommendationSort.dateDesc ? (
                                <AdminFlaggedContentDescendingSortIcon />
                            ) : currentSortEnum === IFlaggedRecommendationSort.dateAsc ? (
                                <AdminFlaggedContentAscendingSortIcon />
                            ) : isHoveredDate ? (
                                <AdminFlaggedContentDescendingSortIcon />
                            ) : (
                                <AdminFlaggedContentSortIcon
                                    path={mdiSort}
                                    title="Sort"
                                    size={1}
                                    vertical
                                    rotate={360}
                                />
                            )}
                        </AdminFlaggedContentSortButton>
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
                                currentSort={currentSortEnum}
                                key={flaggedRecommendation.id}
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
