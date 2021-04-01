import { CLOSE_DELETE_RECOMMENDATION_MODAL, DeleteRecommendationModalActionTypes, DeleteRecommendationModalReducerState, OPEN_DELETE_RECOMMENDATION_MODAL } from 'store/deleteRecommendationModal/deleteRecommendationModal_types'

const initialState: DeleteRecommendationModalReducerState = {
    isOpen: false,
    flaggedRecommendationID: null,
    onSuccess: () => {},
}

const deleteRecommendationModalReducer = (state = initialState, action: DeleteRecommendationModalActionTypes): DeleteRecommendationModalReducerState => {
    switch (action.type) {
        case OPEN_DELETE_RECOMMENDATION_MODAL:
            return {
                ...state,
                isOpen: true,
                ...action.payload,
            }
        case CLOSE_DELETE_RECOMMENDATION_MODAL:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

export default deleteRecommendationModalReducer
