import * as S from 'constants/StringConstants'
import React from 'react'
import { IPlace } from 'utilities/types/place'
import {
    HaveYouBeenToContainer,
    HaveYouBeenToContentContainer,
    HaveYouBeenToHeader,
    HaveYouBeenToMessage,
    WriteARecommendationButton,
} from './HaveYouBeenTo.style'

interface IHaveYouBeenToProps extends Partial<IPlace> {}

const HaveYouBeenTo: React.FC<IHaveYouBeenToProps> = ({ placeName, placeID }) => {
    const handleRecommendation = () => {
        // TODO: Send the user to the recommendation
        console.log(
            `Write recommendation clicked from "Have you been to" section from the restaurant with ID of ${placeID}`
        )
    }

    return (
        <HaveYouBeenToContainer>
            <HaveYouBeenToContentContainer>
                <HaveYouBeenToHeader>
                    {S.HAVE_YOU_BEEN_TO.Title} {placeName}?
                </HaveYouBeenToHeader>
                <HaveYouBeenToMessage>{S.HAVE_YOU_BEEN_TO.Body}</HaveYouBeenToMessage>
                <WriteARecommendationButton onClick={handleRecommendation}>
                    {S.BUTTON_LABELS.WriteARecommendation}
                </WriteARecommendationButton>
            </HaveYouBeenToContentContainer>
        </HaveYouBeenToContainer>
    )
}

export default HaveYouBeenTo
