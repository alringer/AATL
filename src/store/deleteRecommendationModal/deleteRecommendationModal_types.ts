
export interface DeleteRecommendationModalReducerState {
    isOpen: boolean
    flaggedRecommendationID: number | null
    onSuccess: () => void
}


export type OpenDeleteRecommendationModalPayload = {
    flaggedRecommendationID: number
    onSuccess: () => void
}

// Action Types
export const OPEN_DELETE_RECOMMENDATION_MODAL = 'OPEN_DELETE_RECOMMENDATION_MODAL'

interface OpenDeleteRecommendationModalAction {
    type: typeof OPEN_DELETE_RECOMMENDATION_MODAL
    payload: OpenDeleteRecommendationModalPayload
}

export const CLOSE_DELETE_RECOMMENDATION_MODAL = 'CLOSE_DELETE_RECOMMENDATION_MODAL'

interface CloseDeleteRecommendationModalAction {
    type: typeof CLOSE_DELETE_RECOMMENDATION_MODAL
}

export type DeleteRecommendationModalActionTypes = OpenDeleteRecommendationModalAction | CloseDeleteRecommendationModalAction
