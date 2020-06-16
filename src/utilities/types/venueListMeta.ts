import { IVenue } from './venue'

export interface IVenueListMeta {
    createdAt?: string
    deletedAt?: string
    id?: number
    summary?: string
    title?: string
    updatedAt?: string
    venues?: IVenue[]
}
