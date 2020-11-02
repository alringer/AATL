import {
    StaticWelcomeContentContainer,
    StaticWelcomeContentTitle,
} from 'components/StaticWelcome/StaticWelcomeContent/StaticWelcomeContent.style'
import {
    TermAndConditionsContentSectionTitle,
    TermsAndConditionsContentSection,
    TermsAndConditionsContentSectionBody,
} from 'components/TermsAndConditionsContent/TermsAndConditionsContent.style'
import * as S from 'constants/StringConstants'
import React from 'react'
import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'

interface ITermsAndConditionsContentProps extends IWithAuthInjectedProps {}

const TermsAndConditionsContent: React.FC<ITermsAndConditionsContentProps> = ({ keycloakSignUp }) => {
    const handleSignUp = () => {
        keycloakSignUp()
    }

    return (
        <ContentWrapper>
            <StaticWelcomeContentContainer>
                <StaticWelcomeContentTitle>{S.TERMS_AND_CONDITIONS.Title}</StaticWelcomeContentTitle>
                {S.TERMS_AND_CONDITIONS.Sections.map((section) => {
                    return (
                        <TermsAndConditionsContentSection>
                            <TermAndConditionsContentSectionTitle>{section.Title}</TermAndConditionsContentSectionTitle>
                            <TermsAndConditionsContentSectionBody>{section.Body}</TermsAndConditionsContentSectionBody>
                        </TermsAndConditionsContentSection>
                    )
                })}
            </StaticWelcomeContentContainer>
        </ContentWrapper>
    )
}

export default withAuth(TermsAndConditionsContent)
