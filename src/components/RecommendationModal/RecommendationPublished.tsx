import {
    RecommendationEditorCopyRecommendationButton,
    RecommendationEditorCopyRecommendationButtonContainer,
    RecommendationEditorPublishedBody,
    RecommendationEditorPublishedPreviewTitle,
    RecommendationEditorPublishedTitle,
    RecommendationPublishedButtonAnchor,
    RecommendationPublishedContainer,
    RecommendationPublishedContentContainer,
} from 'components/RecommendationModal/RecommendationModal.style'
import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import Link from 'next/link'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'
import { IRecommendation } from 'utilities/types/recommendation'
import { IUserProfile } from 'utilities/types/userProfile'

interface IReduxProps {
    user: IUserProfile
}

interface IRecommendationPublishedProps extends IReduxProps {
    publishedTitle: string
    recommendation: IRecommendation | null
}

const RecommendationPublished: React.FC<IRecommendationPublishedProps> = ({ publishedTitle, user, recommendation }) => {
    const [permaLink, setPermaLink] = React.useState('')

    React.useEffect(() => {
        if (recommendation && window !== undefined) {
            const newPermaLink = `${R.ROUTE_ITEMS.restaurant}/${recommendation.venue.id}?r=${recommendation.id}`
            setPermaLink(newPermaLink)
        }
    }, [recommendation])

    return (
        <RecommendationPublishedContainer>
            <RecommendationPublishedContentContainer>
                <RecommendationEditorPublishedTitle>
                    {S.RECOMMENDATION_PUBLISHED.Title}
                </RecommendationEditorPublishedTitle>
                <RecommendationEditorPublishedPreviewTitle>
                    {publishedTitle} by{' '}
                    {`${user.firstName ? `${user.firstName} ` : ''}${user.lastName ? `${user.lastName}` : ''}`}
                </RecommendationEditorPublishedPreviewTitle>
                <RecommendationEditorPublishedBody>
                    {S.RECOMMENDATION_PUBLISHED.BodyTextOne}
                </RecommendationEditorPublishedBody>
                <RecommendationEditorPublishedBody>
                    {S.RECOMMENDATION_PUBLISHED.BodyTextTwo}
                </RecommendationEditorPublishedBody>
                <RecommendationEditorCopyRecommendationButtonContainer>
                    <Link href={permaLink} passHref={true} prefetch={false}>
                        <RecommendationPublishedButtonAnchor>
                            <RecommendationEditorCopyRecommendationButton>
                                {S.BUTTON_LABELS.CheckItOut}
                            </RecommendationEditorCopyRecommendationButton>
                        </RecommendationPublishedButtonAnchor>
                    </Link>
                </RecommendationEditorCopyRecommendationButtonContainer>
            </RecommendationPublishedContentContainer>
        </RecommendationPublishedContainer>
    )
}

const mapStateToProps = (state: StoreState) => ({
    user: state.userReducer.user,
})

export default reduxConnect(mapStateToProps)(RecommendationPublished)
