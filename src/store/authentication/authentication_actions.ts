import { action } from 'typesafe-actions'
import { CLEAR_KEYCLOAK, SET_KEYCLOAK } from './authentication_types'

export const setAccessToken = (keycloak: Keycloak.KeycloakInstance) => action(SET_KEYCLOAK, keycloak)
export const clearAuthorization = () => action(CLEAR_KEYCLOAK)
