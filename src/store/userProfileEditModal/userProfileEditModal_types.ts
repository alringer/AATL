export interface UserProfileEditModalReducerState {
    isOpen: boolean
    onSuccess: () => void
}
export type OpenUserProfileEditModalPayload = {
    onSuccess?: () => void
}

// Action Types
export const OPEN_USER_PROFILE_EDIT_MODAL = 'OPEN_USER_PROFILE_EDIT_MODAL'

interface OpenUserProfileEditModalAction {
    type: typeof OPEN_USER_PROFILE_EDIT_MODAL
    payload: OpenUserProfileEditModalPayload
}

export const CLOSE_USER_PROFILE_EDIT_MODAL = 'CLOSE_USER_PROFILE_EDIT_MODAL'

interface CloseUserProfileEditModalAction {
    type: typeof CLOSE_USER_PROFILE_EDIT_MODAL
}

export type UserProfileEditModalActionTypes = OpenUserProfileEditModalAction | CloseUserProfileEditModalAction
