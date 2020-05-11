import { action } from 'typesafe-actions'
import { IUserInformation, LOGIN, LOGOUT } from './user_types'

export const login = (userInformation: IUserInformation) => action(LOGIN, userInformation)
export const logout = () => action(LOGOUT)
