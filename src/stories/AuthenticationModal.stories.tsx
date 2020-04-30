import { storiesOf } from '@storybook/react'
import { ModalContentContainer } from 'components/Modal/AuthenticationModal.style'
import Login from 'components/Modal/Login'
import SignUp from 'components/Modal/SignUp'
import SignUpWithEmail from 'components/Modal/SignUpWithEmail'
import React from 'react'

storiesOf('Authentication Modals', module)
    .add('Login', () => {
        return (
            <ModalContentContainer>
                <Login setCurrentAuthentication={() => {}} closeAuthenticationModal={() => {}} />
            </ModalContentContainer>
        )
    })
    .add('Sign Up', () => {
        return (
            <ModalContentContainer>
                <SignUp setCurrentAuthentication={() => {}} closeAuthenticationModal={() => {}} />
            </ModalContentContainer>
        )
    })
    .add('Sign Up with Email', () => {
        return (
            <ModalContentContainer>
                <SignUpWithEmail setCurrentAuthentication={() => {}} closeAuthenticationModal={() => {}} />
            </ModalContentContainer>
        )
    })
