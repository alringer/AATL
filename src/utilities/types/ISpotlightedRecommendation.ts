import { flaggedEnum } from './enumerations'
import { IRecommendation } from './recommendation'
import { IRecommendationListMeta } from './recommendationListMeta'

export interface ISpotlightedRecommendation {
    content?: string
    createdAt?: string
    flagged: flaggedEnum
    id?: number
    imageCDNUrl?: string
    originalRecommendation?: IRecommendation
    recommendationListMeta: IRecommendationListMeta
    sortOrder?: number
    title: string
    updatedAt?: string
}
