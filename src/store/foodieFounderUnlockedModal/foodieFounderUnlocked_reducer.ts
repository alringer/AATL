import {
    CLOSE_FOODIE_FOUNDER_UNLOCKED_MODAL,
    FoodieFounderUnlockedModalActionTypes,
    FoodieFounderUnlockedModalReducerState,
    OPEN_FOODIE_FOUNDER_UNLOCKED_MODAL,
} from 'store/foodieFounderUnlockedModal/foodieFounderUnlocked_types'

const initialState: FoodieFounderUnlockedModalReducerState = {
    isOpen: false,
}

const foodieFounderUnlockedModalReducer = (
    state = initialState,
    action: FoodieFounderUnlockedModalActionTypes
): FoodieFounderUnlockedModalReducerState => {
    switch (action.type) {
        case OPEN_FOODIE_FOUNDER_UNLOCKED_MODAL:
            return {
                ...state,
                isOpen: true,
            }
        case CLOSE_FOODIE_FOUNDER_UNLOCKED_MODAL:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

export default foodieFounderUnlockedModalReducer
