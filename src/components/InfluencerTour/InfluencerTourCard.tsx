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
    step: number
}

const InfluencerTourCard: React.FC<IInfluencerTourCardProps> = ({ title, message, handleNextStep, step }) => {
    return (
        <InfluencerTourCardContentContainer>
            <InfluencerCardTitle>{title}</InfluencerCardTitle>
            {message}
            <InfluencerCardButton onClick={handleNextStep}>
                {step === 4 ? 'Begin' : S.PRELAUNCH_TOUR.NextStep}
            </InfluencerCardButton>
        </InfluencerTourCardContentContainer>
    )
}

export default InfluencerTourCard
