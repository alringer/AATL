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

export const mockRecommendationListMeta: IRecommendationListMeta = {
    createdAt: '2020-08-17T21:20:26.727535Z',
    deletedAt: null,
    featuredList: {
        id: 7107,
        sortOrder: 2,
        createdAt: '2020-09-28T23:07:11.396190Z',
        updatedAt: '2020-10-01T02:05:45.355180Z',
        deletedAt: null,
    },
    id: 2752,
    imageCDNUrl:
        'https://integration-aatl-recommendation.s3.us-east-2.amazonaws.com/second-list-2752-de9d223e-6819-42a4-aaa5-bfcb92794bef.jpg',
    listOwner: null,
    publishState: null,
    // spotlightedRecommendations: [mockSpotlightedRecommendation],
    subtitle: 'Tasty Sub-Title! Tasty Sub-Title! Tasty Sub-Title! Tasty Sub-Title! Tasty Sub-Title! Tasty Sub-Title!',
    summary:
        'Tasty Description! Tasty Description! Tasty Description! Tasty Description! Tasty Description! Tasty Description! Tasty Description! Tasty Description! Tasty Description! Tasty Description!',
    title: 'Tasty Places! Tasty Places! Tasty Places! Tasty Places! Tasty Places! Tasty Places!',
    updatedAt: '2020-09-28T23:07:11.398415Z',
}
