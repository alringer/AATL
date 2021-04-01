import {
    CLOSE_USER_PROFILE_EDIT_MODAL,
    OPEN_USER_PROFILE_EDIT_MODAL,
    UserProfileEditModalActionTypes,
    UserProfileEditModalReducerState,
} from 'store/userProfileEditModal/userProfileEditModal_types'

const initialState: UserProfileEditModalReducerState = {
    isOpen: false,
    onSuccess: () => {},
    user: null,
}

const userProfileEditModalReducer = (
    state = initialState,
    action: UserProfileEditModalActionTypes
): UserProfileEditModalReducerState => {
    switch (action.type) {
        case OPEN_USER_PROFILE_EDIT_MODAL:
            return {
                ...state,
                isOpen: true,
                ...action.payload,
            }
        case CLOSE_USER_PROFILE_EDIT_MODAL:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

export default userProfileEditModalReducer
