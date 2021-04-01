// State Interfaces
export interface LocationReducerState {
    ipLocation: ILocationInformation | null
    preferredLocation: ILocationInformation | null
}

export interface ILocationInformation {
    city: string
    country: string
    state: string
    lat: string
    lng: string
}

// Action Types
export const SET_IP_LOCATION = 'SET_IP_LOCATION'

interface SetIPLocationAction {
    type: typeof SET_IP_LOCATION
    payload: ILocationInformation
}

export const SET_PREFERRED_LOCATION = 'SET_PREFERRED_LOCATION'

interface SetPreferredLocationAction {
    type: typeof SET_PREFERRED_LOCATION
    payload: ILocationInformation
}

export type LocationActionTypes = SetIPLocationAction | SetPreferredLocationAction
