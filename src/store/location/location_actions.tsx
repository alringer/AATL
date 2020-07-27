import { action } from 'typesafe-actions'
import { ILocationInformation, SET_IP_LOCATION, SET_PREFERRED_LOCATION } from './location_types'

export const setPreferredLocation = (locationInformation: ILocationInformation) =>
    action(SET_PREFERRED_LOCATION, locationInformation)
export const setIPLocation = (locationInformation: ILocationInformation) => action(SET_IP_LOCATION, locationInformation)
