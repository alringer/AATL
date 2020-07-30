import Axios, { AxiosError, AxiosResponse } from 'axios'
import SnackbarUtils from 'config/SnackbarUtils'
import store from 'store'
import { setIPLocation, setPreferredLocation } from 'store/location/location_actions'
import { ILocationInformation } from 'store/location/location_types'

const API_URL = '/api'
export const BASE_URL = process.env.HOSTNAME + API_URL

// Venue Page
export const FETCH_RESTAURANT = (restaurantID: number, recommendationID?: number) => {
    return `/venues/${restaurantID}${
        recommendationID !== null && recommendationID !== undefined ? `?recommendationId=${recommendationID}` : ''
    }`
}
export const PAGINATE_RECOMMENDATIONS = (restaurantID: number, page: number) => {
    return `/venues/${restaurantID}/recommendations?page=${page}&size=3&sort=createdAt,DESC`
}

export const FETCH_CATEGORIES = '/categories-all'
export const FETCH_TOP_CATEGORIES = '/categories/nearby'
export const FETCH_CITIES = '/parent-regions/active-with-recommendations'
export const FETCH_FOOTER = '/homepage/footer'
export const FETCH_RECOMMENDATION = (id: number) => {
    return `/recommendations/${id}`
}
export const IP_LOOKUP = (ipAddress: string) => {
    return `/experimental/ip-lookup?ipAddress=${ipAddress}`
}
export const SEARCH_AATL_RESTAURANTS = `/restaurants/search`
export const SEARCH_YELP_RESTAURANTS = '/lookup/restaurants'
export const UPLOAD_BLOG = '/blob'
export const POST_RECOMMENDATION = '/recommendations'
export const FETCH_CURRENT_USER_PROFILE = '/me'
export const SUBSCRIBE_MAILCHIMP = '/mailing-list/subscribe'
export const REGISTER_VIEW = (id: number) => {
    return `/venues/${id}/register-view`
}

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
    if (
        (store.getState().locationReducer.ipLocation === null &&
            response.config.headers['X-AATL-Use-IP-Address-As-Location']) === true &&
        !(
            String(response.headers['x-aatl-city']) === undefined &&
            String(response.headers['x-aatl-country']) === undefined &&
            String(response.headers['x-aatl-latitude']) === undefined &&
            String(response.headers['x-aatl-longitude']) === undefined &&
            String(response.headers['x-aatl-state']) === undefined
        )
    ) {
        const payload: ILocationInformation = {
            city: String(response.headers['x-aatl-city']) !== undefined ? String(response.headers['x-aatl-city']) : '',
            country:
                String(response.headers['x-aatl-country']) !== undefined
                    ? String(response.headers['x-aatl-country'])
                    : '',
            lat:
                String(response.headers['x-aatl-latitude']) !== undefined
                    ? String(response.headers['x-aatl-latitude'])
                    : '',
            lng:
                String(response.headers['x-aatl-longitude']) !== undefined
                    ? String(response.headers['x-aatl-longitude'])
                    : '',
            state:
                String(response.headers['x-aatl-state']) !== undefined ? String(response.headers['x-aatl-state']) : '',
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
