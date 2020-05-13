import CloseButton from 'assets/recommendation-modal-close.svg'
import Image from 'components/Image/Image'
import React from 'react'
import { RecommendationModalCloseButton, RecommendationModalHeaderContainer } from './RecommendationModal.style'
import Tips from './Tips'

interface IRecommendationEditorHeader {
    closeRecommendationModal: () => void
    handleMoreTips: () => void
    published: boolean
}

const RecommendationEditorHeader: React.FC<IRecommendationEditorHeader> = ({
    closeRecommendationModal,
    handleMoreTips,
    published,
}) => {
    return (
        <RecommendationModalHeaderContainer>
            <RecommendationModalCloseButton onClick={closeRecommendationModal}>
                <Image src={CloseButton} alt="close" />
            </RecommendationModalCloseButton>
            {!published ? <Tips handleMoreTips={handleMoreTips} /> : null}
        </RecommendationModalHeaderContainer>
    )
}

export default RecommendationEditorHeader
