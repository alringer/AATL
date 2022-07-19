import {
    CLEAR_RECOMMENDATION_MODAL,
    CLOSE_RECOMMENDATION_MODAL,
    OPEN_RECOMMENDATION_MODAL,
    RecommendationModalActionTypes,
    RecommendationModalReducerState,
} from './recommendationModal_types'

const initialState: RecommendationModalReducerState = {
    isOpen: false,
    placeID: null,
    placeName: null,
    recommendation_type: null,
    recommendationID: null,
}

const recommendationModalReducer = (
    state = initialState,
    action: RecommendationModalActionTypes
): RecommendationModalReducerState => {
    switch (action.type) {
        case OPEN_RECOMMENDATION_MODAL:
            return {
                ...state,
                isOpen: true,
                placeID: action.payload.placeID,
                placeName: action.payload.placeName,
                recommendation_type: action.payload.recommendation_type,
                recommendationID: action.payload.recommendationID,
            }
        case CLOSE_RECOMMENDATION_MODAL:
            return {
                ...initialState,
            }
        case CLEAR_RECOMMENDATION_MODAL:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

export default recommendationModalReducer
