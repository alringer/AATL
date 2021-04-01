import { LocationActionTypes, LocationReducerState, SET_IP_LOCATION, SET_PREFERRED_LOCATION } from './location_types'

const initialState: LocationReducerState = {
    ipLocation: null,
    preferredLocation: null,
}

const locationReducer = (state = initialState, action: LocationActionTypes): LocationReducerState => {
    switch (action.type) {
        case SET_IP_LOCATION:
            return {
                ...state,
                ipLocation: action.payload,
            }
        case SET_PREFERRED_LOCATION:
            return {
                ...state,
                preferredLocation: action.payload,
            }
        default:
            return state
    }
}

export default locationReducer
