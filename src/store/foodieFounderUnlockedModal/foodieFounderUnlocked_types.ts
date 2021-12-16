export interface FoodieFounderUnlockedModalReducerState {
    isOpen: boolean
}

// Action Types
export const OPEN_FOODIE_FOUNDER_UNLOCKED_MODAL = 'OPEN_FOODIE_FOUNDER_UNLOCKED_MODAL'

interface OpenFoodieFounderUnlockedModalAction {
    type: typeof OPEN_FOODIE_FOUNDER_UNLOCKED_MODAL
}

export const CLOSE_FOODIE_FOUNDER_UNLOCKED_MODAL = 'CLOSE_FOODIE_FOUNDER_UNLOCKED_MODAL'

interface CloseFoodieFounderUnlockedModalAction {
    type: typeof CLOSE_FOODIE_FOUNDER_UNLOCKED_MODAL
}

export type FoodieFounderUnlockedModalActionTypes =
    | OpenFoodieFounderUnlockedModalAction
    | CloseFoodieFounderUnlockedModalAction
