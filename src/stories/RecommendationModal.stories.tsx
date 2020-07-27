import { storiesOf } from '@storybook/react'
import RecommendationEditor from 'components/RecommendationModal/RecommendationEditor'
import RecommendationEditorHeader from 'components/RecommendationModal/RecommendationEditorHeader'
import {
    RecommendationModalContainer,
    RecommendationModalContentContainer,
} from 'components/RecommendationModal/RecommendationModal.style'
import RecommendationPublished from 'components/RecommendationModal/RecommendationPublished'
import React from 'react'
import { mockRecommendation } from 'utilities/types/recommendation'

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
                <RecommendationEditorHeader
                    published={false}
                    handleMoreTips={() => {}}
                    closeRecommendationModal={() => {}}
                />
                <RecommendationModalContentContainer>
                    <RecommendationEditor
                        placeName={RecommendationEditorData.default.placeName}
                        isLoading={false}
                        handlePublish={() => {}}
                        handleReadOurGuidelines={() => {}}
                    />
                </RecommendationModalContentContainer>
            </RecommendationModalContainer>
        )
    })
    .add('Published View', () => {
        return (
            <RecommendationModalContainer>
                <RecommendationEditorHeader
                    published={true}
                    handleMoreTips={() => {}}
                    closeRecommendationModal={() => {}}
                />
                <RecommendationModalContentContainer>
                    <RecommendationPublished
                        publishedTitle={RecommendationEditorData.default.recommendationTitle}
                        recommendation={mockRecommendation}
                    />
                </RecommendationModalContentContainer>
            </RecommendationModalContainer>
        )
    })
// (<RecommendationEditor placeName={placeName} isLoading={isLoading} handlePublish={handlePublish} />)
