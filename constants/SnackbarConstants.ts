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
    Title: 'Sign up complete.',
    Body: 'Your account was created. Start your foodie experience by taking a look around you.',
}

export const EMAIL_SUBSCRIPTION: ISnackbarConstants = {
    Type: SNACKBAR_TYPES.Complete,
    Title: 'Email subscribed.',
    Body: 'Your email was successfully subscribed. Look forward to our newsletters!',
    LinkMessage: 'Look around!',
    LinkDestination: R.ROUTE_ITEMS.home,
}
