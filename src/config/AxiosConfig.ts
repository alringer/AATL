import Axios, { AxiosError, AxiosResponse } from 'axios'
import SnackbarUtils from 'config/SnackbarUtils'
import store from 'store'
import { setIPLocation, setPreferredLocation } from 'store/location/location_actions'
import { ILocationInformation } from 'store/location/location_types'

const API_URL = '/api'
export const BASE_URL = process.env.HOSTNAME + API_URL

// Home Page
export const FETCH_HOME = '/homepage'
export const FETCH_FOOTER = '/homepage/footer'

// Cities Page
export const FETCH_CITIES = '/parent-regions/active-with-recommendations'

// Food and Drinks Page
export const FETCH_CATEGORIES = '/categories-all'

// Venue Page
export const REGISTER_VIEW = (id: number) => {
    return `/venues/${id}/register-view`
}
export const FETCH_RESTAURANT = (restaurantID: number, recommendationID?: number) => {
    return `/venues/${restaurantID}${
        recommendationID !== null && recommendationID !== undefined ? `?recommendationId=${recommendationID}` : ''
    }`
}
export const PAGINATE_RECOMMENDATIONS = (restaurantID: number, page: number) => {
    return `/venues/${restaurantID}/recommendations?page=${page}&size=3&sort=createdAt,DESC`
}

export const FETCH_RECOMMENDATION = (id: number) => {
    return `/recommendations/${id}`
}
export const IP_LOOKUP = (ipAddress: string) => {
    return `/experimental/ip-lookup?ipAddress=${ipAddress}`
}

// Search Page
export const FETCH_TOP_CATEGORIES = '/categories/nearby'
export const SEARCH_AATL_RESTAURANTS = `/restaurants/search`
export const SEARCH_YELP_RESTAURANTS = '/lookup/restaurants'

// MailChimp
export const SUBSCRIBE_MAILCHIMP = '/mailing-list/subscribe'

// Write Recommendation
export const POST_RECOMMENDATION = '/recommendations'

// Venue List Metas
export const VENUE_LIST = `/venue-list-metas`
export const FETCH_VENUE_LISTS = (createdById: number) => {
    return `/venue-list-metas?createdById.equals=${createdById}`
}

export const FETCH_VENUE_LIST_METAS_BY_ID = (venueListMetaId: number) => {
    return `/venue-list-metas/${venueListMetaId}`
}

export const FETCH_VENUES_IN_VENUE_LIST_META = (listID: number, page: number) => {
    return `/venues?venueListMetaId.equals=${listID}&page=${page}&size=10&sort=createdAt,DESC`
}

export const FETCH_VENUE_LISTS_BY_CATEGORY = (createdById: number) => {
    return `/venue-list-metas/by-category?createdById.equals=${createdById}`
}

export const FETCH_VENUE_LIST_CATEGORY = (listID: number, createdById: number, page: number) => {
    return `/venue-list-metas/by-category/${listID}?createdById.equals=${createdById}&page=${page}`
}

export const FETCH_VENUE_LISTS_BY_CITY = (createdById: number) => {
    return `/venue-list-metas/by-parent-region?createdById.equals=${createdById}`
}

export const FETCH_VENUE_LIST_CITY = (listID: number, createdById: number, page: number) => {
    return `/venue-list-metas/by-parent-region/${listID}?createdById.equals=${createdById}&page=${page}`
}

export const DELETE_VENUE_LIST = (venueListMetaID: number) => {
    return `/venue-list-metas/${venueListMetaID}`
}

export const DELETE_VENUE_FROM_LIST = (venueListMetaID: number, venueID: number) => {
    return `/venue-list-metas/${venueListMetaID}/venues/${venueID}`
}

export const POST_NEW_VENUE = (venueListID: number) => {
    return `/venue-list-metas/${venueListID}/venues`
}

// Recommendation List Metas
export const RECOMMENDATION_LIST_METAS = `/recommendation-list-metas`
export const RECOMMENDATION_LIST_META_WITH_ID = (recommendationListMetaID: number) => {
    return `/recommendation-list-metas/${recommendationListMetaID}`
}
export const RECOMMENDATION_LIST_SPOTLIGHTED_RECOMMENDATION = (
    recommendationListMetaID: number,
    recommendationID: number
) => {
    return `/recommendation-list-metas/${recommendationListMetaID}/recommendations/${recommendationID}`
}
export const FEATURE_LIST = (recommendationListMetaId: number) => {
    return `/recommendation-list-metas/${recommendationListMetaId}/featured-list`
}

// Featured List
export const FEATURED_LISTS = `/featured-lists`

// User Profile
export const USER_PROFILE = `/user-profiles`
export const FETCH_CURRENT_USER_PROFILE = '/me'
export const FETCH_USER_PROFILE = (userID: number) => {
    return `/user-profiles/${userID}`
}
export const FETCH_USER_RECOMMENDATIONS = (userID: number, page: number) => {
    return `/user-profiles/${userID}/recommendations?page=${page}&size=10&sort=createdAt,DESC`
}

// Image Upload
export const UPLOAD_BLOB = '/blob'

const axiosInstance = Axios.create({
    baseURL: BASE_URL,
})

const fetchIPAddress = () => {
    return fetch('https://api.ipify.org?format=jsonp?callback=?', {
        method: 'GET',
        headers: {},
    })
        .then((res) => res.text())
        .then((ip) => {
            return ip
        })
        .catch((err) => {
            console.log(err)
            return ''
        })
}

const requestInterceptor = async (config: any = {}) => {
    if (store.getState().locationReducer.ipLocation === null) {
        const clientIP = await fetchIPAddress()
        config.headers['X-AATL-Use-IP-Address-As-Location'] = true
        config.headers['X-Forwarded-For'] = clientIP
    }
    return config
}

const responseInterceptor = (response: AxiosResponse) => {
    // console.log('Response in the Interceptor: ', response)
    // console.log('City attribute in the header: ', response.headers['x-aatl-city'])
    // console.log('Typeof City attribute in the header: ', typeof response.headers['x-aatl-city'])
    if (
        (store.getState().locationReducer.ipLocation === null &&
            response.config.headers['X-AATL-Use-IP-Address-As-Location']) === true &&
        !(
            response.headers['x-aatl-city'] === undefined &&
            response.headers['x-aatl-country'] === undefined &&
            response.headers['x-aatl-latitude'] === undefined &&
            response.headers['x-aatl-longitude'] === undefined &&
            response.headers['x-aatl-state'] === undefined
        )
    ) {
        const payload: ILocationInformation = {
            city: response.headers['x-aatl-city'] !== undefined ? String(response.headers['x-aatl-city']) : '',
            country: response.headers['x-aatl-country'] !== undefined ? String(response.headers['x-aatl-country']) : '',
            lat: response.headers['x-aatl-latitude'] !== undefined ? String(response.headers['x-aatl-latitude']) : '',
            lng: response.headers['x-aatl-longitude'] !== undefined ? String(response.headers['x-aatl-longitude']) : '',
            state: response.headers['x-aatl-state'] !== undefined ? String(response.headers['x-aatl-state']) : '',
        }
        store.dispatch(setIPLocation(payload))
        store.dispatch(setPreferredLocation(payload))
    }
    return response
}

const responseInterceptorError = (error: AxiosError) => {
    // TODO: Handle error responses
    // if (_.get(error, 'response.status', null) === 403) {
    //     SnackbarUtils.error(B.SNACKBAR_MESSAGES.EXPIRED_TOKEN)
    // } else if (_.get(error, 'response.status', null) === 401) {
    //     SnackbarUtils.error(B.SNACKBAR_MESSAGES.LOGIN)
    // } else {
    //     SnackbarUtils.error(error.message)
    // }
    // TODO: Delete the error toast below. This is only for development purposes
    SnackbarUtils.error(error)
    return Promise.reject(error)
}

axiosInstance.interceptors.request.use(requestInterceptor)
axiosInstance.interceptors.response.use(responseInterceptor, responseInterceptorError)

const axios = axiosInstance

export default axios
