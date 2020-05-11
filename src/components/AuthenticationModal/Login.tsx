import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Tooltip from '@material-ui/core/Tooltip'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import MobileCloseSVG from 'assets/mushroom-close.svg'
import Image from 'components/Image/Image'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { thunkLogin } from 'store/authentication/authentication_actions'
import { AuthenticationViewEnum } from 'store/authentication/authentication_types'
import { query } from 'style/device'
import { ErrorIcon } from 'style/ErrorIcon/ErrorIcon.style'
import { CustomTextField } from 'style/TextField/TextField.style'
import { validateEmail } from 'utilities/helpers/validateEmail'
import {
    AuthenticationOrangeButton,
    AuthenticationWhiteButton,
    ForgotYourPassword,
    ModalBodyContainer,
    ModalDivider,
    ModalErrorText,
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
    password: string
    showPassword: boolean
}

interface Errors {
    email: string
    password: string
}

interface IReduxProps {
    thunkLogin: (email: string, password: string) => void
    loading: boolean
    error: boolean
}

interface ILoginProps extends IReduxProps {
    setCurrentAuthenticationView: (authenticationType: AuthenticationViewEnum) => void
    closeModal: () => void
}

const Login: React.FC<ILoginProps> = ({ error, setCurrentAuthenticationView, closeModal, thunkLogin, loading }) => {
    const DEFAULT_VALUES = {
        email: '',
        password: '',
        showPassword: false,
    }
    const DEFAULT_ERRORS = { email: '', password: '' }
    const [values, setValues] = React.useState<Values>(DEFAULT_VALUES)
    const [errors, setAuthenticationErrors] = React.useState<Errors>(DEFAULT_ERRORS)

    const handleSignInWithEmail = () => {
        // TODO: Wire up sign-in-with-email
        console.log('TODO: Wire up sign-in-with-email')
        const formValid = validateForm()
        if (formValid) {
            thunkLogin(values.email, values.password)
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
        if (values.password === '') {
            newErrors = { ...newErrors, password: S.ERROR_MESSAGES.EmptyPassword }
            isValid = false
        }
        setAuthenticationErrors(newErrors)

        return isValid
    }

    const handleSignInWithInstagram = () => {
        // TODO: Wire up sign-in-with-instagram
        console.log('TODO: Wire up sign-in-with-instagram')
    }

    const handleChange = (prop: keyof Values) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
        if (prop === 'email') {
            setAuthenticationErrors({ ...errors, email: '' })
        }
        if (prop === 'password') {
            setAuthenticationErrors({ ...errors, password: '' })
        }
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleGoToSignUp = () => {
        setCurrentAuthenticationView(AuthenticationViewEnum.SignUp)
    }

    const handleGoToForgotPassword = () => {
        setCurrentAuthenticationView(AuthenticationViewEnum.ForgotPassword)
    }

    return (
        <>
            <ModalHeaderContainer>
                <ModalHeaderText>{S.AUTHENTICATION.SignInTitle}</ModalHeaderText>
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
                    <ModalIntroductoryText>{S.AUTHENTICATION.SignInBody}</ModalIntroductoryText>
                </ModalRowContainer>
                <ModalRowContainer id="marginTop">
                    <AuthenticationWhiteButton onClick={handleSignInWithInstagram} disabled={loading}>
                        {S.BUTTON_LABELS.SignInInstagram}
                    </AuthenticationWhiteButton>
                </ModalRowContainer>
                <ModalDivider />
                {error && (
                    <ModalRowContainer id="marginTop">
                        <ModalErrorText>{S.ERROR_MESSAGES.WrongEmailOrPassword}</ModalErrorText>
                    </ModalRowContainer>
                )}
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
                    <ForgotYourPassword onClick={handleGoToForgotPassword}>
                        {S.AUTHENTICATION.Forgot}
                    </ForgotYourPassword>
                </ModalRowContainer>
                <ModalRowContainer id="marginTop">
                    <AuthenticationOrangeButton onClick={handleSignInWithEmail} disabled={loading}>
                        {S.BUTTON_LABELS.SignInEmail}
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

const mapStateToProps = (state: StoreState) => ({
    loading: state.authenticationReducer.loading,
    error: state.authenticationReducer.error,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            thunkLogin,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(Login)
