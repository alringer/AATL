// export interface IUserProfile {
//     configurationAudits?: IConfigurationAudit[]
//     content?: string
//     createdAt?: string
//     deletedAt?: string
//     email?: string
//     firstName?: string
//     lastName?: string
//     id?: number
//     imageCDNUrl?: string
//     instagramId?: string
//     recommendationListMetas?: IRecommendationListMeta[]
//     recommendations?: IRecommendation[]
//     updatedAt?: string
//     userBadges?: IUserBadge[]
//     userByLine?: string
//     userId: number
//     username: string
//     venues?: IVenue[]
// }

import { IRecommendation } from './recommendation'
import { IVenue } from './venue'

export interface IUserProfile {
    activated: boolean | null
    content: string | null
    createdAt: string | null
    deletedAt: string | null
    email: string | null
    firstName: string | null
    id: number | null
    imageCDNUrl: string | null
    instagramId: string | null
    instagramToken: string | null
    lastName: string | null
    updatedAt: string | null
    userByLine: string | null
    userId: string | null
    username: string | null
    venues: IVenue[] | null
    recommendations: IRecommendation[] | null
    recommendationListMetas: null
    userBadges: null
    configurationAudits: null
}

export const mockUser: IUserProfile = {
    activated: true,
    content: '',
    createdAt: null,
    deletedAt: null,
    email: 'admin@localhost',
    firstName: 'Admin',
    id: 1051,
    imageCDNUrl: null,
    instagramId: null,
    instagramToken: null,
    lastName: 'Administrator Administrator Administrator Administrator Administrator',
    updatedAt: null,
    userByLine:
        'Foodie/Journalist/Software Engineer/Writer/Author/Thinker/Receiver/Kicker/Goal Keeper/Narrator/Protagonist/Antagonist',
    userId: '4c973896-5761-41fc-8217-07c5d13a004b',
    username: 'admin',
    venues: null,
    recommendations: null,
    recommendationListMetas: null,
    userBadges: null,
    configurationAudits: null,
}
