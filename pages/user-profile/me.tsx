import UserProfile from 'components/UserProfile/UserProfile'
import axios, { FETCH_USER_PROFILE_INSTAGRAM_AUTHORIZE } from 'config/AxiosConfig'
import { KeycloakInstance } from 'keycloak-js'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import qs from 'querystring'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { fetchUser } from 'store/user/user_actions'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { useAuth } from 'utilities/providers/AuthProvider'
import { IUserProfile } from 'utilities/types/userProfile'

interface IReduxProps {
    currentUser: IUserProfile | null
    isLoading: boolean
}

interface IServerSideProps {
    fetchUser: (keycloak: KeycloakInstance) => void
    venueListMetaId: number | null
}
interface IUserProfileProps extends IServerSideProps, IWithAuthInjectedProps, IReduxProps {}

const UserProfileMePage: React.FC<IUserProfileProps> = ({
    isLoading,
    currentUser,
    venueListMetaId,
    getTokenConfig,
    keycloak,
    fetchUser,
}) => {
    const router = useRouter()
    const [user, setUser] = React.useState(null)
    const { isMounted } = useAuth()
    const { enqueueSnackbar } = useSnackbar()

    React.useEffect(() => {
        if (isMounted && !isLoading) {
            console.log('Mounted and Not Loading')
            if (router?.asPath && currentUser) {
                console.log('Path and current user detected')
                const parseAsPath = qs.parse(router.asPath.replace(router.pathname, ''))
                if (parseAsPath['?code']) {
                    console.log('Code detected in the path')
                    if (currentUser) {
                        console.log('Code detected and current user detected')
                        if (!currentUser.instagramProfile) {
                            console.log('Fetched User with no InstagramID')
                            const authorizationCode: string = (parseAsPath['?code'] as string).replace('#_', '')
                            const config = {
                                headers: {
                                    Authorization: getTokenConfig(),
                                    'Content-Type': 'text/plain',
                                },
                            }
                            axios
                                .post(
                                    FETCH_USER_PROFILE_INSTAGRAM_AUTHORIZE(currentUser?.id),
                                    authorizationCode,
                                    config
                                )
                                .then((res) => {
                                    fetchUser(keycloak)
                                })
                                .catch((err) => {
                                    console.log(err)
                                    setUser(currentUser)
                                })
                        } else {
                            console.log('Fetched User with InstagramID')
                            setUser(currentUser)
                        }
                    }
                } else {
                    console.log('Code is not detected in the path. Setting the user to: ', currentUser)
                    if (currentUser) {
                        setUser(currentUser)
                    }
                }
            } else {
                console.log('asPath or currentUser not detected')
                if (currentUser) {
                    console.log('asPath or currentUser not detected. Setting the user to: ', currentUser)
                    setUser(currentUser)
                } else {
                    router.push('/')
                }
            }
        }
    }, [currentUser, isMounted, isLoading])

    return user && <UserProfile fetchedUser={user} venueListMetaId={venueListMetaId}></UserProfile>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const venueListMetaId = context.query.v
    return {
        props: {
            venueListMetaId: venueListMetaId ? Number(venueListMetaId) : null,
        },
    }
}

const mapStateToProps = (state: StoreState) => ({
    currentUser: state.userReducer.user,
    isLoading: state.userReducer.isLoading,
})
const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            fetchUser,
        },
        dispatch
    )
export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(UserProfileMePage))
