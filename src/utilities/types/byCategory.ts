import { ICategory } from './category'

export interface IByCategory extends ICategory {
    venueCount: number
}

export interface IByCategoryWithUniqueID extends IByCategory {
    uniqueListID: number
}
