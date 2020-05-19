import { IconButton, InputAdornment, Tooltip } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
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

interface Values {
    email: string
    fullName: string
    password: string
    confirmPassword: string
    showPassword: boolean
    showConfirmPassword: boolean
}

interface Errors {
    email: string
    fullName: string
    password: string
    confirmPassword: string
}

interface ISignUpWithEmailProps {
    setEmailToSend: (input: string) => void
    setCurrentAuthenticationView: (authenticationType: AuthenticationViewEnum) => void
    closeModal: () => void
}

const SignUpWithEmail: React.FC<ISignUpWithEmailProps> = ({
    setEmailToSend,
    setCurrentAuthenticationView,
    closeModal,
}) => {
    const DEFAULT_VALUES = {
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
    }
    const DEFAULT_ERRORS = {
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '',
    }
    const [values, setValues] = React.useState<Values>(DEFAULT_VALUES)
    const [errors, setAuthenticationErrors] = React.useState<Errors>(DEFAULT_ERRORS)
    const [loading, setAuthenticationLoading] = React.useState<boolean>(false)

    const handleGoToSignIn = () => {
        setCurrentAuthenticationView(AuthenticationViewEnum.Login)
    }

    const handleChange = (prop: keyof Values) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
        if (prop === 'email') {
            setAuthenticationErrors({ ...errors, email: '' })
        }
        if (prop === 'fullName') {
            setAuthenticationErrors({ ...errors, fullName: '' })
        }
        if (prop === 'password') {
            setAuthenticationErrors({ ...errors, password: '' })
        }
        if (prop === 'confirmPassword') {
            setAuthenticationErrors({ ...errors, confirmPassword: '' })
        }
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }
    const handleClickShowConfirmPassword = () => {
        setValues({ ...values, showConfirmPassword: !values.showConfirmPassword })
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleSignUpWithEmail = () => {
        const formValid = validateForm()
        if (formValid === true) {
            setEmailToSend(values.email)
            setAuthenticationLoading(true)
            setTimeout(() => {
                // TODO: Wire up sign up API
                console.log('TODO: Wire up sign up API')
                setAuthenticationLoading(false)
                setCurrentAuthenticationView(AuthenticationViewEnum.MagicLinkSetupAccount)
            }, 1000)
        }
    }

    const validateForm = () => {
        let isValid = true
        let newErrors = { ...errors }
        if (values.email === '') {
            newErrors = { ...newErrors, email: S.ERROR_MESSAGES.EmptyEmail }
            isValid = false
        } else if (!validateEmail(values.email)) {
            newErrors = { ...newErrors, email: S.ERROR_MESSAGES.InvalidEmail }
            isValid = false
        }
        if (values.fullName === '') {
            newErrors = { ...newErrors, fullName: S.ERROR_MESSAGES.FullName }
            isValid = false
        }
        if (values.password === '') {
            newErrors = { ...newErrors, password: S.ERROR_MESSAGES.EmptyPassword }
            isValid = false
        }
        if (values.confirmPassword !== values.password) {
            newErrors = { ...newErrors, confirmPassword: S.ERROR_MESSAGES.ConfirmPassword }
            isValid = false
        }
        setAuthenticationErrors(newErrors)

        return isValid
    }

    return (
        <>
            <ModalHeaderContainer>
                <ModalHeaderText>{S.AUTHENTICATION.SignUpWithEmailTitle}</ModalHeaderText>
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
                    <ModalIntroductoryText>{S.AUTHENTICATION.SignUpWithEmailBody}</ModalIntroductoryText>
                </ModalRowContainer>
                <ModalRowContainer id="marginTop">
                    <CustomTextField
                        id={'email'}
                        className={errors.email !== '' ? 'error' : null}
                        value={values.email}
                        label={`${S.INPUT_PLACEHOLDERS.Email}`}
                        type={'email'}
                        onChange={handleChange('email')}
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
                <ModalRowContainer id="marginTop">
                    <CustomTextField
                        id="fullName"
                        className={errors.fullName !== '' ? 'error' : null}
                        value={values.fullName}
                        label={`${S.INPUT_PLACEHOLDERS.YourFullName}`}
                        type={'fullName'}
                        onChange={handleChange('fullName')}
                        variant="outlined"
                        disabled={loading}
                        InputProps={
                            errors.fullName !== ''
                                ? {
                                      endAdornment: (
                                          <InputAdornment position="end">
                                              <Tooltip title={errors.fullName} placement="top">
                                                  <ErrorIcon />
                                              </Tooltip>
                                          </InputAdornment>
                                      ),
                                  }
                                : null
                        }
                    />
                </ModalRowContainer>
                <ModalRowContainer id="marginTop">
                    <CustomTextField
                        id="password"
                        className={errors.password !== '' ? 'error' : null}
                        value={values.password}
                        label={`${S.INPUT_PLACEHOLDERS.Password}`}
                        type={values.showPassword ? 'text' : 'password'}
                        onChange={handleChange('password')}
                        autoComplete="current-password"
                        InputProps={{
                            endAdornment:
                                errors.password !== '' ? (
                                    <InputAdornment position="end">
                                        <Tooltip title={errors.password} placement="top">
                                            <ErrorIcon />
                                        </Tooltip>
                                    </InputAdornment>
                                ) : (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                        }}
                        variant="outlined"
                        disabled={loading}
                    />
                </ModalRowContainer>
                <ModalRowContainer id="marginTop">
                    <CustomTextField
                        id="confirm-password"
                        className={errors.confirmPassword !== '' ? 'error' : null}
                        value={values.confirmPassword}
                        label={`${S.INPUT_PLACEHOLDERS.ConfirmPassword}`}
                        type={values.showConfirmPassword ? 'text' : 'password'}
                        onChange={handleChange('confirmPassword')}
                        InputProps={{
                            endAdornment:
                                errors.confirmPassword !== '' ? (
                                    <InputAdornment position="end">
                                        <Tooltip title={errors.confirmPassword} placement="top">
                                            <ErrorIcon />
                                        </Tooltip>
                                    </InputAdornment>
                                ) : (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                        }}
                        variant="outlined"
                        disabled={loading}
                    />
                </ModalRowContainer>
                <ModalDivider />
                <ModalRowContainer>
                    <AuthenticationOrangeButton onClick={handleSignUpWithEmail} disabled={loading}>
                        {S.BUTTON_LABELS.SignUpExclamation}
                    </AuthenticationOrangeButton>
                </ModalRowContainer>
                <ModalFooterRow>
                    <ModalFooterText>{S.AUTHENTICATION.AlreadyHaveAnAccount}</ModalFooterText>&nbsp;
                    <ModalFooterSignUp onClick={handleGoToSignIn}>{S.AUTHENTICATION.SignIn}</ModalFooterSignUp>
                </ModalFooterRow>
            </ModalBodyContainer>
        </>
    )
}

export default SignUpWithEmail
