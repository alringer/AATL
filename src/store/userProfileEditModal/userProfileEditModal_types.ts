import { IUserProfile } from 'utilities/types/userProfile'

export interface UserProfileEditModalReducerState {
    isOpen: boolean
    onSuccess: () => void
    user: IUserProfile | null
}
export type OpenUserProfileEditModalPayload = {
    onSuccess?: () => void
    user: IUserProfile
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
