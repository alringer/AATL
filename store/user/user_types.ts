// State Interfaces
export interface UserReducerState {
    userName: string
    loggedIn: boolean
}

// Action Types
export const LOGIN = 'LOGIN'

interface LoginAction {
    type: typeof LOGIN
}

export type UserActionTypes = LoginAction
