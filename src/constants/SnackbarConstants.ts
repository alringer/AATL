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
