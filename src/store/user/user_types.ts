import { UserRoleEnum } from 'utilities/types/clientDTOS/UserRole'
import { IUserProfile } from 'utilities/types/userProfile'

export interface IUserInformation {
    user: IUserProfile | null
    userRole: UserRoleEnum | null
    isLoading: boolean
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

export const SET_LOADING = 'SET_LOADING'

interface SetLoadingAction {
    type: typeof SET_LOADING
    payload: boolean
}

export type UserActionTypes = LoginAction | LogoutAction | SetLoadingAction
