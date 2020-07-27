import { LOGIN, LOGOUT, UserActionTypes, UserReducerState } from './user_types'

const initialState: UserReducerState = {
    activated: null,
    content: null,
    createdAt: null,
    deletedAt: null,
    email: null,
    firstName: null,
    id: null,
    imageCDNUrl: null,
    instagramId: null,
    lastName: null,
    updatedAt: null,
    userByLine: null,
    userId: null,
    username: null,
    userRole: null,
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
