import {
    CLOSE_LIST_MODAL,
    ListModalActionTypes,
    ListModalReducerState,
    OPEN_LIST_MODAL,
} from 'store/listModal/listModal_types'

const initialState: ListModalReducerState = {
    isOpen: false,
    currentListModalView: null,
}

const listModalReducer = (state = initialState, action: ListModalActionTypes): ListModalReducerState => {
    switch (action.type) {
        case OPEN_LIST_MODAL:
            return {
                ...state,
                isOpen: true,
                currentListModalView: action.payload.newListModalView,
            }
        case CLOSE_LIST_MODAL:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

export default listModalReducer
