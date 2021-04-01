export interface IRecommendationListMetaDetail {
    id: number
    title: string
    subtitle: string
    summary: string
    imageCDNUrl: string
    createdAt: string
    updatedAt: string
    recommendationsCount: number
    venuesCount: number
    isFeatured: boolean
}

export const mockRecommendationListMetaDetail: IRecommendationListMetaDetail = {
    id: 2,
    title: 'Tasty List! Tasty List! Tasty List! Tasty List! Tasty List! Tasty List! Tasty List! Tasty List! Tasty List! Tasty List! Tasty List! Tasty List! Tasty List! Tasty List! ',
    subtitle: 'Tasty Sub-title! Tasty Sub-title! Tasty Sub-title! Tasty Sub-title! Tasty Sub-title! Tasty Sub-title! Tasty Sub-title! Tasty Sub-title! Tasty Sub-title! ',
    summary: 'Tasty Summary! Tasty Summary! Tasty Summary! Tasty Summary! Tasty Summary! Tasty Summary! Tasty Summary! Tasty Summary! Tasty Summary! Tasty Summary! Tasty Summary! Tasty Summary! ',
    imageCDNUrl: '',
    createdAt: '',
    updatedAt: '',
    recommendationsCount: 1200,
    venuesCount: 1200,
    isFeatured: true,
}