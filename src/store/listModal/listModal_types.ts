export interface ListModalReducerState {
    isOpen: boolean
    currentListModalView: ListModalViewEnum | null
    placeID: number | null
    recommendationID: number | null
    placeListID: number | null
    recommendationListID: number | null
}

export enum ListModalViewEnum {
    AddToRestaurantList,
    AddToRecommendationList,
    AddToNewRestaurantList,
    AddToNewRecommendationList,
    EditRestaurantList,
    EditRecommendationList,
}

export type OpenListModalPayload = {
    currentListModalView: ListModalViewEnum
    placeID?: number
    recommendationID?: number
    placeListID?: number
    recommendationListID?: number
}

// Action Types
export const OPEN_LIST_MODAL = 'OPEN_LIST_MODAL'

interface OpenListModalAction {
    type: typeof OPEN_LIST_MODAL
    payload: OpenListModalPayload
}

export const SWITCH_LIST_MODAL_VIEW = 'SWITCH_LIST_MODAL_VIEW'

interface SwitchListModalViewAction {
    type: typeof SWITCH_LIST_MODAL_VIEW
    payload: ListModalViewEnum
}

export const CLOSE_LIST_MODAL = 'CLOSE_LIST_MODAL'

interface CloseListModalAction {
    type: typeof CLOSE_LIST_MODAL
}

export type ListModalActionTypes = OpenListModalAction | CloseListModalAction | SwitchListModalViewAction
