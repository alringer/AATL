import {
    CLOSE_DELETE_RECOMMENDATION_MODAL, OpenDeleteRecommendationModalPayload, OPEN_DELETE_RECOMMENDATION_MODAL
} from 'store/deleteRecommendationModal/deleteRecommendationModal_types'
import { action } from 'typesafe-actions'

export const openDeleteRecommendationModal = (payload: OpenDeleteRecommendationModalPayload) => action(OPEN_DELETE_RECOMMENDATION_MODAL, payload)
export const closeDeleteRecommendationModal = () => action(CLOSE_DELETE_RECOMMENDATION_MODAL)
