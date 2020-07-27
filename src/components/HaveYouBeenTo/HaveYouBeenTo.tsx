import * as S from 'constants/StringConstants'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openRecommendationModal } from 'store/recommendationModal/recommendationModal_actions'
import { RecommendationModalPlaceInformation } from 'store/recommendationModal/recommendationModal_types'
import {
    HaveYouBeenToContainer,
    HaveYouBeenToContentContainer,
    HaveYouBeenToHeader,
    HaveYouBeenToMessage,
    WriteARecommendationButton,
} from './HaveYouBeenTo.style'

interface IReduxProps {
    openRecommendationModal: (placeInformation: RecommendationModalPlaceInformation) => void
}

interface IHaveYouBeenToProps extends IReduxProps {
    placeName: string
    placeID: number
}

const HaveYouBeenTo: React.FC<IHaveYouBeenToProps> = ({ placeName, placeID, openRecommendationModal }) => {
    const handleRecommendation = () => {
        // TODO: Send the user to the recommendation
        console.log(
            `Write recommendation clicked from "Have you been to" section from the restaurant with ID of ${placeID}`
        )
        openRecommendationModal({ placeID: placeID, placeName: placeName, isAATL: true })
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

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ openRecommendationModal }, dispatch)

export default reduxConnect(null, mapDispatchToProps)(HaveYouBeenTo)
