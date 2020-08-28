import * as R from './RouteConstants'

interface ISnackbarConstants {
    Type: string
    Title: string
    Body: string
    LinkMessage?: string
    LinkDestination?: string
}

export const SNACKBAR_TYPES = {
    Achievement: 'achievement',
    Complete: 'complete',
    Error: 'error',
}

export const ERROR_RESTAURANT: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Error,
    Title: 'We cannot load this restaurant at the moment',
    Body: 'Meanwhile, browse other restaurants or add new ones!',
}

export const ERROR_CITY: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Error,
    Title: 'We cannot load this city at the moment',
    Body: 'Meanwhile, browse other cities we have!',
}

export const ERROR_USER_PROFILE: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Error,
    Title: 'We cannot load this profile at the moment',
    Body: 'Meanwhile, browse other restaurants we have!',
}

export const ERROR_RECOMMENDATION_LIST: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Error,
    Title: 'We cannot load this recommendation list at the moment',
    Body: 'Meanwhile, browse other restaurants we have!',
}

export const SIGN_UP: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Complete,
    Title: 'Sign up complete',
    Body: 'Your account was created. Start your foodie experience!',
    LinkMessage: 'Look around!',
    LinkDestination: R.ROUTE_ITEMS.home,
}

export const EMAIL_SUBSCRIPTION: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Complete,
    Title: 'Email subscribed',
    Body: 'Your email was successfully subscribed. Look forward to our newsletters!',
}

export const COPY_TO_CLIPBOARD: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Complete,
    Title: 'Copied to clipboard',
    Body: 'Current link is copied to clipboard.',
}

export const ACHIEVEMENT_UNLOCKED: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Achievement,
    Title: 'Achievement unlocked!',
    Body: 'You have just unlocked an achievement!',
    LinkMessage: 'Look around!',
    LinkDestination: R.ROUTE_ITEMS.home,
}

export const RECOMMENDATION_LINK_COPIED: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Complete,
    Title: 'Ready to share!',
    Body: 'Recommendation link was copied to clipboard',
}

export const RESTAURANT_LINK_COPIED: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Complete,
    Title: 'Ready to share!',
    Body: 'Restaurant link was copied to clipboard',
}

export const RESTAURANT_LIST_LINK_COPIED: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Complete,
    Title: 'Ready to share!',
    Body: 'Restaurant list link was copied to clipboard',
}

export const RECOMMENDATION_LIST_LINK_COPIED: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Complete,
    Title: 'Ready to share!',
    Body: 'Recommendation list link was copied to clipboard',
}

export const ADDED_TO_LIST: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Complete,
    Title: 'Success!',
    Body: 'was added to your list',
}

export const REMOVE_LIST: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Complete,
    Title: 'List deleted',
    Body: 'has been permanently removed from your lists',
}

export const REMOVE_FROM_LIST: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Complete,
    Title: 'Restaurant removed',
    Body: 'has been permanently removed from',
}

export const EDITED_LIST: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Complete,
    Title: 'Updated!',
    Body: 'Your list has been updated',
}

export const USER_PROFILE_UPDATED: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Complete,
    Title: 'Updated!',
    Body: 'Your profile was updated',
}

export const USER_PROFILE_UPDATED_NAME: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Complete,
    Title: 'Updated!',
    Body: 'Your name was updated',
}

export const USER_PROFILE_UPDATED_TITLE: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Complete,
    Title: 'Updated!',
    Body: 'Your profession/tagline was updated',
}

export const USER_PROFILE_UPDATED_DESCRIPTION: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Complete,
    Title: 'Updated!',
    Body: 'Your bio was updated',
}
