export interface AuthenticationReducerState {
    keycloak: Keycloak.KeycloakInstance
}

// Action Types
export const SET_KEYCLOAK = 'SET_KEYCLOAK'

interface SetKeycloakAction {
    type: typeof SET_KEYCLOAK
    payload: Keycloak.KeycloakInstance
}

export const CLEAR_KEYCLOAK = 'CLEAR_KEYCLOAK'

interface ClearKeycloakAction {
    type: typeof CLEAR_KEYCLOAK
}

export type AuthenticationActionTypes = SetKeycloakAction | ClearKeycloakAction
