import {
    CLOSE_GUIDELINES_MODAL,
    GuidelinesModalActionTypes,
    GuidelinesModalReducerState,
    OPEN_GUIDELINES_MODAL,
} from 'store/guidelinesModal/guidelinesModal_types'

const initialState: GuidelinesModalReducerState = {
    isOpen: false,
}

const guidelinesModalReducer = (
    state = initialState,
    action: GuidelinesModalActionTypes
): GuidelinesModalReducerState => {
    switch (action.type) {
        case OPEN_GUIDELINES_MODAL:
            return {
                ...state,
                isOpen: true,
            }
        case CLOSE_GUIDELINES_MODAL:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

export default guidelinesModalReducer
