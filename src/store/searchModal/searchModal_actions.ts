import { action } from 'typesafe-actions'
import { CLEAR_SEARCH_MODAL, CLOSE_SEARCH_MODAL, OPEN_SEARCH_MODAL } from './searchModal_types'

export const openSearchModal = () => action(OPEN_SEARCH_MODAL)
export const closeSearchModal = () => action(CLOSE_SEARCH_MODAL)
export const clearSearchModal = () => action(CLEAR_SEARCH_MODAL)
