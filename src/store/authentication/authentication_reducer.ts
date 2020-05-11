import {
    AuthenticationActionTypes,
    AuthenticationReducerState,
    AuthenticationViewEnum,
    CLOSE_AUTHENTICATION_MODAL,
    OPEN_AUTHENTICATION_MODAL,
    SET_AUTHENTICATION_ERROR,
    SET_AUTHENTICATION_LOADING,
    SET_AUTHENTICATION_VIEW,
} from './authentication_types'

const initialState: AuthenticationReducerState = {
    isOpen: false,
    currentAuthenticationView: AuthenticationViewEnum.Login,
    error: false,
    loading: false,
}

const authenticationReducer = (state = initialState, action: AuthenticationActionTypes): AuthenticationReducerState => {
    switch (action.type) {
        case OPEN_AUTHENTICATION_MODAL:
            return {
                ...state,
                isOpen: true,
                currentAuthenticationView: action.payload,
            }
        case CLOSE_AUTHENTICATION_MODAL:
            return {
                ...state,
                isOpen: false,
                error: false,
            }
        case SET_AUTHENTICATION_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case SET_AUTHENTICATION_LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        case SET_AUTHENTICATION_VIEW:
            return {
                ...state,
                currentAuthenticationView: action.payload,
                error: false,
            }
        default:
            return state
    }
}

export default authenticationReducer
