import CollapseIconSrc from 'assets/collapseIcon.svg'
import DropdownIconSrc from 'assets/dropDownIcon.svg'
import {
    AdminFlaggedCardContainer,
    AdminFlaggedCardDeleteButton,
    AdminFlaggedCardMarkButton,
    AdminFlaggedCardRecommendationButtonsContainer,
    AdminFlaggedCardRecommendationContainer,
    AdminFlaggedCardRecommendationContentContainer,
} from 'components/Admin/AdminFlaggedContent/AdminFlaggedCard.style'
import {
    AdminFlaggedContentAuthorColumn,
    AdminFlaggedContentClickableText,
    AdminFlaggedContentDateFlaggedColumn,
    AdminFlaggedContentPlaceColumn,
    AdminFlaggedContentReasonColumn,
    AdminFlaggedContentReporterColumn,
    AdminFlaggedContentTableRow,
} from 'components/Admin/AdminFlaggedContent/AdminFlaggedContent.style'
import CardRecommendationWide, {
    CardRecommendationWideEnum,
} from 'components/CardRecommendationWide/CardRecommendationWide'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import axios, { UPDATE_FLAGGED_RECOMMENDATION } from 'config/AxiosConfig'
import * as R from 'constants/RouteConstants'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import Link from 'next/link'
import { useSnackbar } from 'notistack'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openDeleteRecommendationModal } from 'store/deleteRecommendationModal/deleteRecommendationModal_actions'
import { OpenDeleteRecommendationModalPayload } from 'store/deleteRecommendationModal/deleteRecommendationModal_types'
import { CustomIconButton } from 'style/Button/IconButton.style'
import { formatMonth } from 'utilities/helpers/formatMonth'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { flaggedEnum } from 'utilities/types/enumerations'
import { IFlaggedRecommendation } from 'utilities/types/flaggedRecommendation'

interface IReduxProps {
    openDeleteRecommendationModal: (payload: OpenDeleteRecommendationModalPayload) => void
}

interface IAdminFlaggedCardProps extends IReduxProps, IWithAuthInjectedProps {
    flaggedRecommendation: IFlaggedRecommendation
    fetchFlaggedRecommendations: () => void
}

const AdminFlaggedCard: React.FC<IAdminFlaggedCardProps> = ({
    flaggedRecommendation,
    openDeleteRecommendationModal,
    fetchFlaggedRecommendations,
    authenticatedAction,
    getTokenConfig,
}) => {
    const [isExpanded, setExpanded] = React.useState(false)
    const [isSubmitting, setSubmitting] = React.useState(false)

    const { enqueueSnackbar } = useSnackbar()

    const handleClickIcon = () => {
        setExpanded(!isExpanded)
    }

    const handleDelete = () => {
        const payload: OpenDeleteRecommendationModalPayload = {
            flaggedRecommendationID: flaggedRecommendation.id,
            onSuccess: fetchFlaggedRecommendations,
        }
        openDeleteRecommendationModal(payload)
    }

    const handleMarkAppropriate = () => {
        if (flaggedRecommendation.id) {
            authenticatedAction(() => {
                const payload: flaggedEnum = flaggedEnum.None
                const token = getTokenConfig()
                const config = {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                }

                setSubmitting(true)
                axios
                    .put(UPDATE_FLAGGED_RECOMMENDATION(flaggedRecommendation.id), payload, config)
                    .then((res) => {
                        fetchFlaggedRecommendations()
                        enqueueSnackbar('', {
                            content: (
                                <div>
                                    <Snackbar
                                        type={B.UNFLAG_RECOMMENDATION.Type}
                                        title={B.UNFLAG_RECOMMENDATION.Title}
                                        message={
                                            <SnackbarMessageBody>{B.UNFLAG_RECOMMENDATION.Body}</SnackbarMessageBody>
                                        }
                                    />
                                </div>
                            ),
                        })
                    })
                    .catch((err) => console.log(err))
                    .finally(() => {
                        setSubmitting(false)
                    })
            })
        }
    }

    return (
        <AdminFlaggedCardContainer>
            <AdminFlaggedContentTableRow>
                <AdminFlaggedContentPlaceColumn>
                    {flaggedRecommendation?.recommendation?.venue?.name}
                </AdminFlaggedContentPlaceColumn>
                <AdminFlaggedContentReporterColumn>
                    <Link
                        href={`${R.ROUTE_ITEMS.userProfile}/${flaggedRecommendation.flaggedBy?.id}`}
                        passHref={true}
                        prefetch={false}
                    >
                        <AdminFlaggedContentClickableText>
                            {`${flaggedRecommendation.flaggedBy.firstName} ${flaggedRecommendation.flaggedBy.lastName}`}
                        </AdminFlaggedContentClickableText>
                    </Link>
                </AdminFlaggedContentReporterColumn>
                <AdminFlaggedContentAuthorColumn>
                    <Link
                        href={`${R.ROUTE_ITEMS.userProfile}/${flaggedRecommendation.recommendation?.createdBy?.id}`}
                        passHref={true}
                        prefetch={false}
                    >
                        <AdminFlaggedContentClickableText>
                            {`${flaggedRecommendation.recommendation.createdBy.firstName} ${flaggedRecommendation.recommendation.createdBy.lastName}`}
                        </AdminFlaggedContentClickableText>
                    </Link>
                </AdminFlaggedContentAuthorColumn>
                <AdminFlaggedContentReasonColumn>{flaggedRecommendation.reason}</AdminFlaggedContentReasonColumn>
                <AdminFlaggedContentDateFlaggedColumn>
                    {`${formatMonth(
                        flaggedRecommendation.date.getMonth()
                    )} ${flaggedRecommendation.date.getUTCDate()}, ${flaggedRecommendation.date.getFullYear()}`}
                </AdminFlaggedContentDateFlaggedColumn>
                <CustomIconButton onClick={handleClickIcon}>
                    <img src={isExpanded ? CollapseIconSrc : DropdownIconSrc} alt="collapse-icon" />
                </CustomIconButton>
            </AdminFlaggedContentTableRow>
            {isExpanded && (
                <AdminFlaggedCardRecommendationContentContainer>
                    <AdminFlaggedCardRecommendationContainer>
                        <CardRecommendationWide
                            recommendation={flaggedRecommendation.recommendation}
                            type={CardRecommendationWideEnum.AdminFlagged}
                            isFull={true}
                        />
                    </AdminFlaggedCardRecommendationContainer>
                    <AdminFlaggedCardRecommendationButtonsContainer>
                        <AdminFlaggedCardDeleteButton onClick={handleDelete} disabled={isSubmitting}>
                            {S.BUTTON_LABELS.Delete}
                        </AdminFlaggedCardDeleteButton>
                        <AdminFlaggedCardMarkButton onClick={handleMarkAppropriate} disabled={isSubmitting}>
                            {S.BUTTON_LABELS.MarkAppropriate}
                        </AdminFlaggedCardMarkButton>
                    </AdminFlaggedCardRecommendationButtonsContainer>
                </AdminFlaggedCardRecommendationContentContainer>
            )}
        </AdminFlaggedCardContainer>
    )
}

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            openDeleteRecommendationModal,
        },
        dispatch
    )

export default reduxConnect(null, mapDispatchToProps)(withAuth(AdminFlaggedCard))
