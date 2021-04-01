import { ICategory } from '../../utilities/types/category'

// State Interfaces
export interface CategoriesReducerState {
    categories: ICategory[]
}
// Action Types
export const SET_CATEGORIES = 'SET_CATEGORIES'

interface SetCategoriesAction {
    type: typeof SET_CATEGORIES
    payload: ICategory[]
}

export type CategoriesActionTypes = SetCategoriesAction
