import { publishedStateEnum } from './enumerations'
import { IFeaturedList } from './featuredList'
import { ISpotlightedRecommendation } from './ISpotlightedRecommendation'

export interface IRecommendationListMeta {
    createdAt?: string
    deletedAt?: string
    featuredList?: IFeaturedList
    id: number
    imageCDNUrl?: string
    listOwner: any // TODO: Type this strictly
    publishState?: publishedStateEnum
    spotlightedRecommendations?: ISpotlightedRecommendation[]
    subtitle?: string
    summary?: string
    title?: string
    updatedAt?: string
}
