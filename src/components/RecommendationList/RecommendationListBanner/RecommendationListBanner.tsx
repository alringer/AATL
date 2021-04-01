import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody, SnackbarOrangeMessage } from 'components/Snackbar/Snackbar.style'
import * as R from 'constants/RouteConstants'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { openListModal } from 'store/listModal/listModal_actions'
import { ListModalViewEnum, OpenListModalPayload } from 'store/listModal/listModal_types'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { UserRoleEnum } from 'utilities/types/clientDTOS/UserRole'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'
import {
    RecommendationListBannerButton,
    RecommendationListBannerButtonsContainer,
    RecommendationListBannerContainer,
    RecommendationListBannerContentContainer,
    RecommendationListBannerDescription,
    RecommendationListBannerShareIcon,
    RecommendationListBannerTitle,
} from './RecommendationListBanner.style'

interface IReduxProps {
    userRole: string | null
    openListModal: (payload: OpenListModalPayload) => void
}
interface IRecommendationListProps extends IReduxProps, IWithAuthInjectedProps {
    recommendationListMeta: IRecommendationListMeta | null
    fetchRecommendationListMeta: () => {}
}

const RecommendationListBanner: React.FC<IRecommendationListProps> = ({
    recommendationListMeta,
    userRole,
    openListModal,
    authenticatedAction,
    fetchRecommendationListMeta,
}) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const handleEdit = () => {
        if (recommendationListMeta) {
            authenticatedAction(() => {
                const payload: OpenListModalPayload = {
                    currentListModalView: ListModalViewEnum.EditRecommendationList,
                    recommendationList: recommendationListMeta,
                    onSuccess: () => fetchRecommendationListMeta(),
                }
                openListModal(payload)
            })
        }
    }
    const handleDelete = () => {
        if (recommendationListMeta) {
            authenticatedAction(() => {
                const payload: OpenListModalPayload = {
                    currentListModalView: ListModalViewEnum.DeleteRecommendationList,
                    recommendationList: recommendationListMeta,
                    onSuccess: () => router.push('/'),
                }
                openListModal(payload)
            })
        }
    }
    const handleShare = () => {
        if (recommendationListMeta) {
            const placeLink = `${window.location.origin}${R.ROUTE_ITEMS.recommendationList}/${recommendationListMeta.id}`
            navigator.clipboard
                .writeText(placeLink)
                .then(() => {
                    enqueueSnackbar('', {
                        content: (
                            <div>
                                <Snackbar
                                    type={B.RECOMMENDATION_LIST_LINK_COPIED.Type}
                                    title={B.RECOMMENDATION_LIST_LINK_COPIED.Title}
                                    message={
                                        <SnackbarMessageBody>
                                            {recommendationListMeta.title ? (
                                                <>
                                                    Link for&nbsp;
                                                    <SnackbarOrangeMessage>
                                                        {recommendationListMeta.title}
                                                    </SnackbarOrangeMessage>
                                                    &nbsp;was copied!
                                                </>
                                            ) : (
                                                B.RECOMMENDATION_LIST_LINK_COPIED.Body
                                            )}
                                        </SnackbarMessageBody>
                                    }
                                />
                            </div>
                        ),
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <RecommendationListBannerContainer
            backgroundImageURL={_.has(recommendationListMeta, 'imageCDNUrl') ? recommendationListMeta.imageCDNUrl : ''}
        >
            <RecommendationListBannerButtonsContainer>
                {userRole === UserRoleEnum.Admin ? (
                    <>
                        <RecommendationListBannerButton onClick={handleEdit}>
                            {S.RECOMMENDATION_LIST.Banner.EditButtonText}
                        </RecommendationListBannerButton>
                        <RecommendationListBannerButton onClick={handleDelete}>
                            {S.RECOMMENDATION_LIST.Banner.DeleteButtonText}
                        </RecommendationListBannerButton>
                    </>
                ) : null}
                <RecommendationListBannerButton onClick={handleShare}>
                    <RecommendationListBannerShareIcon />
                    {S.RECOMMENDATION_LIST.Banner.ShareButtonText}
                </RecommendationListBannerButton>
            </RecommendationListBannerButtonsContainer>
            <RecommendationListBannerContentContainer>
                <RecommendationListBannerTitle>
                    {_.has(recommendationListMeta, 'title') ? recommendationListMeta.title : ''}
                </RecommendationListBannerTitle>
                <RecommendationListBannerDescription>
                    {_.has(recommendationListMeta, 'summary') ? recommendationListMeta.summary : ''}
                </RecommendationListBannerDescription>
            </RecommendationListBannerContentContainer>
        </RecommendationListBannerContainer>
    )
}

const mapStateToProps = (state: StoreState) => ({
    userRole: state.userReducer.userRole,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            openListModal,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(RecommendationListBanner))
