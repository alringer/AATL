// export interface IRecommendation {
//     recommendationID: number
//     recommendationImage: string
//     placeName: string
//     placeAddress: string
//     placeCategories: string[]
//     recommendationTitle: string
//     recommendationDescription: string
//     recommendationAuthorName: string
//     recommendationAuthorTitle: string
// }

import { flaggedEnum } from './enumerations'
import { IUserProfile } from './userProfile'
import { IVenue } from './venue'

export interface IRecommendation {
    id?: number
    imageCDNUrl?: string
    venue: IVenue
    title: string
    content?: string
    createdAt?: string
    createdBy: IUserProfile
    deletedAt?: string
    flagged: flaggedEnum
    updatedAt?: string
}
