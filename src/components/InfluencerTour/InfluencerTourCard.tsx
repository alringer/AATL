import {
    InfluencerCardButton,
    InfluencerCardTitle,
    InfluencerTourCardContentContainer,
} from 'components/InfluencerTour/InfluencerTour.style'
import * as S from 'constants/StringConstants'
import React from 'react'

interface IInfluencerTourCardProps {
    title: string
    message: React.ReactNode
    handleNextStep: () => void
}

const InfluencerTourCard: React.FC<IInfluencerTourCardProps> = ({ title, message, handleNextStep }) => {
    return (
        <InfluencerTourCardContentContainer>
            <InfluencerCardTitle>{title}</InfluencerCardTitle>
            {message}
            <InfluencerCardButton onClick={handleNextStep}>{S.PRELAUNCH_TOUR.NextStep}</InfluencerCardButton>
        </InfluencerTourCardContentContainer>
    )
}

export default InfluencerTourCard
