export enum SortEnum {
    MostRecommended = 'MOST_RECOMMENDED',
    RecentlyRecommended = 'RECENTLY_RECOMMENDED',
    Trending = 'TRENDING',
    Newest = 'NEWEST',
    BestRated = 'BEST_RATED',
}

export interface SortOption {
    label: string
    value: SortEnum
}
export const sortOptions: SortOption[] = [
    { label: 'BEST RATED', value: SortEnum.BestRated },
    { label: 'MOST RECOMMENDED', value: SortEnum.MostRecommended },
    { label: 'RECENTLY RECOMMENDED', value: SortEnum.RecentlyRecommended },
    { label: 'TRENDING', value: SortEnum.Trending },
    { label: 'NEWEST', value: SortEnum.Newest },
]

export const sortOptionsMapper = {
    [SortEnum.BestRated]: SortEnum[SortEnum.BestRated],
    [SortEnum.MostRecommended]: SortEnum[SortEnum.MostRecommended],
    [SortEnum.RecentlyRecommended]: SortEnum[SortEnum.RecentlyRecommended],
    [SortEnum.Trending]: SortEnum[SortEnum.Trending],
    [SortEnum.Newest]: SortEnum[SortEnum.Newest],
}
