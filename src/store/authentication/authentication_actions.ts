import { login } from 'store/user/user_actions'
import { IUserInformation } from 'store/user/user_types'
import { action } from 'typesafe-actions'
import {
    AuthenticationViewEnum,
    CLOSE_AUTHENTICATION_MODAL,
    OPEN_AUTHENTICATION_MODAL,
    SET_AUTHENTICATION_ERROR,
    SET_AUTHENTICATION_LOADING,
    SET_AUTHENTICATION_VIEW,
} from './authentication_types'

export const openAuthenticationModal = (currentAuthenticationView: AuthenticationViewEnum) =>
    action(OPEN_AUTHENTICATION_MODAL, currentAuthenticationView)
export const closeAuthenticationModal = () => action(CLOSE_AUTHENTICATION_MODAL)
export const setAuthenticationLoading = (loading: boolean) => action(SET_AUTHENTICATION_LOADING, loading)
export const setAuthenticationError = (error: boolean) => action(SET_AUTHENTICATION_ERROR, error)
export const setAuthenticationView = (targetView: AuthenticationViewEnum) => action(SET_AUTHENTICATION_VIEW, targetView)

export const switchAuthenticationView = (targetView: AuthenticationViewEnum) => async (dispatch) => {
    dispatch(setAuthenticationView(targetView))
    dispatch(setAuthenticationError(false))
    dispatch(setAuthenticationLoading(false))
}

export const thunkLogin = (email: string, password: string) => async (dispatch) => {
    dispatch(setAuthenticationLoading(true))
    // TODO: Wire up login API
    setTimeout(() => {
        if (email === 'seamgen@awesome.com' && password === '123123') {
            const userInformation: IUserInformation = { userName: 'Yoon', userEmail: 'example@domain.com' }
            dispatch(login(userInformation))
            dispatch(setAuthenticationError(false))
            dispatch(closeAuthenticationModal())
        } else {
            dispatch(setAuthenticationError(true))
        }
        dispatch(setAuthenticationLoading(false))
    }, 3000)
}
export const thunkLogout = () => async (dispatch) => {}
