import {
    CLOSE_INFLUENCER_TOUR,
    CLOSE_INFLUENCER_TOUR_MODAL,
    OPEN_INFLUENCER_TOUR,
    OPEN_INFLUENCER_TOUR_MODAL,
} from 'store/influencerTourModal/influencerTourModal_types'
import { action } from 'typesafe-actions'

export const openInfluencerTourModal = () => action(OPEN_INFLUENCER_TOUR_MODAL)
export const closeInfluencerTourModal = () => action(CLOSE_INFLUENCER_TOUR_MODAL)
export const openInfluencerTour = () => action(OPEN_INFLUENCER_TOUR)
export const closeInfluencerTour = () => action(CLOSE_INFLUENCER_TOUR)
