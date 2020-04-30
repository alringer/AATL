import { IconButton } from '@material-ui/core'
import MobileCloseSVG from 'assets/mushroom-close.svg'
import Image from 'components/Image/Image'
import { AuthenticationViewEnum } from 'components/Modal/AuthenticationModal'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { query } from 'style/device'
import {
    AuthenticationOrangeButton,
    ModalBodyContainer,
    ModalFooterRow,
    ModalFooterSignUp,
    ModalFooterText,
    ModalHeaderContainer,
    ModalHeaderText,
    ModalIntroductoryText,
    ModalRowContainer,
} from './AuthenticationModal.style'

interface IMagicLinkProps {
    setCurrentAuthentication: (authenticationType: AuthenticationViewEnum) => void
    closeAuthenticationModal: () => void
}

const MagicLink: React.FC<IMagicLinkProps> = ({ setCurrentAuthentication, closeAuthenticationModal }) => {
    const handleOK = () => {
        closeAuthenticationModal()
    }

    const handleGoToSignUp = () => {
        setCurrentAuthentication(AuthenticationViewEnum.SignUp)
    }

    return (
        <>
            <ModalHeaderContainer>
                <ModalHeaderText>{S.AUTHENTICATION.MagicLinkTitle}</ModalHeaderText>
                <Media queries={query} defaultMatches={{ mobile: true }}>
                    {(matches) => (
                        <>
                            {matches.mobile && (
                                <IconButton onClick={closeAuthenticationModal}>
                                    <Image src={MobileCloseSVG} alt="close-button" />
                                </IconButton>
                            )}
                        </>
                    )}
                </Media>
            </ModalHeaderContainer>
            <ModalBodyContainer>
                <ModalRowContainer>
                    <ModalIntroductoryText>{S.AUTHENTICATION.MagicLinkBody}</ModalIntroductoryText>
                    <ModalIntroductoryText>{S.AUTHENTICATION.MagicLinkBodyTwo}</ModalIntroductoryText>
                </ModalRowContainer>
                <ModalRowContainer id="marginTop">
                    <AuthenticationOrangeButton onClick={handleOK}>{S.BUTTON_LABELS.OK}</AuthenticationOrangeButton>
                </ModalRowContainer>
                <ModalFooterRow>
                    <ModalFooterText>{S.AUTHENTICATION.DoNotHaveAnAccount}</ModalFooterText>&nbsp;
                    <ModalFooterSignUp onClick={handleGoToSignUp}>{S.AUTHENTICATION.SignUp}</ModalFooterSignUp>
                </ModalFooterRow>
            </ModalBodyContainer>
        </>
    )
}

export default MagicLink
