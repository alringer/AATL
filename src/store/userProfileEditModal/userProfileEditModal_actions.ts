import {
    CLOSE_USER_PROFILE_EDIT_MODAL,
    OpenUserProfileEditModalPayload,
    OPEN_USER_PROFILE_EDIT_MODAL,
} from 'store/userProfileEditModal/userProfileEditModal_types'
import { action } from 'typesafe-actions'

export const openUserProfileEditModal = (payload: OpenUserProfileEditModalPayload) =>
    action(OPEN_USER_PROFILE_EDIT_MODAL, payload)
export const closeUserProfileEditModal = () => action(CLOSE_USER_PROFILE_EDIT_MODAL)
