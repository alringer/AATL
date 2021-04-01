import {
    StaticWelcomeContentButton,
    StaticWelcomeContentContainer,
    StaticWelcomeContentMessage,
    StaticWelcomeContentTitle,
} from 'components/StaticWelcome/StaticWelcomeContent/StaticWelcomeContent.style'
import * as S from 'constants/StringConstants'
import React from 'react'
import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'

interface IStaticWelcomeContentProps extends IWithAuthInjectedProps {}

const StaticWelcomeContent: React.FC<IStaticWelcomeContentProps> = ({ keycloakSignUp }) => {
    const handleSignUp = () => {
        keycloakSignUp()
    }

    return (
        <ContentWrapper>
            <StaticWelcomeContentContainer>
                <StaticWelcomeContentTitle>{S.PRELAUNCH.Welcome.Title}</StaticWelcomeContentTitle>
                <StaticWelcomeContentMessage>{S.PRELAUNCH.Welcome.Message}</StaticWelcomeContentMessage>
                <StaticWelcomeContentButton onClick={handleSignUp}>
                    {S.BUTTON_LABELS.YesSignMeUp}
                </StaticWelcomeContentButton>
            </StaticWelcomeContentContainer>
        </ContentWrapper>
    )
}

export default withAuth(StaticWelcomeContent)
