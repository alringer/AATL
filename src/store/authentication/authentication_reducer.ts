import { createStore } from 'redux'
import {
    AuthenticationActionTypes,
    AuthenticationReducerState,
    CLEAR_KEYCLOAK,
    SET_KEYCLOAK,
} from './authentication_types'

const initialState: AuthenticationReducerState = {
    keycloak: null,
}

const authenticationReducer = (state = initialState, action: AuthenticationActionTypes): AuthenticationReducerState => {
    switch (action.type) {
        case SET_KEYCLOAK:
            return {
                ...state,
                keycloak: action.payload,
            }
        case CLEAR_KEYCLOAK:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

const authStore = createStore(authenticationReducer)

export default authStore
