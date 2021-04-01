import { SET_PRELAUNCH_PERIOD } from 'store/prelaunch/prelaunch_types'
import { action } from 'typesafe-actions'

export const setPrelaunchPeriod = (isPrelaunch: boolean) =>
    action(SET_PRELAUNCH_PERIOD, isPrelaunch)
