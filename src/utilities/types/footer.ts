import { ICategory } from '../types/category'
import { IParentRegion } from '../types/parentRegion'

export interface IFooter {
    mostRecommendedCategories: ICategory[]
    mostRecommendedParentRegions: IParentRegion[]
}
