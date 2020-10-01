import { IPageable } from 'utilities/types/pageable'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'
import { IVenue } from 'utilities/types/venue'

export interface IHomepage {
    newRecommendations: IPageable
    featuredRecommendationsLists: IRecommendationListMeta[]
    recommendedNearby: IVenue[]
    haveYouBeenTo: IVenue[]
}
