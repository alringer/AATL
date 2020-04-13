// State Interfaces
export interface UserReducerState {
    userName: string
    userEmail: string
    loggedIn: boolean
}

// Action Types
export const LOGIN = 'LOGIN'

interface LoginAction {
    type: typeof LOGIN
}

export const LOGOUT = 'LOGOUT'

interface LogoutAction {
    type: typeof LOGOUT
}

export type UserActionTypes = LoginAction | LogoutAction
