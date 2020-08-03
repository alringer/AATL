import { IUserProfile } from './userProfile'
import { IVenue } from './venue'

export interface IVenueMetaList {
    id: number
    title: string | null
    summary: string | null
    createdAt: string | null
    updatedAt: string | null
    deletedAt: string | null
    venues: IVenue[]
    createdBy: IUserProfile
}
