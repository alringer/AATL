import { flaggedEnum, sourceEnum, venueTypeEnum } from './enumerations'
import { IParentRegion } from './parentRegion'
import { IRecommendation } from './recommendation'
import { IUserProfile } from './userProfile'
import { IVenueListMeta } from './venueListMeta'
import { IVenueView } from './venueView'

export interface IVenue {
    content?: string
    county?: string
    createdAt?: string
    deletedAt?: string
    firstRecommendedBy: IUserProfile
    flagged: flaggedEnum
    formattedAddress?: string
    id?: number
    imageCDNUrl?: string
    iso3Country?: string
    latitude?: number
    locality?: string
    longitude?: number
    name: string
    neighborhood?: string
    openTableID?: string
    parentRegion?: IParentRegion
    phoneNumFormatted?: string
    postalCode?: string
    recommendations?: IRecommendation
    source: sourceEnum
    sourcePlaceId?: string
    state?: string
    street?: string
    streetNumber?: string
    updatedAt?: string
    venueListMeta: IVenueListMeta
    venueViews?: IVenueView[]
    venuetype?: venueTypeEnum
    websiteURL?: string
}
