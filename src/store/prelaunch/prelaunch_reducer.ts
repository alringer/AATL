import { PrelaunchActionTypes, PrelaunchReducerState, SET_PRELAUNCH_PERIOD } from "store/prelaunch/prelaunch_types"

const initialState: PrelaunchReducerState = {
    isPrelaunch: null,
}

const prelaunchReducer = (state = initialState, action: PrelaunchActionTypes): PrelaunchReducerState => {
    switch (action.type) {
        case SET_PRELAUNCH_PERIOD:
            return {
                ...state,
                isPrelaunch: action.payload,
            }
        default:
            return state
    }
}

export default prelaunchReducer

