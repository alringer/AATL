import AdminFlaggedCard from 'components/Admin/AdminFlaggedContent/AdminFlaggedCard'
import axios, { FLAGGED_RECOMMENDATIONS } from 'config/AxiosConfig'
import * as S from 'constants/StringConstants'
import React from 'react'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IFlaggedRecommendation } from 'utilities/types/flaggedRecommendation'
import { AdminMenuPageSubTitle, AdminMenuPageTitle } from '../AdminShared.style'
import {
    AdminFlaggedContentAuthorColumn,
    AdminFlaggedContentContainer,
    AdminFlaggedContentDateFlaggedColumn,
    AdminFlaggedContentPlaceColumn,
    AdminFlaggedContentReasonColumn,
    AdminFlaggedContentReporterColumn,
    AdminFlaggedContentSortIcon,
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

interface IAdminFlaggedContentProps extends IWithAuthInjectedProps {}

const AdminFlaggedContent: React.FC<IAdminFlaggedContentProps> = ({ getTokenConfig }) => {
    const [currentRecommendations, setCurrentRecommendations] = React.useState<IFlaggedRecommendation[]>([])

    React.useEffect(() => {
        fetchFlaggedRecommendations()
    }, [])

    const fetchFlaggedRecommendations = () => {
        const token = getTokenConfig()
        const config = {
            headers: {
                Authorization: token,
            },
        }
        axios
            .get(FLAGGED_RECOMMENDATIONS(0), config)
            .then((res) => {
                let newRecommendations = []
                if (res.data) {
                    res.data.map((flaggedRecommendation: IFlaggedRecommendation) => {
                        newRecommendations = [
                            ...newRecommendations,
                            { ...flaggedRecommendation, date: new Date(flaggedRecommendation.date) },
                        ]
                    })
                }
                setCurrentRecommendations(newRecommendations)
            })
            .catch((err) => console.log(err))
    }

    return (
        <AdminFlaggedContentContainer>
            <AdminMenuPageTitle>{S.ADMIN_PAGE.AdminFlaggedContent.Title}</AdminMenuPageTitle>
            <AdminMenuPageSubTitle>{S.ADMIN_PAGE.AdminFlaggedContent.SubTitle}</AdminMenuPageSubTitle>
            <AdminFlaggedContentTableContainer>
                <AdminFlaggedContentTableHeaderRow>
                    <AdminFlaggedContentPlaceColumn>
                        {S.ADMIN_PAGE.AdminFlaggedContent.Place}
                    </AdminFlaggedContentPlaceColumn>
                    <AdminFlaggedContentReporterColumn>
                        {S.ADMIN_PAGE.AdminFlaggedContent.Reporter} <AdminFlaggedContentSortIcon />
                    </AdminFlaggedContentReporterColumn>
                    <AdminFlaggedContentAuthorColumn>
                        {S.ADMIN_PAGE.AdminFlaggedContent.Author} <AdminFlaggedContentSortIcon />
                    </AdminFlaggedContentAuthorColumn>
                    <AdminFlaggedContentReasonColumn>Reason</AdminFlaggedContentReasonColumn>
                    <AdminFlaggedContentDateFlaggedColumn>
                        {S.ADMIN_PAGE.AdminFlaggedContent.DateFlagged} <AdminFlaggedContentSortIcon />
                    </AdminFlaggedContentDateFlaggedColumn>
                </AdminFlaggedContentTableHeaderRow>
                {currentRecommendations
                    ? currentRecommendations.map((flaggedRecommendation: IFlaggedRecommendation) => {
                          return (
                              <AdminFlaggedCard
                                  flaggedRecommendation={flaggedRecommendation}
                                  fetchFlaggedRecommendations={fetchFlaggedRecommendations}
                              />
                          )
                      })
                    : 'Empty'}
            </AdminFlaggedContentTableContainer>
        </AdminFlaggedContentContainer>
    )
}

export default withAuth(AdminFlaggedContent)
