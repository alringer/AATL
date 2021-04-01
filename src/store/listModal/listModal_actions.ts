import {
    CLOSE_LIST_MODAL,
    ListModalViewEnum,
    OpenListModalPayload,
    OPEN_LIST_MODAL,
    SWITCH_LIST_MODAL_VIEW,
} from 'store/listModal/listModal_types'
import { action } from 'typesafe-actions'

export const openListModal = (payload: OpenListModalPayload) => action(OPEN_LIST_MODAL, payload)
export const switchListModalView = (payload: ListModalViewEnum) => action(SWITCH_LIST_MODAL_VIEW, payload)
export const closeListModal = () => action(CLOSE_LIST_MODAL)
