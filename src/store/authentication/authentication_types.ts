// State Interfaces
export interface AuthenticationReducerState {
    isOpen: boolean
    currentAuthenticationView: AuthenticationViewEnum
    error: boolean
    loading: boolean
}

export enum AuthenticationViewEnum {
    Login,
    SignUp,
    ForgotPassword,
    SignUpWithEmail,
    MagicLink,
}

// Action Types
export const OPEN_AUTHENTICATION_MODAL = 'OPEN_AUTHENTICATION_MODAL'

interface OpenAuthenticationModalAction {
    type: typeof OPEN_AUTHENTICATION_MODAL
    payload: AuthenticationViewEnum
}

export const SET_AUTHENTICATION_ERROR = 'SET_AUTHENTICATION_ERROR'

interface SetAuthenticationErrorAction {
    type: typeof SET_AUTHENTICATION_ERROR
    payload: boolean
}

export const SET_AUTHENTICATION_LOADING = 'SET_AUTHENTICATION_LOADING'

interface SetAuthenticationLoadingAction {
    type: typeof SET_AUTHENTICATION_LOADING
    payload: boolean
}

export const CLOSE_AUTHENTICATION_MODAL = 'CLOSE_AUTHENTICATION_MODAL'

interface CloseAuthenticationModalAction {
    type: typeof CLOSE_AUTHENTICATION_MODAL
}

export const SET_AUTHENTICATION_VIEW = 'SET_AUTHENTICATION_VIEW'

interface SetAuthenticationViewAction {
    type: typeof SET_AUTHENTICATION_VIEW
    payload: AuthenticationViewEnum
}

export type AuthenticationActionTypes =
    | OpenAuthenticationModalAction
    | SetAuthenticationErrorAction
    | CloseAuthenticationModalAction
    | SetAuthenticationViewAction
    | SetAuthenticationLoadingAction
