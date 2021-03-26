import UserProfile from 'components/UserProfile/UserProfile'
import axios, { FETCH_USER_PROFILE, FETCH_USER_PROFILE_INSTAGRAM_AUTHORIZE } from 'config/AxiosConfig'
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
    getTokenConfig: () => string
    venueListMetaId: number | null
}
interface IUserProfileProps extends IServerSideProps, IWithAuthInjectedProps, IReduxProps {}

const UserProfileMePage: React.FC<IUserProfileProps> = ({
    isLoading,
    currentUser,
    venueListMetaId,
    getTokenConfig,
}) => {
    const router = useRouter()
    const [user, setUser] = React.useState(null)
    const { isMounted } = useAuth()
    const { enqueueSnackbar } = useSnackbar()

    React.useEffect(() => {
        if (isMounted && !isLoading) {
            if (router?.asPath && currentUser) {
                const parseAsPath = qs.parse(router.asPath.replace(router.pathname, ''))
                if (parseAsPath['?code']) {
                    const authorizationCode: string = (parseAsPath['?code'] as string).replace('#_', '')
                    const config = {
                        headers: {
                            Authorization: getTokenConfig(),
                            'Content-Type': 'text/plain',
                        },
                    }
                    axios
                        .post(FETCH_USER_PROFILE_INSTAGRAM_AUTHORIZE(currentUser?.id), authorizationCode, config)
                        .then((res) => {
                            setUser(res.data)
                        })
                        .catch((err) => console.log(err))
                } else {
                    if (currentUser) {
                        axios
                            .get(FETCH_USER_PROFILE(currentUser?.id))
                            .then((res) => {
                                setUser(res.data)
                            })
                            .catch((err) => console.log(err))
                    }
                }
            } else {
                if (currentUser) {
                    axios
                        .get(FETCH_USER_PROFILE(currentUser?.id))
                        .then((res) => {
                            setUser(res.data)
                        })
                        .catch((err) => console.log(err))
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
