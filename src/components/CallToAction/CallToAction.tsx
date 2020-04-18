import * as S from 'constants/StringConstants'
import React from 'react'
import chopString from 'utilities/converters/chopString'
import {
    CallToActionAddress,
    CallToActionButtonsContainer,
    CallToActionContainer,
    CallToActionContentContainer,
    CallToActionMessage,
    CallToActionNoButton,
    CallToActionTitle,
    CallToActionYesButton,
} from './CallToAction.style'

interface ICallToActionProps {
    restaurantName: string
    restaurantAddress: string
    restaurantDescription: string
}

const CallToAction: React.FC<ICallToActionProps> = ({ restaurantName, restaurantAddress, restaurantDescription }) => {
    return (
        <CallToActionContainer>
            <CallToActionContentContainer>
                <CallToActionTitle>
                    {S.CALL_TO_ACTION.Title} {restaurantName}?
                </CallToActionTitle>
                <CallToActionAddress>{restaurantAddress}</CallToActionAddress>
                <CallToActionMessage>{chopString(restaurantDescription)}</CallToActionMessage>
            </CallToActionContentContainer>
            <CallToActionButtonsContainer>
                <CallToActionNoButton>{S.CALL_TO_ACTION.No}</CallToActionNoButton>
                <CallToActionYesButton>{S.CALL_TO_ACTION.Yes}</CallToActionYesButton>
            </CallToActionButtonsContainer>
        </CallToActionContainer>
    )
}

export default CallToAction
