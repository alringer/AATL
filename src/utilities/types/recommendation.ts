// export interface IRecommendation {
//     recommendationID: number
//     recommendationImage: string
//     placeName: string
//     placeAddress: string
//     placeCategories: string[]
//     recommendationTitle: string
//     recommendationDescription: string
//     recommendationAuthorName: string
//     recommendationAuthorTitle: string
// }

import { flaggedEnum } from './enumerations'
import { IUserProfile, mockUser } from './userProfile'
import { IVenue } from './venue'

export interface IRecommendation {
    id?: number
    imageCDNUrl?: string
    venue: IVenue
    title: string
    content?: string
    createdAt?: string
    createdBy: IUserProfile
    deletedAt?: string
    flagged: flaggedEnum
    updatedAt?: string
}

export const mockRecommendation: IRecommendation = {
    id: 5701,
    title: 'Chicken here is really good!',
    flagged: flaggedEnum.None,
    imageCDNUrl:
        'https://integration-aatl-recommendation.s3.us-east-2.amazonaws.com/Chicken-here-is-really-good-5701-e530eec9-16d6-4253-9899-5de8b27ce2b8.jpg',
    createdAt: '2020-07-24T18:22:11.699120Z',
    updatedAt: '2020-07-24T18:22:12.355319Z',
    deletedAt: null,
    content:
        'This restaurant is situated in the heart of semi-urban area between three lakes and close to the motorsports academy near Gurgaon. It is the favorite hangout place for motor sports lovers.\n\nAs you step your foot into the restaurant, you are welcomed by the magnificent urban setting, a beautiful combination of vintage sports cars and an immense luxury of modernity. Every table gives you a clear view of the chef working in the kitchen. Those, with no prior reservation, are welcomed to wait in the lounge with comfortable armchairs. The lounge has pictures of sports player displayed on the wall.',
    venue: {
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
        id: 5551,
        name: 'Cross Street Chicken and Beer',
        imageCDNUrl:
            'https://integration-aatl-venue.s3.us-east-2.amazonaws.com/Cross-Street-Chicken-and-Beer-5551-ac31d86f-2448-4526-ab8c-f98cd763a893.jpg',
        websiteURL: null,
        formattedAddress: '4403 Convoy St,San Diego,CA,US',
        openTableID: null,
        sourcePlaceId: 'Ve1N_Y3lwtI4UYwDvUEtZg',
        streetNumber: null,
        street: '4403 Convoy St, ',
        neighborhood: null,
        locality: 'San Diego',
        county: null,
        state: 'CA',
        postalCode: '92111',
        iso3Country: 'USA',
        latitude: 32.820203,
        longitude: -117.154722,
        phoneNumFormatted: '(858) 430-6001',
        venuetype: 'Restaurant',
        flagged: 'None',
        source: 'Yelp',
        createdAt: '2020-07-24T15:50:55.168343Z',
        updatedAt: '2020-07-24T15:50:58.296028Z',
        deletedAt: null,
        content: null,
        categories: null,
        similarVenues: null,
        recommendations: null,
        parentRegion: {
            id: 8,
            city: 'San Diego',
            population: 1355896,
            isActive: true,
            state: 'California',
            iso3Country: 'USA',
            imageCDNUrl: null,
            alternateName: null,
            datasetRanking: 8,
            county: null,
            latitude: 32.715738,
            longitude: -117.1610838,
            createdAt: '2020-05-13T21:17:55.073902Z',
            updatedAt: '2020-05-13T21:17:55.073902Z',
            stateAbbrevation: 'CA',
        },
        firstRecommendedBy: {
            id: 1051,
            userId: '4c973896-5761-41fc-8217-07c5d13a004b',
            username: 'admin',
            firstName: 'Admin',
            lastName: 'Administrator',
            email: 'admin@localhost',
            userByLine: null,
            instagramId: null,
            imageCDNUrl: null,
            activated: true,
            createdAt: null,
            updatedAt: null,
            deletedAt: null,
            content: '',
        },
    },
    createdBy: {
        id: 1051,
        userId: '4c973896-5761-41fc-8217-07c5d13a004b',
        username: 'admin',
        firstName: 'Admin',
        lastName: 'Administrator',
        email: 'admin@localhost',
        userByLine: null,
        instagramId: null,
        imageCDNUrl: null,
        activated: true,
        createdAt: null,
        updatedAt: null,
        deletedAt: null,
        content: '',
        venues: [],
        recommendations: [],
        recommendationListMetas: null,
        userBadges: null,
        configurationAudits: null,
    },
}
