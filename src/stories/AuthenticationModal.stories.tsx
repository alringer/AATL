import { storiesOf } from '@storybook/react'
import { ModalContentContainer } from 'components/AuthenticationModal/AuthenticationModal.style'
import ForgotPassword from 'components/AuthenticationModal/ForgotPassword'
import Login from 'components/AuthenticationModal/Login'
import MagicLink from 'components/AuthenticationModal/MagicLink'
import SignUp from 'components/AuthenticationModal/SignUp'
import SignUpWithEmail from 'components/AuthenticationModal/SignUpWithEmail'
import React from 'react'
import { AuthenticationViewEnum } from 'store/authentication/authentication_types'

storiesOf('Authentication Modals', module)
    .add('Login', () => {
        return (
            <ModalContentContainer>
                <Login setCurrentAuthenticationView={() => {}} closeModal={() => {}} />
            </ModalContentContainer>
        )
    })
    .add('Sign Up', () => {
        return (
            <ModalContentContainer>
                <SignUp setCurrentAuthenticationView={() => {}} closeModal={() => {}} />
            </ModalContentContainer>
        )
    })
    .add('Sign Up with Email', () => {
        return (
            <ModalContentContainer>
                <SignUpWithEmail
                    setEmailToSend={() => {}}
                    setCurrentAuthenticationView={() => {}}
                    closeModal={() => {}}
                />
            </ModalContentContainer>
        )
    })
    .add('Request Reset Password', () => {
        return (
            <ModalContentContainer>
                <ForgotPassword
                    setEmailToSend={() => {}}
                    setCurrentAuthenticationView={() => {}}
                    closeModal={() => {}}
                />
            </ModalContentContainer>
        )
    })
    .add('Magic Link: Reset Password', () => {
        return (
            <ModalContentContainer>
                <MagicLink
                    targetEmail={'example@domain.com'}
                    currentAuthenticationView={AuthenticationViewEnum.MagicLinkResetPassword}
                    setCurrentAuthenticationView={() => {}}
                    closeModal={() => {}}
                />
            </ModalContentContainer>
        )
    })
    .add('Magic Link: Setup Account', () => {
        return (
            <ModalContentContainer>
                <MagicLink
                    targetEmail={'example@domain.com'}
                    currentAuthenticationView={AuthenticationViewEnum.MagicLinkSetupAccount}
                    setCurrentAuthenticationView={() => {}}
                    closeModal={() => {}}
                />
            </ModalContentContainer>
        )
    })
