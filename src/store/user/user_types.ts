export interface IUserInformation {
    userName: string
    userEmail: string
}

export interface UserReducerState extends IUserInformation {
    loggedIn: boolean
}

// Action Types
export const LOGIN = 'LOGIN'

interface LoginAction {
    type: typeof LOGIN
    payload: UserReducerState
}

export const LOGOUT = 'LOGOUT'

interface LogoutAction {
    type: typeof LOGOUT
}

export type UserActionTypes = LoginAction | LogoutAction
