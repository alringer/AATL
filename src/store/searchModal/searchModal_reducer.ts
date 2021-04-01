import {
    CLEAR_SEARCH_MODAL,
    CLOSE_SEARCH_MODAL,
    OPEN_SEARCH_MODAL,
    SearchModalActionTypes,
    SearchModalReducerState,
} from './searchModal_types'

const initialState: SearchModalReducerState = {
    isOpen: false,
}

const searchModalReducer = (state = initialState, action: SearchModalActionTypes): SearchModalReducerState => {
    switch (action.type) {
        case OPEN_SEARCH_MODAL:
            return {
                ...state,
                isOpen: true,
            }
        case CLOSE_SEARCH_MODAL:
            return {
                ...initialState,
            }
        case CLEAR_SEARCH_MODAL:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

export default searchModalReducer
