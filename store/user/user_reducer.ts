import { LOGIN, UserActionTypes, UserReducerState } from './user_types'

const initialState: UserReducerState = {
    userName: '',
    loggedIn: false
}

const userReducer = (state = initialState, action: UserActionTypes): UserReducerState => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedIn: true
            }
        default:
            return state
    }
}

export default userReducer
