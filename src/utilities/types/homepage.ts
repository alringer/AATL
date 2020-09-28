import { IRecommendation } from 'utilities/types/recommendation'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'
import { IVenue } from 'utilities/types/venue'

export interface IHomepage {
    newRecommendations: IRecommendation[]
    featuredRecommendationsLists: IRecommendationListMeta[]
    recommendedNearby: IVenue[]
    haveYouBeenTo: IVenue[]
}
