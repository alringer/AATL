export interface SearchModalReducerState {
    isOpen: boolean
}

export enum SearchModalViewNum {
    Search,
    AddNewPlace,
}

// Action Types
export const OPEN_SEARCH_MODAL = 'OPEN_SEARCH_MODAL'

interface OpenSearchModalAction {
    type: typeof OPEN_SEARCH_MODAL
}

export const CLOSE_SEARCH_MODAL = 'CLOSE_SEARCH_MODAL'

interface CloseSearchModalAction {
    type: typeof CLOSE_SEARCH_MODAL
}

export const CLEAR_SEARCH_MODAL = 'CLEAR_SEARCH_MODAL'

interface ClearSearchModalAction {
    type: typeof CLEAR_SEARCH_MODAL
}

export type SearchModalActionTypes = OpenSearchModalAction | CloseSearchModalAction | ClearSearchModalAction
