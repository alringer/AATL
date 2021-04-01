export interface IAdminCity {
    id: number
    city: string
    state: string
    imageUrlDesktop: string | null
    imageUrlTablet: string | null
    imageUrlMobile: string | null
    venuesCount: number
    recommendationsCount: number
}
