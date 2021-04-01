import { action } from 'typesafe-actions'
import axios, { FETCH_CATEGORIES } from '../../config/AxiosConfig'
import { ICategory } from '../../utilities/types/category'
import { SET_CATEGORIES } from './categories_types'

export const setCategories = (categories: ICategory[]) => action(SET_CATEGORIES, categories)
export const fetchCategories = () => async (dispatch) => {
    axios
        .get(FETCH_CATEGORIES)
        .then((res) => {
            dispatch(setCategories(res.data))
        })
        .catch((err) => console.log(err))
}
