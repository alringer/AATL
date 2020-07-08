import Axios, { AxiosError, AxiosResponse } from 'axios'

const API_URL = '/services/askatravellocal/api'
export const BASE_URL = process.env.HOSTNAME + API_URL
// Categories
// export const FETCH_CATEGORIES = '/categories?size=1000&sort=id%2Casc'
export const FETCH_CATEGORIES = '/categories-all'
export const FETCH_CITIES = '/parent-regions-all-active'
export const FETCH_FOOTER = '/homepage/footer'
export const IP_LOOKUP = (ipAddress: string) => {
    return `/experimental/ip-lookup?ipAddress=${ipAddress}`
}
// export const PATIENT_PAYER_CARD_GET = (id: number, fileName: string) => {
//     return `patients/${id}/payers/cards/${fileName}`
// }

const axiosInstance = Axios.create({
    baseURL: BASE_URL,
})

const requestInterceptor = (config: any = {}) => {
    // TODO: Handle authorization bearer token
    // if (!isSkipAuthEnabled(config)) {
    //     const state = auth.getState()
    //     if (state.accessToken) {
    //         config.headers.Authorization = `Bearer ${state.accessToken}`
    //     }
    // }
    console.log('Request: ', config)
    return config
}

const responseInterceptor = (response: AxiosResponse) => {
    console.log('Response: ', response)
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
    console.log('Error: ', error)
    return Promise.reject(error)
}

axiosInstance.interceptors.request.use(requestInterceptor)
axiosInstance.interceptors.response.use(responseInterceptor, responseInterceptorError)

const axios = axiosInstance

export default axios
