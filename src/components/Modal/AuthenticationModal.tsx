import ForgotPassword from 'components/Modal/ForgotPassword'
import MagicLink from 'components/Modal/MagicLink'
import SignUpWithEmail from 'components/Modal/SignUpWithEmail'
import React from 'react'
import { ModalContainer, ModalContentContainer } from './AuthenticationModal.style'
import Login from './Login'
import SignUp from './SignUp'

export enum AuthenticationViewEnum {
    Login,
    SignUp,
    ForgotPassword,
    SignUpWithEmail,
    MagicLink,
}

interface IAuthenticationModalProps {
    initialAuthenticationView: AuthenticationViewEnum
    authenticationModalReference: any
}

const AuthenticationModal: React.FC<IAuthenticationModalProps> = ({
    initialAuthenticationView,
    authenticationModalReference,
}) => {
    const [currentAuthenticationView, setCurrentAuthentication] = React.useState<AuthenticationViewEnum>(
        initialAuthenticationView
    )
    const closeAuthenticationModal = () => {
        authenticationModalReference.setIsComponentVisible(false)
    }

    return (
        <ModalContainer>
            <ModalContentContainer ref={authenticationModalReference.ref}>
                {currentAuthenticationView === AuthenticationViewEnum.Login ? (
                    <Login
                        setCurrentAuthentication={setCurrentAuthentication}
                        closeAuthenticationModal={closeAuthenticationModal}
                    />
                ) : currentAuthenticationView === AuthenticationViewEnum.SignUp ? (
                    <SignUp
                        setCurrentAuthentication={setCurrentAuthentication}
                        closeAuthenticationModal={closeAuthenticationModal}
                    />
                ) : currentAuthenticationView === AuthenticationViewEnum.SignUpWithEmail ? (
                    <SignUpWithEmail
                        setCurrentAuthentication={setCurrentAuthentication}
                        closeAuthenticationModal={closeAuthenticationModal}
                    />
                ) : currentAuthenticationView === AuthenticationViewEnum.ForgotPassword ? (
                    <ForgotPassword
                        setCurrentAuthentication={setCurrentAuthentication}
                        closeAuthenticationModal={closeAuthenticationModal}
                    />
                ) : currentAuthenticationView === AuthenticationViewEnum.MagicLink ? (
                    <MagicLink
                        setCurrentAuthentication={setCurrentAuthentication}
                        closeAuthenticationModal={closeAuthenticationModal}
                    />
                ) : null}
            </ModalContentContainer>
        </ModalContainer>
    )
}

export default AuthenticationModal
