import { storiesOf } from '@storybook/react'
import {
    RecommendationModalContainer,
    RecommendationModalContentContainer,
} from 'components/RecommendationModal/Recommendation.style'
import RecommendationEditor from 'components/RecommendationModal/RecommendationEditor'
import RecommendationEditorHeader from 'components/RecommendationModal/RecommendationEditorHeader'
import RecommendationPublished from 'components/RecommendationModal/RecommendationPublished'
import React from 'react'

export const RecommendationEditorData = {
    default: {
        placeID: 0,
        placeName: 'Point Loma Seafood',
        recommendationTitle: 'Best seafood place ever!',
    },
}

storiesOf('Recommendation Editor Modal', module)
    .add('Editor View', () => {
        return (
            <RecommendationModalContainer>
                <RecommendationEditorHeader closeRecommendationModal={() => {}} />
                <RecommendationModalContentContainer>
                    <RecommendationEditor
                        placeName={RecommendationEditorData.default.placeName}
                        isLoading={false}
                        handlePublish={() => {}}
                    />
                </RecommendationModalContentContainer>
            </RecommendationModalContainer>
        )
    })
    .add('Published View', () => {
        return (
            <RecommendationModalContainer>
                <RecommendationEditorHeader closeRecommendationModal={() => {}} />
                <RecommendationModalContentContainer>
                    <RecommendationPublished publishedTitle={RecommendationEditorData.default.recommendationTitle} />
                </RecommendationModalContentContainer>
            </RecommendationModalContainer>
        )
    })
// (<RecommendationEditor placeName={placeName} isLoading={isLoading} handlePublish={handlePublish} />)
