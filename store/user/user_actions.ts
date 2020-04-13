import { action } from 'typesafe-actions'
import { LOGIN, LOGOUT } from './user_types'

export const login = () => action(LOGIN)
export const logout = () => action(LOGOUT)
