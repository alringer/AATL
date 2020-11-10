import { IRecommendation } from "utilities/types/recommendation";
import { IUserProfile } from "utilities/types/userProfile";

export interface IFlaggedRecommendation {
    id: number
    reason: string
    isPending: boolean
    date: Date
    recommendation: IRecommendation
    flaggedBy: IUserProfile
}