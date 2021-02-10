import { IRecommendation } from 'utilities/types/recommendation'
import { IUserProfile } from 'utilities/types/userProfile'

export interface IFlaggedRecommendation {
    id: number
    reason: string
    isPending: boolean
    date: Date
    recommendation: IRecommendation
    flaggedBy: IUserProfile
}

export enum IFlaggedRecommendationSort {
    dateAsc = 'date,ASC',
    dateDesc = 'date,DESC',
    authorAsc = 'recommendation.createdBy.firstName,ASC',
    authorDesc = 'recommendation.createdBy.firstName,DESC',
    reporterAsc = 'flaggedBy.firstName,ASC',
    reporterDesc = 'flaggedBy.firstName,DESC',
}
