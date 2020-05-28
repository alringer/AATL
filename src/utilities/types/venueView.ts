import { IVenue } from './venue'

export interface IVenueView {
    id?: number
    venue: IVenue
    viewCounter?: number
    viewDate?: string
}
