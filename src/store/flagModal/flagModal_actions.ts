import {
    CLOSE_FLAG_MODAL, OpenFlagModalPayload,
    OPEN_FLAG_MODAL
} from 'store/flagModal/flagModal_types'
import { action } from 'typesafe-actions'

export const openFlagModal = (payload: OpenFlagModalPayload) => action(OPEN_FLAG_MODAL, payload)
export const closeFlagModal = () => action(CLOSE_FLAG_MODAL)
