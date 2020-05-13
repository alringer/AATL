import Axios, { AxiosError, AxiosResponse } from 'axios'

export const BASE_URL = 'http://localhost:8080/api'

// Categories
export const FETCH_CATEGORIES = '/categories?size=1000&sort=id%2Casc'
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
    return config
}

const responseInterceptor = (response: AxiosResponse) => {
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
    return Promise.reject(error)
}

axiosInstance.interceptors.request.use(requestInterceptor)
axiosInstance.interceptors.response.use(responseInterceptor, responseInterceptorError)

const axios = axiosInstance

export default axios
