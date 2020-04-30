import { IconButton } from '@material-ui/core'
import MobileCloseSVG from 'assets/mushroom-close.svg'
import Image from 'components/Image/Image'
import { AuthenticationViewEnum } from 'components/Modal/AuthenticationModal'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { query } from 'style/device'
import { CustomTextField } from 'style/TextField/TextField.style'
import {
    AuthenticationOrangeButton,
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

interface IForgotPasswordProps {
    setCurrentAuthentication: (authenticationType: AuthenticationViewEnum) => void
    closeAuthenticationModal: () => void
}

const ForgotPassword: React.FC<IForgotPasswordProps> = ({ setCurrentAuthentication, closeAuthenticationModal }) => {
    const [email, setEmail] = React.useState('')
    const [error, setError] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)

    const handleGoToSignUp = () => {
        setCurrentAuthentication(AuthenticationViewEnum.SignUp)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handleResetPassword = () => {
        // TODO: Wire up reset-password API
        console.log('TODO: Wire up reset-password API')
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setCurrentAuthentication(AuthenticationViewEnum.MagicLink)
        }, 1000)
    }

    return (
        <>
            <ModalHeaderContainer>
                <ModalHeaderText>{S.AUTHENTICATION.ForgotPasswordTitle}</ModalHeaderText>
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
                    <ModalIntroductoryText>{S.AUTHENTICATION.ForgotPasswordBody}</ModalIntroductoryText>
                </ModalRowContainer>
                <ModalRowContainer id="marginTop">
                    <CustomTextField
                        value={email}
                        placeholder={`${S.INPUT_PLACEHOLDERS.Email}`}
                        type={'email'}
                        onChange={handleChange}
                        variant="outlined"
                        autoFocus={true}
                        disabled={loading}
                    />
                </ModalRowContainer>
                <ModalDivider />
                <ModalRowContainer>
                    <AuthenticationOrangeButton onClick={handleResetPassword} disabled={loading}>
                        {S.BUTTON_LABELS.ResetPassword}
                    </AuthenticationOrangeButton>
                </ModalRowContainer>
                <ModalFooterRow>
                    <ModalFooterText>{S.AUTHENTICATION.DoNotHaveAnAccount}</ModalFooterText>&nbsp;
                    <ModalFooterSignUp onClick={handleGoToSignUp}>{S.AUTHENTICATION.SignUp}</ModalFooterSignUp>
                </ModalFooterRow>
            </ModalBodyContainer>
        </>
    )
}

export default ForgotPassword
