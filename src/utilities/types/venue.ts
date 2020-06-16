import { ICategory, mockCategoryList } from './category'
import { flaggedEnum, sourceEnum, venueTypeEnum } from './enumerations'
import { IParentRegion, mockParentRegion } from './parentRegion'
import { IRecommendation } from './recommendation'
import { IUserProfile } from './userProfile'
import { IVenueListMeta } from './venueListMeta'
import { IVenueView } from './venueView'

export interface IVenue {
    content?: string
    county?: string
    createdAt?: string
    deletedAt?: string
    firstRecommendedBy: IUserProfile
    flagged: flaggedEnum
    formattedAddress?: string
    id?: number
    categories: ICategory[]
    imageCDNUrl?: string
    iso3Country?: string
    latitude?: number
    locality?: string
    longitude?: number
    name: string
    neighborhood?: string
    openTableID?: string
    parentRegion?: IParentRegion
    phoneNumFormatted?: string
    postalCode?: string
    recommendations?: IRecommendation
    source: sourceEnum
    sourcePlaceId?: string
    state?: string
    street?: string
    streetNumber?: string
    updatedAt?: string
    venueListMeta: IVenueListMeta
    venueViews?: IVenueView[]
    venuetype?: venueTypeEnum
    websiteURL?: string
}

export const mockVenue: IVenue = {
    id: 13,
    name: 'Disneyland',
    imageCDNUrl: '',
    websiteURL: '',
    formattedAddress: '',
    openTableID: '',
    sourcePlaceId: '',
    streetNumber: '',
    street: '',
    neighborhood: '',
    locality: '',
    county: '',
    state: '',
    postalCode: '',
    iso3Country: '',
    latitude: 30.1588129,
    longitude: -85.6602058,
    phoneNumFormatted: '',
    venuetype: null,
    flagged: flaggedEnum.None,
    source: sourceEnum.Yelp,
    createdAt: '2020-05-12T16:34:36Z',
    updatedAt: '2020-05-12T16:34:36Z',
    deletedAt: '2020-05-12T16:34:36Z',
    content: 'foo',
    venueViews: null,
    recommendations: null,
    categories: mockCategoryList.slice(0, 3),
    parentRegion: mockParentRegion,
    firstRecommendedBy: {
        id: 4,
        userId: 4,
        username: 'user',
        fullname: 'user',
        userByLine: 'Thing about me',
        instagramId: 'insta-id',
        imageCDNUrl: null,
        createdAt: '2020-05-28T18:35:05.180741Z',
        updatedAt: '2020-05-28T18:35:05.180741Z',
        deletedAt: null,
        content: 'Content',
        recommendations: null,
        recommendationListMetas: null,
        userBadges: null,
        configurationAudits: null,
    },
    venueListMeta: {
        id: 0,
        title: 'Sample Venue List',
        summary: 'Sample Venue List Content',
        createdAt: '2020-05-28T11:31:20Z',
        updatedAt: '2020-05-28T11:31:20Z',
        deletedAt: '2020-05-28T11:31:20Z',
    },
}
