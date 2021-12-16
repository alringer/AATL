import {
    CLOSE_FOODIE_FOUNDER_UNLOCKED_MODAL,
    OPEN_FOODIE_FOUNDER_UNLOCKED_MODAL,
} from 'store/foodieFounderUnlockedModal/foodieFounderUnlocked_types'
import { action } from 'typesafe-actions'

export const openFoodieFounderUnlockedModal = () => action(OPEN_FOODIE_FOUNDER_UNLOCKED_MODAL)
export const closeFoodieFounderUnlockedModal = () => action(CLOSE_FOODIE_FOUNDER_UNLOCKED_MODAL)
