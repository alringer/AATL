import { CategoriesActionTypes, CategoriesReducerState, SET_CATEGORIES } from './categories_types'

const initialState: CategoriesReducerState = {
    categories: [],
}

const categoriesReducer = (state = initialState, action: CategoriesActionTypes): CategoriesReducerState => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            }
        default:
            return state
    }
}

export default categoriesReducer
