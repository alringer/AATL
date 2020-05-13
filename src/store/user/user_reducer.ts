import { LOGIN, LOGOUT, UserActionTypes, UserReducerState } from './user_types'

const initialState: UserReducerState = {
    userName: '',
    userEmail: '',
    loggedIn: false,
}

const userReducer = (state = initialState, action: UserActionTypes): UserReducerState => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                ...action.payload,
                loggedIn: true,
            }
        case LOGOUT:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

export default userReducer
