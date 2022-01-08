import { CLOSE_GUIDELINES_MODAL, OPEN_GUIDELINES_MODAL } from 'store/guidelinesModal/guidelinesModal_types'
import { action } from 'typesafe-actions'

export const openGuidelinesModal = () => action(OPEN_GUIDELINES_MODAL)
export const closeGuidelinesModal = () => action(CLOSE_GUIDELINES_MODAL)
