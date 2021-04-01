import { flaggedEnum, sourceEnum } from 'utilities/types/enumerations'
import { IUserProfile, mockUser } from 'utilities/types/userProfile'
import { ICategory } from './category'
import { IParentRegion } from './parentRegion'
import { IRecommendation } from './recommendation'

// export interface IVenue {
//     content?: string
//     county?: string
//     createdAt?: string
//     deletedAt?: string
//     firstRecommendedBy: IUserProfile
//     flagged: flaggedEnum
//     formattedAddress?: string
//     id?: number
//     categories: ICategory[]
//     imageCDNUrl?: string
//     iso3Country?: string
//     latitude?: number
//     locality?: string
//     longitude?: number
//     name: string
//     neighborhood?: string
//     openTableID?: string
//     parentRegion?: IParentRegion
//     phoneNumFormatted?: string
//     postalCode?: string
//     recommendations?: IRecommendation
//     source: sourceEnum
//     sourcePlaceId?: string
//     state?: string
//     street?: string
//     streetNumber?: string
//     updatedAt?: string
//     venueListMeta: IVenueMetaList
//     venueViews?: IVenueView[]
//     venuetype?: venueTypeEnum
//     websiteURL?: string
// }

export interface IVenue {
    id: number
    name: string
    imageCDNUrl: string
    websiteURL: string | null
    formattedAddress: string
    openTableID: number | null
    sourcePlaceId: string
    streetNumber: number | null
    street: string
    neighborhood: string | null
    locality: string
    county: string | null
    state: string
    postalCode: string
    iso3Country: string
    latitude: number
    longitude: number
    phoneNumFormatted: string
    venuetype: string
    flagged: string
    source: string
    createdAt: string | null
    updatedAt: string | null
    deletedAt: string | null
    content: null
    parentRegion: IParentRegion
    firstRecommendedBy: {
        id: number
        userId: string
        username: string
        firstName: string
        lastName: string
        email: string
        userByLine: string
        instagramId: string
        imageCDNUrl: string
        activated: boolean
        createdAt: string
        updatedAt: string
        deletedAt: string | null
        content: string
    }
    categories: ICategory[]
    similarVenues: IVenue[]
    recommendations: {
        pageNumber: number
        pageSize: number
        totalCount: number
        items: any[]
    }
    latestRecommendation: {
        content: string
        createdAt: string
        createdBy: IUserProfile
        deletedAt: string
        flagged: flaggedEnum
        id: number
        imageCDNUrl: string
        title: string
        updatedAt: string
        venue: IVenue
    }
}

export interface IVenueRecommendationsInformation {
    pageNumber: number
    pageSize: number
    totalCount: number
    items: IRecommendation[]
}

export const mockVenue: IVenue = {
    id: 1101,
    name: 'OEBOEBOEBOEBOEBOEBOEBOEBOEBOEBOEBOEBOEBOEBOEBOEBOEBOEBOEBOEB',
    imageCDNUrl: 'https://s3-media2.fl.yelpcdn.com/bphoto/GAoU-rXVso7GDwSm4C1B2A/o.jpg',
    websiteURL: null,
    formattedAddress: '825 1 Avenue NE,Calgary,AB,CA 825 1 Avenue NE,Calgary,AB,CA 825 1 Avenue NE,Calgary,AB,CA',
    openTableID: null,
    sourcePlaceId: '5aK167zvZhGs_i7Vf4A1NQ',
    streetNumber: null,
    street: '825 1 Avenue NE, ',
    neighborhood: null,
    locality: 'Calgary',
    county: null,
    state: 'AB',
    postalCode: 'T2E 0C4',
    iso3Country: 'CAN',
    latitude: 51.0530851,
    longitude: -114.0439947,
    phoneNumFormatted: '+1 403-278-3447',
    venuetype: 'Restaurant',
    flagged: 'None',
    source: 'Yelp',
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
    content: null,
    parentRegion: {
        id: 1003,
        city: 'Calgary',
        population: 915322,
        isActive: true,
        state: 'Alberta',
        iso3Country: 'CAN',
        imageCDNUrl: null,
        alternateName: null,
        datasetRanking: 3,
        county: null,
        latitude: 51.083333,
        longitude: -114.083333,
        createdAt: '2020-05-13T21:19:23.669794Z',
        updatedAt: '2020-05-13T21:19:23.669794Z',
        stateAbbrevation: 'AB',
        mostPopularVenues: [],
        imageUrlDesktop: '',
        imageUrlTablet: '',
        imageUrlMobile: '',
    },
    firstRecommendedBy: {
        id: 1,
        userId: '220a4da0-c22d-11ea-ae04-0242ac120002',
        username: 'system',
        firstName: 'System',
        lastName: 'System',
        email: 'system@system.com',
        userByLine: '',
        instagramId: '',
        imageCDNUrl: '',
        activated: true,
        createdAt: '2020-07-09T14:42:48.832389Z',
        updatedAt: '2020-07-09T14:42:48.832389Z',
        deletedAt: null,
        content: '',
    },
    categories: [
        { tagName: 'Albanian', longName: 'Albanian', id: 1, source: sourceEnum.Yelp, sourceId: null },
        { tagName: 'Argentine', longName: 'Argentine', id: 2, source: sourceEnum.Yelp, sourceId: null },
        { tagName: 'Andhra', longName: 'Andhra', id: 3, source: sourceEnum.Yelp, sourceId: null },
        { tagName: 'Andhra', longName: 'Andhra', id: 3, source: sourceEnum.Yelp, sourceId: null },
        { tagName: 'Andhra', longName: 'Andhra', id: 3, source: sourceEnum.Yelp, sourceId: null },
        { tagName: 'Andhra', longName: 'Andhra', id: 3, source: sourceEnum.Yelp, sourceId: null },
        { tagName: 'Andhra', longName: 'Andhra', id: 3, source: sourceEnum.Yelp, sourceId: null },
        { tagName: 'Andhra', longName: 'Andhra', id: 3, source: sourceEnum.Yelp, sourceId: null },
        { tagName: 'Andhra', longName: 'Andhra', id: 3, source: sourceEnum.Yelp, sourceId: null },
        { tagName: 'Andhra', longName: 'Andhra', id: 3, source: sourceEnum.Yelp, sourceId: null },
        { tagName: 'Andhra', longName: 'Andhra', id: 3, source: sourceEnum.Yelp, sourceId: null },
        { tagName: 'Andhra', longName: 'Andhra', id: 3, source: sourceEnum.Yelp, sourceId: null },
        { tagName: 'Andhra', longName: 'Andhra', id: 3, source: sourceEnum.Yelp, sourceId: null },
    ],
    similarVenues: [],
    recommendations: { pageNumber: 0, pageSize: 3, totalCount: 5, items: [Array] },
    latestRecommendation: {
        content:
            'This is an awesome recommendation! This is an awesome recommendation! This is an awesome recommendation! This is an awesome recommendation! This is an awesome recommendation! This is an awesome recommendation! This is an awesome recommendation! This is an awesome recommendation! This is an awesome recommendation! This is an awesome recommendation! This is an awesome recommendation! This is an awesome recommendation!',
        createdAt: '2020-07-09T14:42:48.832389Z',
        createdBy: mockUser,
        deletedAt: null,
        flagged: flaggedEnum.None,
        id: 2401,
        imageCDNUrl: 'https://s3-media2.fl.yelpcdn.com/bphoto/GAoU-rXVso7GDwSm4C1B2A/o.jpg',
        title:
            'Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place! Awesome Place!',
        updatedAt: '2020-07-09T14:42:48.832389Z',
        venue: null,
    },
}
