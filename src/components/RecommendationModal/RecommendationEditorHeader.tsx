import CloseButton from 'assets/recommendation-modal-close.svg'
import Image from 'components/Image/Image'
import React from 'react'
import { CustomIconButton } from 'style/Button/IconButton.style'
import { RecommendationModalHeaderContainer } from './Recommendation.style'

interface IRecommendationEditorHeader {
    closeRecommendationModal: () => void
}

const RecommendationEditorHeader: React.FC<IRecommendationEditorHeader> = ({ closeRecommendationModal }) => {
    return (
        <RecommendationModalHeaderContainer>
            <CustomIconButton onClick={closeRecommendationModal}>
                <Image src={CloseButton} alt="close" />
            </CustomIconButton>
        </RecommendationModalHeaderContainer>
    )
}

export default RecommendationEditorHeader
