import Dialog from '@material-ui/core/Dialog'
import ForgotPassword from 'components/AuthenticationModal/ForgotPassword'
import MagicLink from 'components/AuthenticationModal/MagicLink'
import SignUpWithEmail from 'components/AuthenticationModal/SignUpWithEmail'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import {
    closeAuthenticationModal,
    setTargetEmail,
    switchAuthenticationView,
} from 'store/authentication/authentication_actions'
import { AuthenticationViewEnum } from 'store/authentication/authentication_types'
import { query } from 'style/device'
import { ModalContentContainer } from './AuthenticationModal.style'
import Login from './Login'
import SignUp from './SignUp'

interface IReduxProps {
    targetEmail: string
    isOpen: boolean
    currentAuthenticationView: AuthenticationViewEnum
    closeAuthenticationModal: () => void
    switchAuthenticationView: (targetView: AuthenticationViewEnum) => void
    setTargetEmail: (input: string) => void
}

interface IAuthenticationModalProps extends IReduxProps {}

const AuthenticationModal: React.FC<IAuthenticationModalProps> = ({
    targetEmail,
    isOpen,
    currentAuthenticationView,
    closeAuthenticationModal,
    switchAuthenticationView,
    setTargetEmail,
}) => {
    const authRef = React.useRef(null)

    const handleClickOutsideAuthModal = (event) => {
        if (authRef.current && !authRef.current.contains(event.target)) {
            closeAuthenticationModal()
        }
    }

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutsideAuthModal, true)
        return () => {
            closeModal()
            document.removeEventListener('click', handleClickOutsideAuthModal, true)
        }
    }, [])

    const closeModal = () => {
        closeAuthenticationModal()
    }
    const setCurrentAuthenticationView = (targetView: AuthenticationViewEnum) => {
        switchAuthenticationView(targetView)
    }

    const setEmailToSend = (input: string) => {
        setTargetEmail(input)
    }

    return (
        <Media queries={query} defaultMatches={{ mobile: true }}>
            {(matches) => (
                <Dialog open={isOpen} fullScreen={matches.laptop || matches.tablet ? false : true}>
                    <ModalContentContainer ref={authRef}>
                        {currentAuthenticationView === AuthenticationViewEnum.Login ? (
                            <Login
                                setCurrentAuthenticationView={setCurrentAuthenticationView}
                                closeModal={closeModal}
                            />
                        ) : currentAuthenticationView === AuthenticationViewEnum.SignUp ? (
                            <SignUp
                                setCurrentAuthenticationView={setCurrentAuthenticationView}
                                closeModal={closeModal}
                            />
                        ) : currentAuthenticationView === AuthenticationViewEnum.SignUpWithEmail ? (
                            <SignUpWithEmail
                                setCurrentAuthenticationView={setCurrentAuthenticationView}
                                setEmailToSend={setEmailToSend}
                                closeModal={closeModal}
                            />
                        ) : currentAuthenticationView === AuthenticationViewEnum.ForgotPassword ? (
                            <ForgotPassword
                                setCurrentAuthenticationView={setCurrentAuthenticationView}
                                setEmailToSend={setEmailToSend}
                                closeModal={closeModal}
                            />
                        ) : currentAuthenticationView === AuthenticationViewEnum.MagicLinkResetPassword ||
                          currentAuthenticationView === AuthenticationViewEnum.MagicLinkSetupAccount ? (
                            <MagicLink
                                targetEmail={targetEmail}
                                currentAuthenticationView={currentAuthenticationView}
                                setCurrentAuthenticationView={setCurrentAuthenticationView}
                                closeModal={closeModal}
                            />
                        ) : null}
                    </ModalContentContainer>
                </Dialog>
            )}
        </Media>
    )
}

const mapStateToProps = (state: StoreState) => ({
    currentAuthenticationView: state.authenticationReducer.currentAuthenticationView,
    isOpen: state.authenticationReducer.isOpen,
    targetEmail: state.authenticationReducer.targetEmail,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            closeAuthenticationModal,
            switchAuthenticationView,
            setTargetEmail,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(AuthenticationModal)
