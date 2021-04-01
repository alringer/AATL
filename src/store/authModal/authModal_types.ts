// State Interfaces
export interface AuthModalReducerState {
    isOpen: boolean
    currentAuthenticationView: AuthenticationViewEnum
    error: boolean
    loading: boolean
    targetEmail: string
}

export enum AuthenticationViewEnum {
    Login,
    SignUp,
    ForgotPassword,
    SignUpWithEmail,
    MagicLinkResetPassword,
    MagicLinkSetupAccount,
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

export const SET_TARGET_EMAIL = 'SET_TARGET_EMAIL'

interface SetTargetEmailAction {
    type: typeof SET_TARGET_EMAIL
    payload: string
}

export type AuthModalActionTypes =
    | OpenAuthenticationModalAction
    | SetAuthenticationErrorAction
    | CloseAuthenticationModalAction
    | SetAuthenticationViewAction
    | SetAuthenticationLoadingAction
    | SetTargetEmailAction
