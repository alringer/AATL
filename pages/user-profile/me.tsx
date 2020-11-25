import UserProfile from 'components/UserProfile/UserProfile'
import axios, { FETCH_USER_PROFILE_INSTAGRAM_DATA } from 'config/AxiosConfig'
import { KeycloakInstance } from 'keycloak-js'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import qs from 'querystring'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { fetchUser } from 'store/user/user_actions'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IUserProfile } from 'utilities/types/userProfile'

interface IServerSideProps {
    fetchUser: (keycloak: KeycloakInstance) => void
    getTokenConfig: () => string
    user: IUserProfile
    venueListMetaId: number | null
}
interface IUserProfileProps extends IServerSideProps, IWithAuthInjectedProps { }

const UserProfileMePage: React.FC<IUserProfileProps> = ({ user, venueListMetaId, getTokenConfig }) => {
    const router = useRouter()
    const [setUser] = React.useState(null)

    if (router?.asPath && user && !(user?.instagramId && user?.instagramToken)) {
        const parseAsPath = qs.parse(router.asPath.replace(router.pathname, ''))
        if (parseAsPath['?code']) {
            const authorizationCode: string = (parseAsPath['?code'] as string).replace('#_', '')
            const config = {
                headers: {
                    Authorization: getTokenConfig(),
                    'Content-Type': 'text/plain'
                },
            }
            axios
                .put(FETCH_USER_PROFILE_INSTAGRAM_DATA(user?.id), authorizationCode, config)
                .then((res) => {
                    setUser(res.data)
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <>
            {user ? (<UserProfile fetchedUser={user} venueListMetaId={venueListMetaId}></UserProfile>) : null}
        </>
    )
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
    user: state.userReducer.user
})
const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            fetchUser,
        },
        dispatch
    )
export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(UserProfileMePage))