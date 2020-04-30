import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import MobileCloseSVG from 'assets/mushroom-close.svg'
import Image from 'components/Image/Image'
import { AuthenticationViewEnum } from 'components/Modal/AuthenticationModal'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from 'store/user/user_actions'
import { query } from 'style/device'
import { CustomTextField } from 'style/TextField/TextField.style'
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

interface IReduxProps {
    login: () => void
}

interface ILoginProps extends IReduxProps {
    setCurrentAuthentication: (authenticationType: AuthenticationViewEnum) => void
    closeAuthenticationModal: () => void
}

const Login: React.FC<ILoginProps> = ({ setCurrentAuthentication, closeAuthenticationModal, login }) => {
    const [values, setValues] = React.useState<Values>({
        email: '',
        password: '',
        showPassword: false,
    })
    const [error, setError] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)

    const handleSignInWithEmail = () => {
        // TODO: Wire up sign-in-with-email
        console.log('TODO: Wire up sign-in-with-email')
        setLoading(true)
        setTimeout(() => {
            if (values.email === 'seamgen@awesome.com' && values.password === '123123') {
                login()
                closeAuthenticationModal()
            } else {
                setError(true)
            }
            setLoading(false)
        }, 1000)
    }

    const handleSignInWithInstagram = () => {
        // TODO: Wire up sign-in-with-instagram
        console.log('TODO: Wire up sign-in-with-instagram')
    }

    const handleChange = (prop: keyof Values) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleGoToSignUp = () => {
        setCurrentAuthentication(AuthenticationViewEnum.SignUp)
    }

    const handleGoToForgotPassword = () => {
        setCurrentAuthentication(AuthenticationViewEnum.ForgotPassword)
    }

    return (
        <>
            <ModalHeaderContainer>
                <ModalHeaderText>{S.AUTHENTICATION.SignInTitle}</ModalHeaderText>
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
                        <ModalErrorText>{S.AUTHENTICATION.ErrorMessage}</ModalErrorText>
                    </ModalRowContainer>
                )}
                <ModalRowContainer id="marginTop">
                    <CustomTextField
                        value={values.email}
                        placeholder={`${S.INPUT_PLACEHOLDERS.Email}`}
                        type={'email'}
                        onChange={handleChange('email')}
                        variant="outlined"
                        autoFocus={true}
                        disabled={loading}
                    />
                </ModalRowContainer>
                <ModalRowContainer id="marginTop">
                    <CustomTextField
                        value={values.password}
                        placeholder={`${S.INPUT_PLACEHOLDERS.Password}`}
                        type={values.showPassword ? 'text' : 'password'}
                        onChange={handleChange('password')}
                        autoComplete="current-password"
                        InputProps={{
                            endAdornment: (
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

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            login,
        },
        dispatch
    )

export default reduxConnect(null, mapDispatchToProps)(Login)
