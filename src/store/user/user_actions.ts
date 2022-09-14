import axios, { FETCH_CURRENT_USER_PROFILE } from 'config/AxiosConfig'
import jwt from 'jwt-decode'
import { KeycloakInstance } from 'keycloak-js'
import { action } from 'typesafe-actions'
import { UserRoleEnum } from 'utilities/types/clientDTOS/UserRole'
import { IUserProfile } from 'utilities/types/userProfile'
import { IUserInformation, LOGIN, LOGOUT, SET_LOADING } from './user_types'

export const login = (userInformation: IUserInformation) => action(LOGIN, userInformation)
export const logout = () => action(LOGOUT)
export const setLoading = (isLoading: boolean) => action(SET_LOADING, isLoading)

export const fetchUser = (keycloak: KeycloakInstance) => {
    return (dispatch) => {
        const decodedToken = jwt(keycloak.token)
        const roles = decodedToken?.roles ? decodedToken.roles : []
        const role = roles.includes(UserRoleEnum.Admin)
            ? UserRoleEnum.Admin
            : roles.includes(UserRoleEnum.User)
            ? UserRoleEnum.User
            : UserRoleEnum.User // TODO: How should we handle a user who is neither admin nor user?
        const config = {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        }
        if (decodedToken && role) {
            dispatch(setLoading(true))
            axios
                .get(FETCH_CURRENT_USER_PROFILE, config)
                .then((res) => {
                    const userProfileInformation: IUserProfile = res.data.userProfile
                    const venuesInLists: number[] = res.data.venuesListsVenueIds
                    const venuesRecommended: number[] = res.data.venuesRecommendedVenueIds
                    const venuesRecommendationPromptsVenueIds: number[] = res.data.venuesRecommendationPromptsVenueIds
                    dispatch(
                        login({
                            user: userProfileInformation,
                            userRole: role,
                            isLoading: false,
                            venuesListsVenueIDs: venuesInLists,
                            venuesRecommendedVenueIDs: venuesRecommended,
                            venuesRecommendationPromptsVenueIDs: venuesRecommendationPromptsVenueIds,
                        })
                    )
                })
                .catch((err) => console.log(err))
        }
    }
}
