// import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import ExampleSVG from 'assets/iconExample.svg'
import React from 'react'
import Snackbar from '../components/Snackbar/Snackbar'
import * as B from '../constants/SnackbarConstants'

export const TaskData = {
    emailSubscription: {
        type: B.EMAIL_SUBSCRIPTION.Type,
        title: B.EMAIL_SUBSCRIPTION.Title,
        message: B.EMAIL_SUBSCRIPTION.Body,
    },
    signUp: {
        type: B.SIGN_UP.Type,
        title: B.SIGN_UP.Title,
        message: B.SIGN_UP.Body,
        linkMessage: B.SIGN_UP.LinkMessage,
        linkDestination: B.SIGN_UP.LinkDestination,
    },
    achievementUnlocked: {
        type: B.ACHIEVEMENT_UNLOCKED.Type,
        title: B.ACHIEVEMENT_UNLOCKED.Title,
        message: B.ACHIEVEMENT_UNLOCKED.Body,
        iconPath: ExampleSVG,
        linkMessage: B.ACHIEVEMENT_UNLOCKED.LinkMessage,
        linkDestination: B.ACHIEVEMENT_UNLOCKED.LinkDestination,
    },
    copiedToClipboard: {
        type: B.COPY_TO_CLIPBOARD.Type,
        title: B.COPY_TO_CLIPBOARD.Title,
        message: B.COPY_TO_CLIPBOARD.Body,
    },
}

storiesOf('Snackbar', module)
    .add('Email Subscription Complete', () => {
        return <Snackbar {...TaskData.emailSubscription} />
    })
    .add('Sign Up Completed', () => {
        return <Snackbar {...TaskData.signUp} />
    })
    .add('Achievement Unlocked', () => {
        return <Snackbar {...TaskData.achievementUnlocked} />
    })
    .add('Copied to Clipboard', () => {
        return <Snackbar {...TaskData.copiedToClipboard} />
    })
