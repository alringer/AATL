import { IConfigurationAudit } from './configurationAudit'
import { IRecommendation } from './recommendation'
import { IRecommendationListMeta } from './recommendationListMeta'
import { IUserBadge } from './userBadge'
import { IVenue } from './venue'

export interface IUserProfile {
    configurationAudits?: IConfigurationAudit[]
    content?: string
    createdAt?: string
    deletedAt?: string
    fullname?: string
    id?: number
    imageCDNUrl?: string
    instagramId?: string
    recommendationListMetas?: IRecommendationListMeta[]
    recommendations?: IRecommendation[]
    updatedAt?: string
    userBadges?: IUserBadge[]
    userByLine?: string
    userId: number
    username: string
    venues?: IVenue[]
}

export const mockUser: IUserProfile = {
    id: 4,
    userId: 4,
    username: 'user',
    fullname: 'user',
    userByLine: 'Thing about me',
    instagramId: 'insta-id',
    imageCDNUrl: null,
    createdAt: '2020-05-28T18:35:05.180741Z',
    updatedAt: '2020-05-28T18:35:05.180741Z',
    deletedAt: null,
    content: 'Content',
    recommendations: null,
    recommendationListMetas: null,
    userBadges: null,
    configurationAudits: null,
}
