import Grow from '@material-ui/core/Grow'
import axios, { FETCH_RESTAURANT, VENUE_RECOMMENDATION_PROMPT } from 'config/AxiosConfig'
import * as S from 'constants/StringConstants'
import { KeycloakInstance } from 'keycloak-js'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from 'store/user/user_actions'
import { chopStringSmallCallToAction } from 'utilities/helpers/chopString'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IVenue } from 'utilities/types/venue'
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

interface IReduxProps {
    fetchUser: (keycloak: KeycloakInstance) => void
}

interface ICallToActionProps extends IWithAuthInjectedProps, IReduxProps {
    isLarge: boolean
    placeID: number
}

export enum CallToActionID {
    large = 'large-call-to-action',
    small = 'small-call-to-action',
}

const CallToAction: React.FC<ICallToActionProps> = ({ isLarge, placeID, fetchUser, keycloak, getTokenConfig }) => {
    const [currentPlace, setCurrentPlace] = React.useState<IVenue | null>(null)
    React.useEffect(() => {
        axios
            .get(FETCH_RESTAURANT(placeID))
            .then((res) => {
                setCurrentPlace(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    const handleNo = () => {
        console.log('TODO: Handle clicking "No" on the Call-To-Action card for place with ID: ', currentPlace.id)
        const token = getTokenConfig()
        const config = {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        }
        axios
            .post(VENUE_RECOMMENDATION_PROMPT, JSON.stringify(placeID), config)
            .then((res) => {
                console.log('Venue Recommendation Prompt: ', res)
                fetchUser(keycloak)
            })
            .catch((err) => console.log(err))
    }
    const handleYes = () => {
        console.log('TODO: Handle clicking "Yes" on the Call-To-Action card for place with ID: ', placeID)
    }

    return (
        <Grow in={true}>
            <CallToActionContainer id={isLarge === true ? CallToActionID.large : CallToActionID.small}>
                <CallToActionContentContainer id={isLarge === true ? CallToActionID.large : CallToActionID.small}>
                    <CallToActionTitle>
                        {S.CALL_TO_ACTION.Title} {currentPlace && currentPlace.name ? currentPlace.name : ''}?
                    </CallToActionTitle>
                    <CallToActionAddress id={isLarge === true ? CallToActionID.large : CallToActionID.small}>
                        {currentPlace && currentPlace.formattedAddress ? currentPlace.formattedAddress : ''}
                    </CallToActionAddress>
                    <CallToActionMessage>
                        {currentPlace && currentPlace.content
                            ? isLarge === true
                                ? currentPlace.content
                                : chopStringSmallCallToAction(currentPlace.content)
                            : ''}
                    </CallToActionMessage>
                </CallToActionContentContainer>
                <CallToActionButtonsContainer id={isLarge === true ? CallToActionID.large : CallToActionID.small}>
                    <CallToActionNoButton onClick={handleNo}>{S.CALL_TO_ACTION.No}</CallToActionNoButton>
                    <CallToActionYesButton onClick={handleYes}>{S.CALL_TO_ACTION.Yes}</CallToActionYesButton>
                </CallToActionButtonsContainer>
            </CallToActionContainer>
        </Grow>
    )
}

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            fetchUser,
        },
        dispatch
    )

export default reduxConnect(null, mapDispatchToProps)(withAuth(CallToAction))
