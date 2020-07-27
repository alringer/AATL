// State Interfaces
export interface RecommendationModalPlaceInformation {
    placeID: number | null
    placeName: string | null
    isAATL: boolean | null
}

export interface IRecommendationPayload {
    title: string
    description: string
    file: File
}

export interface RecommendationModalReducerState extends RecommendationModalPlaceInformation {
    isOpen: boolean
}

export enum RecommendationModalViewNum {
    Editor,
    Published,
}

// Action Types
export const OPEN_RECOMMENDATION_MODAL = 'OPEN_RECOMMENDATION_MODAL'

interface OpenRecommendationModalAction {
    type: typeof OPEN_RECOMMENDATION_MODAL
    payload: RecommendationModalPlaceInformation
}

export const CLOSE_RECOMMENDATION_MODAL = 'CLOSE_RECOMMENDATION_MODAL'

interface CloseRecommendationModalAction {
    type: typeof CLOSE_RECOMMENDATION_MODAL
}

export const CLEAR_RECOMMENDATION_MODAL = 'CLEAR_RECOMMENDATION_MODAL'

interface ClearRecommendationModalAction {
    type: typeof CLEAR_RECOMMENDATION_MODAL
}

export const PUBLISH_RECOMMENDATION = 'PUBLISH_RECOMMENDATION'

interface PublishRecommendationModalAction {
    type: typeof PUBLISH_RECOMMENDATION
    payload: IRecommendationPayload
}

export type RecommendationModalActionTypes =
    | OpenRecommendationModalAction
    | CloseRecommendationModalAction
    | ClearRecommendationModalAction
    | PublishRecommendationModalAction
