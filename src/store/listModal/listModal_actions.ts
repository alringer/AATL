import { CLOSE_LIST_MODAL, OpenListModalPayload, OPEN_LIST_MODAL } from 'store/listModal/listModal_types'
import { action } from 'typesafe-actions'

export const openListModal = (payload: OpenListModalPayload) => action(OPEN_LIST_MODAL, payload)
export const closeListModal = () => action(CLOSE_LIST_MODAL)
