// State Interfaces
export interface PrelaunchReducerState {
    isPrelaunch: boolean | null
}

// Action Types
export const SET_PRELAUNCH_PERIOD = 'SET_PRELAUNCH_PERIOD'

interface SetPrelaunchPeriod {
    type: typeof SET_PRELAUNCH_PERIOD
    payload: boolean
}

export type PrelaunchActionTypes = SetPrelaunchPeriod
