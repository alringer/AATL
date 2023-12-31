import { IVenue } from "utilities/types/venue"

export interface IParentRegion {
    alternateName?: string
    city: string
    county?: string
    createdAt?: string
    datasetRanking?: number
    id?: number
    imageCDNUrl?: string
    isActive?: boolean
    iso3Country: string
    latitude: number
    longitude: number
    population: number
    state: string
    updatedAt: string
    stateAbbrevation: string | null
    mostPopularVenues: IVenue[]
    imageUrlMobile: string
    imageUrlTablet: string
    imageUrlDesktop: string
}
export const mockParentRegion: IParentRegion = {
    id: 0,
    city: 'San Diego',
    population: 0,
    isActive: true,
    state: 'CA',
    stateAbbrevation: 'CA',
    iso3Country: 'USA',
    imageCDNUrl: '',
    alternateName: '',
    datasetRanking: 0,
    county: '',
    latitude: 0,
    longitude: 0,
    createdAt: '2020-05-12T16:36:30Z',
    updatedAt: '2020-05-12T16:36:30Z',
    mostPopularVenues: [],
    imageUrlMobile: 'https://static.askatravellocal.com/usa_ca_san-diego_768.jpg',
    imageUrlTablet: 'https://static.askatravellocal.com/usa_ca_san-diego_1440.jpg',
    imageUrlDesktop: 'https://static.askatravellocal.com/usa_ca_san-diego_2560.jpg'
}

export const mockStateList = []
export const mockProvinceList = []

// export const mockStateList: ICity[] = [
//     { name: 'Los Angeles', cityID: 0 },
//     { name: 'San Francisco', cityID: 1 },
//     { name: 'Seattle', cityID: 2 },
//     { name: 'San Diego', cityID: 3 },
//     { name: 'Portland', cityID: 4 },
//     { name: 'San Jose', cityID: 5 },
//     { name: 'Sacramento', cityID: 6 },
//     { name: 'Fresno', cityID: 7 },
//     { name: 'Riverside', cityID: 8 },
//     { name: 'Long Beach', cityID: 9 },
//     { name: 'Oakland', cityID: 10 },
//     { name: 'Bakersfield', cityID: 11 },
//     { name: 'Anchorage', cityID: 12 },
//     { name: 'Spokane', cityID: 13 },
//     { name: 'Honolulu', cityID: 14 },
//     { name: 'Stockton', cityID: 15 },
//     { name: 'Anaheim', cityID: 16 },
//     { name: 'Monterey', cityID: 17 },
//     { name: 'Chicago', cityID: 18 },
//     { name: 'Indianapolis', cityID: 19 },
//     { name: 'Columbus', cityID: 20 },
//     { name: 'Detroit', cityID: 21 },
//     { name: 'Milwaukee', cityID: 22 },
//     { name: 'Kansas City', cityID: 23 },
//     { name: 'Cleveland', cityID: 24 },
//     { name: 'St. Loius', cityID: 25 },
//     { name: 'St. Paul', cityID: 26 },
//     { name: 'Cincinnati', cityID: 27 },
//     { name: 'Toledo', cityID: 28 },
//     { name: 'Lincoln', cityID: 29 },
//     { name: 'Fort Wayne', cityID: 30 },
//     { name: 'Madison', cityID: 31 },
//     { name: 'Aurora', cityID: 32 },
//     { name: 'Grand Rapids', cityID: 33 },
//     { name: 'Akron', cityID: 34 },
//     { name: 'Overland', cityID: 35 },
//     { name: 'Sioux Falls', cityID: 36 },
//     { name: 'Phoenix', cityID: 37 },
//     { name: 'El Paso', cityID: 38 },
//     { name: 'Las Vegas', cityID: 39 },
//     { name: 'Alburquerque', cityID: 40 },
//     { name: 'Tuscon', cityID: 41 },
//     { name: 'Mesa', cityID: 42 },
//     { name: 'Henderson', cityID: 43 },
//     { name: 'Chandler', cityID: 44 },
//     { name: 'Glendale', cityID: 45 },
//     { name: 'Scottsdale', cityID: 46 },
//     { name: 'Santa Fe', cityID: 47 },
//     { name: 'Carlsbad', cityID: 48 },
//     { name: 'Colorado Springs', cityID: 49 },
//     { name: 'Winslow', cityID: 50 },
//     { name: 'Tubac', cityID: 51 },
//     { name: 'Springdale', cityID: 52 },
//     { name: 'Breckenridge', cityID: 53 },
//     { name: 'Holbrook', cityID: 54 },
//     { name: 'Jacksonville', cityID: 55 },
//     { name: 'Charlotte', cityID: 56 },
//     { name: 'Washington', cityID: 57 },
//     { name: 'Nashville', cityID: 58 },
//     { name: 'Memphis', cityID: 59 },
//     { name: 'Baltimore', cityID: 60 },
//     { name: 'Louisville', cityID: 61 },
//     { name: 'Atlanta', cityID: 62 },
//     { name: 'Virginia Beach', cityID: 63 },
//     { name: 'Raleigh', cityID: 64 },
//     { name: 'Miami', cityID: 65 },
//     { name: 'New Orleans', cityID: 66 },
//     { name: 'Tampa', cityID: 67 },
//     { name: 'Lexington', cityID: 68 },
//     { name: 'Greensboro', cityID: 69 },
//     { name: 'Orlando', cityID: 70 },
//     { name: 'Durham', cityID: 71 },
//     { name: 'Saint Petersburg', cityID: 72 },
//     { name: 'Norfolk', cityID: 73 },
//     { name: 'Winston-Salem', cityID: 74 },
//     { name: 'New York', cityID: 75 },
//     { name: 'Philadelphia', cityID: 76 },
//     { name: 'Boston', cityID: 77 },
//     { name: 'Baltimore', cityID: 78 },
//     { name: 'Pittsburg', cityID: 79 },
//     { name: 'Buffalo', cityID: 80 },
//     { name: 'New Haven', cityID: 81 },
//     { name: 'Portland', cityID: 82 },
//     { name: 'Newark', cityID: 83 },
//     { name: 'Washington D.C.', cityID: 84 },
//     { name: 'Hartford', cityID: 85 },
//     { name: 'Rochester', cityID: 86 },
//     { name: 'Albany', cityID: 87 },
//     { name: 'Bridgeport', cityID: 88 },
//     { name: 'Atlantic City', cityID: 89 },
//     { name: 'Harrisburg', cityID: 90 },
//     { name: 'Stamford', cityID: 91 },
//     { name: 'Syracuse', cityID: 92 },
//     { name: 'Lancaster', cityID: 93 },
//     { name: 'Bellefontaine Neighbors', cityID: 94 },
// ]
// export const mockProvinceList: ICity[] = [
//     { name: 'Toronto', cityID: 0 },
//     { name: 'Montreal', cityID: 1 },
//     { name: 'Vancouver', cityID: 2 },
//     { name: 'Calgary', cityID: 3 },
//     { name: 'Edmonton', cityID: 4 },
//     { name: 'Ottawa-Gatineau', cityID: 5 },
//     { name: 'Winnipeg', cityID: 6 },
//     { name: 'Quebec City', cityID: 7 },
//     { name: 'Hamilton', cityID: 8 },
//     { name: 'London', cityID: 9 },
//     { name: 'Victoria', cityID: 10 },
//     { name: 'Halifax', cityID: 11 },
//     { name: 'Oshawa', cityID: 12 },
//     { name: 'Kitchener', cityID: 13 },
//     { name: 'Windsor', cityID: 14 },
// ]
