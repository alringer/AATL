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
    AuthenticationWhiteButton,
    ModalBodyContainer,
    ModalDivider,
    ModalFooterRow,
    ModalFooterSignUp,
    ModalFooterText,
    ModalHeaderContainer,
    ModalHeaderText,
    ModalIntroductoryText,
    ModalRowContainer,
} from './AuthenticationModal.style'

interface ISignUpProps {
    setCurrentAuthenticationView: (authenticationType: AuthenticationViewEnum) => void
    closeModal: () => void
}

const SignUp: React.FC<ISignUpProps> = ({ setCurrentAuthenticationView, closeModal }) => {
    const handleGoToSignIn = () => {
        setCurrentAuthenticationView(AuthenticationViewEnum.Login)
    }

    const handleGoToSignUpWithEmail = () => {
        setCurrentAuthenticationView(AuthenticationViewEnum.SignUpWithEmail)
    }
    const handleSignUpWithInstagram = () => {
        // TODO: Wire up API to sign up with instagram
        console.log('TODO: Wire up API to sign up with instagram')
    }

    return (
        <>
            <ModalHeaderContainer>
                <ModalHeaderText>{S.AUTHENTICATION.SignUpTitle}</ModalHeaderText>
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
                    <ModalIntroductoryText>{S.AUTHENTICATION.SignUpBody}</ModalIntroductoryText>
                </ModalRowContainer>
                <ModalRowContainer id="marginTop">
                    <AuthenticationOrangeButton onClick={handleSignUpWithInstagram}>
                        {S.BUTTON_LABELS.SignUpInstagram}
                    </AuthenticationOrangeButton>
                </ModalRowContainer>
                <ModalDivider />
                <ModalRowContainer>
                    <AuthenticationWhiteButton onClick={handleGoToSignUpWithEmail}>
                        {S.BUTTON_LABELS.SignUpEmail}
                    </AuthenticationWhiteButton>
                </ModalRowContainer>
                <ModalFooterRow>
                    <ModalFooterText>{S.AUTHENTICATION.AlreadyHaveAnAccount}</ModalFooterText>&nbsp;
                    <ModalFooterSignUp onClick={handleGoToSignIn}>{S.AUTHENTICATION.SignIn}</ModalFooterSignUp>
                </ModalFooterRow>
            </ModalBodyContainer>
        </>
    )
}

export default SignUp
