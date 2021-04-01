import {
    CLOSE_FLAG_MODAL,
    FlagModalActionTypes,
    FlagModalReducerState,
    OPEN_FLAG_MODAL
} from 'store/flagModal/flagModal_types'

const initialState: FlagModalReducerState = {
    isOpen: false,
    recommendationID: null,
    onSuccess: () => {},
}

const flagModalReducer = (state = initialState, action: FlagModalActionTypes): FlagModalReducerState => {
    switch (action.type) {
        case OPEN_FLAG_MODAL:
            return {
                ...state,
                isOpen: true,
                ...action.payload,
            }
        case CLOSE_FLAG_MODAL:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

export default flagModalReducer
