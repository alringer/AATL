export interface InfluencerTourModalReducerState {
    isOpen: boolean
    isTourOpen: boolean
}

// Action Types
export const OPEN_INFLUENCER_TOUR_MODAL = 'OPEN_INFLUENCER_TOUR_MODAL'

interface OpenInfluencerTourModalAction {
    type: typeof OPEN_INFLUENCER_TOUR_MODAL
}

export const CLOSE_INFLUENCER_TOUR_MODAL = 'CLOSE_INFLUENCER_TOUR_MODAL'

interface CloseInfluencerTourModalAction {
    type: typeof CLOSE_INFLUENCER_TOUR_MODAL
}

export const OPEN_INFLUENCER_TOUR = 'OPEN_INFLUENCER_TOUR'

interface OpenInfluencerTourAction {
    type: typeof OPEN_INFLUENCER_TOUR
}

export const CLOSE_INFLUENCER_TOUR = 'CLOSE_INFLUENCER_TOUR'

interface CloseInfluencerTourAction {
    type: typeof CLOSE_INFLUENCER_TOUR
}

export type InfluencerTourModalActionTypes =
    | OpenInfluencerTourModalAction
    | CloseInfluencerTourModalAction
    | OpenInfluencerTourAction
    | CloseInfluencerTourAction
