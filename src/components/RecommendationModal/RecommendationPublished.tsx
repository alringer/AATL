import {
    RecommendationEditorCopyRecommendationButton,
    RecommendationEditorCopyRecommendationButtonContainer,
    RecommendationEditorPublishedBody,
    RecommendationEditorPublishedPreviewTitle,
    RecommendationEditorPublishedTitle,
    RecommendationPublishedContainer,
    RecommendationPublishedContentContainer,
} from 'components/RecommendationModal/RecommendationModal.style'
import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'
import { IRecommendation } from 'utilities/types/recommendation'

interface IReduxProps {
    firstName: string | null
    lastName: string | null
}

interface IRecommendationPublishedProps extends IReduxProps {
    publishedTitle: string
    recommendation: IRecommendation | null
}

const RecommendationPublished: React.FC<IRecommendationPublishedProps> = ({
    publishedTitle,
    firstName,
    lastName,
    recommendation,
}) => {
    const [permaLink, setPermaLink] = React.useState('')
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    React.useEffect(() => {
        if (recommendation && window !== undefined) {
            // ${window.location.origin}
            const newPermaLink = `${R.ROUTE_ITEMS.restaurant}/${recommendation.venue.id}?r=${recommendation.id}`
            setPermaLink(newPermaLink)
        }
    }, [recommendation])

    const handleCheckItOut = () => {
        router.push(permaLink)
        // navigator.clipboard
        //     .writeText(permaLink)
        //     .then(() => {
        //         enqueueSnackbar('', {
        //             content: (
        //                 <div>
        //                     <Snackbar
        //                         type={B.RECOMMENDATION_LINK_COPIED.Type}
        //                         title={B.RECOMMENDATION_LINK_COPIED.Title}
        //                         message={B.RECOMMENDATION_LINK_COPIED.Body}
        //                     />
        //                 </div>
        //             ),
        //         })
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }

    return (
        <RecommendationPublishedContainer>
            <RecommendationPublishedContentContainer>
                <RecommendationEditorPublishedTitle>
                    {S.RECOMMENDATION_PUBLISHED.Title}
                </RecommendationEditorPublishedTitle>
                <RecommendationEditorPublishedPreviewTitle>
                    {publishedTitle} by {`${firstName ? `${firstName} ` : ''}${lastName ? `${lastName}` : ''}`}
                </RecommendationEditorPublishedPreviewTitle>
                <RecommendationEditorPublishedBody>
                    {S.RECOMMENDATION_PUBLISHED.BodyTextOne}
                </RecommendationEditorPublishedBody>
                <RecommendationEditorPublishedBody>
                    {S.RECOMMENDATION_PUBLISHED.BodyTextTwo}
                </RecommendationEditorPublishedBody>
                <RecommendationEditorCopyRecommendationButtonContainer>
                    <RecommendationEditorCopyRecommendationButton onClick={handleCheckItOut}>
                        {S.BUTTON_LABELS.CheckItOut}
                    </RecommendationEditorCopyRecommendationButton>
                </RecommendationEditorCopyRecommendationButtonContainer>
            </RecommendationPublishedContentContainer>
        </RecommendationPublishedContainer>
    )
}

export const mapStateToProps = (state: StoreState) => ({
    firstName: state.userReducer.firstName,
    lastName: state.userReducer.lastName,
})

export default reduxConnect(mapStateToProps)(RecommendationPublished)
