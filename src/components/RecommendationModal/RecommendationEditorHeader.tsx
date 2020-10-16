import CloseButton from 'assets/recommendation-modal-close.svg'
import Image from 'components/Image/Image'
import React from 'react'
import { RecommendationModalCloseButton, RecommendationModalHeaderContainer } from './RecommendationModal.style'
import Tips from './Tips'

interface IRecommendationEditorHeader {
    closeRecommendationModal: () => void
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
            {!published ? <Tips /> : null}
        </RecommendationModalHeaderContainer>
    )
}

export default RecommendationEditorHeader
