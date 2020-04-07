import { action } from 'typesafe-actions'
import { LOGIN } from './user_types'

export const login = () => action(LOGIN)
