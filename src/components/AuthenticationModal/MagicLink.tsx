import { IconButton } from '@material-ui/core'
import MobileCloseSVG from 'assets/mushroom-close.svg'
import Image from 'components/Image/Image'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { AuthenticationViewEnum } from 'store/authModal/authModal_types'
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
    targetEmail: string
    currentAuthenticationView: AuthenticationViewEnum
    setCurrentAuthenticationView: (authenticationType: AuthenticationViewEnum) => void
    closeModal: () => void
}

const MagicLink: React.FC<IMagicLinkProps> = ({
    targetEmail,
    currentAuthenticationView,
    setCurrentAuthenticationView,
    closeModal,
}) => {
    const handleOK = () => {
        closeModal()
    }

    const handleGoToSignUp = () => {
        setCurrentAuthenticationView(AuthenticationViewEnum.SignUp)
    }

    return (
        <>
            <ModalHeaderContainer>
                <ModalHeaderText>{S.AUTHENTICATION.MagicLinkTitle}</ModalHeaderText>
                <Media queries={query} defaultMatches={{ laptop: true }}>
                    {(matches) => (
                        <>
                            {matches.mobile && (
                                <IconButton onClick={closeModal}>
                                    <Image src={MobileCloseSVG} alt="close-button" />
                                </IconButton>
                            )}
                        </>
                    )}
                </Media>
            </ModalHeaderContainer>
            <ModalBodyContainer>
                <ModalRowContainer>
                    <ModalIntroductoryText>{`${S.AUTHENTICATION.MagicLinkBody} ${targetEmail}.`}</ModalIntroductoryText>
                    <ModalIntroductoryText>
                        {currentAuthenticationView === AuthenticationViewEnum.MagicLinkResetPassword
                            ? S.AUTHENTICATION.MagicLinkBodyForgotPassword
                            : S.AUTHENTICATION.MagicLinkBodySetupAccount}
                    </ModalIntroductoryText>
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
