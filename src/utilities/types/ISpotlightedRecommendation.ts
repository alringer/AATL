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
    recommendationListMeta?: IRecommendationListMeta
    sortOrder?: number
    title: string
    updatedAt?: string
}

export const mockSpotlightedRecommendation: ISpotlightedRecommendation = {
    content: 'I definitely recommend their lunch menues!',
    createdAt: '2020-08-24T21:42:59.329319Z',
    flagged: flaggedEnum.None,
    id: 5009,
    imageCDNUrl:
        'https://integration-aatl-recommendation.s3.us-east-2.amazonaws.com/Best-Ramen-Restaurant-in-Convoy-2402-f686ad3e-c521-4b3d-84e4-f662de6591c3.jpg',
    originalRecommendation: null,
    // recommendationListMeta: mockRecommendationListMeta,
    sortOrder: null,
    title: 'Best Ramen Restaurant in Convoy',
    updatedAt: '2020-08-24T21:42:59.329319Z',
}
