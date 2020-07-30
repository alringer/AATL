export interface ListModalReducerState {
    isOpen: boolean
    currentListModalView: ListModalViewEnum | null
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
    newListModalView: ListModalViewEnum
}

// Action Types
export const OPEN_LIST_MODAL = 'OPEN_LIST_MODAL'

interface OpenListModalAction {
    type: typeof OPEN_LIST_MODAL
    payload: OpenListModalPayload
}

export const CLOSE_LIST_MODAL = 'CLOSE_LIST_MODAL'

interface CloseListModalAction {
    type: typeof CLOSE_LIST_MODAL
}

export type ListModalActionTypes = OpenListModalAction | CloseListModalAction
