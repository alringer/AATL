import { LOGIN, LOGOUT, UserActionTypes, UserReducerState } from './user_types'

const initialState: UserReducerState = {
    userName: 'John Doe',
    userEmail: 'example@domain.com',
    loggedIn: false,
}

const userReducer = (state = initialState, action: UserActionTypes): UserReducerState => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedIn: true,
            }
        case LOGOUT:
            return {
                ...state,
                loggedIn: false,
            }
        default:
            return state
    }
}

export default userReducer
