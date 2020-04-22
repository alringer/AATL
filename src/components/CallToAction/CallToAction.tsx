import * as S from 'constants/StringConstants'
import React from 'react'
import { chopStringSmallCallToAction } from 'utilities/helpers/chopString'
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
    isLarge: boolean
    restaurantID: number
    restaurantName: string
    restaurantAddress: string
    restaurantDescription: string
}

export enum CallToActionID {
    large = 'large-call-to-action',
    small = 'small-call-to-action',
}

const CallToAction: React.FC<ICallToActionProps> = ({
    isLarge,
    restaurantID,
    restaurantName,
    restaurantAddress,
    restaurantDescription,
}) => {
    const handleNo = () => {
        console.log('TODO: Handle clicking "No" on the Call-To-Action card for restaurant with ID: ', restaurantID)
    }
    const handleYes = () => {
        console.log('TODO: Handle clicking "Yes" on the Call-To-Action card for restaurant with ID: ', restaurantID)
    }

    return (
        <CallToActionContainer id={isLarge === true ? CallToActionID.large : CallToActionID.small}>
            <CallToActionContentContainer id={isLarge === true ? CallToActionID.large : CallToActionID.small}>
                <CallToActionTitle>
                    {S.CALL_TO_ACTION.Title} {restaurantName}?
                </CallToActionTitle>
                <CallToActionAddress id={isLarge === true ? CallToActionID.large : CallToActionID.small}>
                    {restaurantAddress}
                </CallToActionAddress>
                <CallToActionMessage>
                    {isLarge === true ? restaurantDescription : chopStringSmallCallToAction(restaurantDescription)}
                </CallToActionMessage>
            </CallToActionContentContainer>
            <CallToActionButtonsContainer id={isLarge === true ? CallToActionID.large : CallToActionID.small}>
                <CallToActionNoButton onClick={handleNo}>{S.CALL_TO_ACTION.No}</CallToActionNoButton>
                <CallToActionYesButton onClick={handleYes}>{S.CALL_TO_ACTION.Yes}</CallToActionYesButton>
            </CallToActionButtonsContainer>
        </CallToActionContainer>
    )
}

export default CallToAction
