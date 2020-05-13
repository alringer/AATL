import { action } from 'typesafe-actions'
import {
    CLEAR_RECOMMENDATION_MODAL,
    CLOSE_RECOMMENDATION_MODAL,
    OPEN_RECOMMENDATION_MODAL,
    RecommendationModalPlaceInformation,
} from './recommendationModal_types'

export const openRecommendationModal = (placeInformation: RecommendationModalPlaceInformation) =>
    action(OPEN_RECOMMENDATION_MODAL, placeInformation)
export const closeRecommendationModal = () => action(CLOSE_RECOMMENDATION_MODAL)
export const clearRecommendationModal = () => action(CLEAR_RECOMMENDATION_MODAL)
