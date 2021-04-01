export interface IByCity {
    id: number
    city: string
    count: number
}

export interface IByCityWithUniqueID extends IByCity {
    uniqueListID: number
}
