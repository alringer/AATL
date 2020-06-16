import { IconButton, InputAdornment, Tooltip } from '@material-ui/core'
import MobileCloseSVG from 'assets/mushroom-close.svg'
import Image from 'components/Image/Image'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { AuthenticationViewEnum } from 'store/authentication/authentication_types'
import { query } from 'style/device'
import { ErrorIcon } from 'style/ErrorIcon/ErrorIcon.style'
import { CustomTextField } from 'style/TextField/TextField.style'
import { validateEmail } from 'utilities/helpers/validateEmail'
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
    setEmailToSend: (input: string) => void
    setCurrentAuthenticationView: (authenticationType: AuthenticationViewEnum) => void
    closeModal: () => void
}

interface Errors {
    email: string
}

const ForgotPassword: React.FC<IForgotPasswordProps> = ({
    setEmailToSend,
    setCurrentAuthenticationView,
    closeModal,
}) => {
    const DEFAULT_ERRORS = {
        email: '',
    }
    const [email, setEmail] = React.useState('')
    const [errors, setAuthenticationErrors] = React.useState<Errors>(DEFAULT_ERRORS)
    const [loading, setAuthenticationLoading] = React.useState<boolean>(false)

    const handleGoToSignUp = () => {
        setCurrentAuthenticationView(AuthenticationViewEnum.SignUp)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
        setAuthenticationErrors({ ...errors, email: '' })
    }

    const handleResetPassword = () => {
        // TODO: Wire up reset-password API
        console.log('TODO: Wire up reset-password API')
        if (!validateEmail(email)) {
            setAuthenticationErrors({ ...errors, email: S.ERROR_MESSAGES.InvalidEmail })
        } else {
            setAuthenticationLoading(true)
            setTimeout(() => {
                setEmailToSend(email)
                setAuthenticationLoading(false)
                setAuthenticationErrors(DEFAULT_ERRORS)
                setCurrentAuthenticationView(AuthenticationViewEnum.MagicLinkResetPassword)
            }, 1000)
        }
    }

    return (
        <>
            <ModalHeaderContainer>
                <ModalHeaderText>{S.AUTHENTICATION.ForgotPasswordTitle}</ModalHeaderText>
                <Media queries={query} defaultMatches={{ mobile: true }}>
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
                    <ModalIntroductoryText>{S.AUTHENTICATION.ForgotPasswordBody}</ModalIntroductoryText>
                </ModalRowContainer>
                <ModalRowContainer id="marginTop">
                    <CustomTextField
                        id="email"
                        value={email}
                        className={errors.email !== '' ? 'error' : null}
                        label={`${S.INPUT_PLACEHOLDERS.Email}`}
                        type="email"
                        onChange={handleChange}
                        variant="outlined"
                        autoFocus={true}
                        disabled={loading}
                        InputProps={
                            errors.email !== ''
                                ? {
                                      endAdornment: (
                                          <InputAdornment position="end">
                                              <Tooltip title={errors.email} placement="top">
                                                  <ErrorIcon />
                                              </Tooltip>
                                          </InputAdornment>
                                      ),
                                  }
                                : null
                        }
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
