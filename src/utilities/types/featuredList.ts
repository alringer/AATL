import { IRecommendationListMeta } from './recommendationListMeta'

export interface IFeaturedList {
    createdAt: string
    deletedAt: string
    id: number
    recommendationListMetas: IRecommendationListMeta[]
    sortOrder: number
    updatedAt: string
}
