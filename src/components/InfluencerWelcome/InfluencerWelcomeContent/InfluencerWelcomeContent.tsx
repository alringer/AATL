import {
    InfluencerWelcomeContentButton,
    InfluencerWelcomeContentContainer,
    InfluencerWelcomeContentMessage,
    InfluencerWelcomeContentTitle,
} from 'components/InfluencerWelcome/InfluencerWelcomeContent/InfluencerWelcomeContent.style'
import * as S from 'constants/StringConstants'
import React from 'react'
import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'

interface IInfluencerWelcomeContentProps extends IWithAuthInjectedProps {}

const InfluencerWelcomeContent: React.FC<IInfluencerWelcomeContentProps> = ({ keycloakSignUp }) => {
    const handleSignUp = () => {
        keycloakSignUp()
    }

    return (
        <ContentWrapper>
            <InfluencerWelcomeContentContainer>
                <InfluencerWelcomeContentTitle>{S.PRELAUNCH.Welcome.Title}</InfluencerWelcomeContentTitle>
                <InfluencerWelcomeContentMessage>{S.PRELAUNCH.Welcome.Message}</InfluencerWelcomeContentMessage>
                <InfluencerWelcomeContentButton onClick={handleSignUp}>
                    {S.BUTTON_LABELS.YesSignMeUp}
                </InfluencerWelcomeContentButton>
            </InfluencerWelcomeContentContainer>
        </ContentWrapper>
    )
}

export default withAuth(InfluencerWelcomeContent)
