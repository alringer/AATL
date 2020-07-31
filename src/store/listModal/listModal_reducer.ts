import {
    CLOSE_LIST_MODAL,
    ListModalActionTypes,
    ListModalReducerState,
    OPEN_LIST_MODAL,
    SWITCH_LIST_MODAL_VIEW,
} from 'store/listModal/listModal_types'

const initialState: ListModalReducerState = {
    isOpen: false,
    currentListModalView: null,
    placeID: null,
    recommendationID: null,
    placeListID: null,
    recommendationListID: null,
}

const listModalReducer = (state = initialState, action: ListModalActionTypes): ListModalReducerState => {
    switch (action.type) {
        case OPEN_LIST_MODAL:
            return {
                ...state,
                isOpen: true,
                ...action.payload,
            }
        case SWITCH_LIST_MODAL_VIEW:
            return {
                ...state,
                currentListModalView: action.payload,
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
