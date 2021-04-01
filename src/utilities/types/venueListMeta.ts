import { IUserProfile } from './userProfile'
import { IVenue } from './venue'

export interface IVenueListMeta {
    id: number
    title: string | null
    summary: string | null
    createdAt: string | null
    updatedAt: string | null
    deletedAt: string | null
    venues: IVenue[]
    createdBy: IUserProfile
}

export interface IVenueListMetaWithUniqueID extends IVenueListMeta {
    uniqueListID: number
}
