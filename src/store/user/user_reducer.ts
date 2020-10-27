import { LOGIN, LOGOUT, SET_LOADING, UserActionTypes, UserReducerState } from './user_types'

const initialState: UserReducerState = {
    user: null,
    userRole: null,
    loggedIn: false,
    isLoading: false,
    venuesListsVenueIDs: [],
venuesRecommendedVenueIDs: [],
venuesRecommendationPromptsVenueIDs: [],
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
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            }
        default:
            return state
    }
}

export default userReducer
