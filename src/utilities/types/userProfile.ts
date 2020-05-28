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
