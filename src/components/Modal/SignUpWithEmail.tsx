import { IconButton, InputAdornment } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
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

interface Values {
    email: string
    fullName: string
    password: string
    confirmPassword: string
    showPassword: boolean
    showConfirmPassword: boolean
}

interface ISignUpWithEmailProps {
    setCurrentAuthentication: (authenticationType: AuthenticationViewEnum) => void
    closeAuthenticationModal: () => void
}

const SignUpWithEmail: React.FC<ISignUpWithEmailProps> = ({ setCurrentAuthentication, closeAuthenticationModal }) => {
    const [values, setValues] = React.useState<Values>({
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
    })
    const [error, setError] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)

    const handleGoToSignIn = () => {
        setCurrentAuthentication(AuthenticationViewEnum.Login)
    }

    const handleChange = (prop: keyof Values) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
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
        // TODO: Wire up sign up API
        console.log('TODO: Wire up sign up API')
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    return (
        <>
            <ModalHeaderContainer>
                <ModalHeaderText>{S.AUTHENTICATION.SignUpWithEmailTitle}</ModalHeaderText>
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
                    <ModalIntroductoryText>{S.AUTHENTICATION.SignUpWithEmailBody}</ModalIntroductoryText>
                </ModalRowContainer>
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
                        value={values.fullName}
                        placeholder={`${S.INPUT_PLACEHOLDERS.YourFullName}`}
                        type={'fullName'}
                        onChange={handleChange('fullName')}
                        variant="outlined"
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
                </ModalRowContainer>
                <ModalRowContainer id="marginTop">
                    <CustomTextField
                        value={values.confirmPassword}
                        placeholder={`${S.INPUT_PLACEHOLDERS.ConfirmPassword}`}
                        type={values.showConfirmPassword ? 'text' : 'password'}
                        onChange={handleChange('confirmPassword')}
                        InputProps={{
                            endAdornment: (
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
