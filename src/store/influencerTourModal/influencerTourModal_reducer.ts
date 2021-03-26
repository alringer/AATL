import {
    CLOSE_INFLUENCER_TOUR,
    CLOSE_INFLUENCER_TOUR_MODAL,
    InfluencerTourModalActionTypes,
    InfluencerTourModalReducerState,
    OPEN_INFLUENCER_TOUR,
    OPEN_INFLUENCER_TOUR_MODAL,
} from 'store/influencerTourModal/influencerTourModal_types'

const initialState: InfluencerTourModalReducerState = {
    isOpen: false,
    isTourOpen: false,
}

const influencerTourModalReducer = (
    state = initialState,
    action: InfluencerTourModalActionTypes
): InfluencerTourModalReducerState => {
    switch (action.type) {
        case OPEN_INFLUENCER_TOUR_MODAL:
            return {
                ...state,
                isOpen: true,
            }
        case CLOSE_INFLUENCER_TOUR_MODAL:
            return {
                ...state,
                isOpen: false,
            }
        case OPEN_INFLUENCER_TOUR:
            return {
                ...state,
                isTourOpen: true,
            }
        case CLOSE_INFLUENCER_TOUR:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

export default influencerTourModalReducer
