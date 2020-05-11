import { storiesOf } from '@storybook/react'
import { ModalContentContainer } from 'components/AuthenticationModal/AuthenticationModal.style'
import ForgotPassword from 'components/AuthenticationModal/ForgotPassword'
import Login from 'components/AuthenticationModal/Login'
import MagicLink from 'components/AuthenticationModal/MagicLink'
import SignUp from 'components/AuthenticationModal/SignUp'
import SignUpWithEmail from 'components/AuthenticationModal/SignUpWithEmail'
import React from 'react'

storiesOf('Authentication Modals', module)
    .add('Login', () => {
        return (
            <ModalContentContainer>
                <Login setCurrentAuthenticationView={() => {}} closeAuthenticationModal={() => {}} />
            </ModalContentContainer>
        )
    })
    .add('Sign Up', () => {
        return (
            <ModalContentContainer>
                <SignUp setCurrentAuthenticationView={() => {}} closeAuthenticationModal={() => {}} />
            </ModalContentContainer>
        )
    })
    .add('Sign Up with Email', () => {
        return (
            <ModalContentContainer>
                <SignUpWithEmail setCurrentAuthenticationView={() => {}} closeAuthenticationModal={() => {}} />
            </ModalContentContainer>
        )
    })
    .add('Request Reset Password', () => {
        return (
            <ModalContentContainer>
                <ForgotPassword setCurrentAuthenticationView={() => {}} closeAuthenticationModal={() => {}} />
            </ModalContentContainer>
        )
    })
    .add('Magic Link', () => {
        return (
            <ModalContentContainer>
                <MagicLink setCurrentAuthenticationView={() => {}} closeAuthenticationModal={() => {}} />
            </ModalContentContainer>
        )
    })
