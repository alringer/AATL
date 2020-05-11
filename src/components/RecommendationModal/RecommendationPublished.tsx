import {
    RecommendationEditorCopyRecommendationButton,
    RecommendationEditorCopyRecommendationButtonContainer,
    RecommendationEditorPublishedBody,
    RecommendationEditorPublishedPreviewTitle,
    RecommendationEditorPublishedTitle,
    RecommendationPublishedContainer,
    RecommendationPublishedContentContainer,
} from 'components/RecommendationModal/Recommendation.style'
import Snackbar from 'components/Snackbar/Snackbar'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { useSnackbar } from 'notistack'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'

interface IReduxProps {
    userName: string
}

interface IRecommendationPublishedProps extends IReduxProps {
    publishedTitle: string
}

const RecommendationPublished: React.FC<IRecommendationPublishedProps> = ({ publishedTitle, userName }) => {
    const { enqueueSnackbar } = useSnackbar()

    const handleCopyLink = () => {
        // TODO: Copy the backend-generated link
        enqueueSnackbar('', {
            content: (
                <div>
                    <Snackbar
                        type={B.RECOMMENDATION_LINK_COPIED.Type}
                        title={B.RECOMMENDATION_LINK_COPIED.Title}
                        message={B.RECOMMENDATION_LINK_COPIED.Body}
                    />
                </div>
            ),
        })
    }

    return (
        <RecommendationPublishedContainer>
            <RecommendationPublishedContentContainer>
                <RecommendationEditorPublishedTitle>
                    {S.RECOMMENDATION_PUBLISHED.Title}
                </RecommendationEditorPublishedTitle>
                <RecommendationEditorPublishedPreviewTitle>
                    {publishedTitle} by {userName}
                </RecommendationEditorPublishedPreviewTitle>
                <RecommendationEditorPublishedBody>
                    {S.RECOMMENDATION_PUBLISHED.BodyTextOne}
                </RecommendationEditorPublishedBody>
                <RecommendationEditorPublishedBody>
                    {S.RECOMMENDATION_PUBLISHED.BodyTextTwo}
                </RecommendationEditorPublishedBody>
                <RecommendationEditorCopyRecommendationButtonContainer>
                    <RecommendationEditorCopyRecommendationButton onClick={handleCopyLink}>
                        {S.BUTTON_LABELS.CopyRecommendation}
                    </RecommendationEditorCopyRecommendationButton>
                </RecommendationEditorCopyRecommendationButtonContainer>
            </RecommendationPublishedContentContainer>
        </RecommendationPublishedContainer>
    )
}

export const mapStateToProps = (state: StoreState) => ({
    userName: state.userReducer.userName,
})

export default reduxConnect(mapStateToProps)(RecommendationPublished)
