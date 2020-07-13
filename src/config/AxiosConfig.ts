import Axios, { AxiosError, AxiosResponse } from 'axios'

// const API_URL = '/services/askatravellocal/api'
const API_URL = '/api'
export const BASE_URL = process.env.HOSTNAME + API_URL

export const FETCH_CATEGORIES = '/categories-all'
export const FETCH_CITIES = '/parent-regions-all-active'
export const FETCH_FOOTER = '/homepage/footer'
export const LOAD_RESTAURANTS = '/lookup/restaurants/load'
export const FETCH_RESTAURANT = (id: number) => {
    return `/venues/${id}`
}
export const IP_LOOKUP = (ipAddress: string) => {
    return `/experimental/ip-lookup?ipAddress=${ipAddress}`
}
export const SEARCH_AATL_RESTAURANTS = `/restaurants/search`

const axiosInstance = Axios.create({
    baseURL: BASE_URL,
})

const requestInterceptor = (config: any = {}) => {
    // console.log('Request: ', config)
    // if (authStore.getState().keycloak && authStore.getState().keycloak.token) {
    //     config.headers.Authorization = `Bearer ${authStore.getState().keycloak.token}`
    // }
    return config
}

const responseInterceptor = (response: AxiosResponse) => {
    // console.log('Response: ', response)
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
    // console.log('Error: ', error)
    return Promise.reject(error)
}

axiosInstance.interceptors.request.use(requestInterceptor)
axiosInstance.interceptors.response.use(responseInterceptor, responseInterceptorError)

const axios = axiosInstance

export default axios
