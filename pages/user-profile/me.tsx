import UserProfile from 'components/UserProfile/UserProfile'
import { INSTAGRAM_CLIENT_ID, INSTAGRAM_CLIENT_SECRET, INSTAGRAM_REDIRECT_URI } from 'constants/InstagramConstants'
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
    user: IUserProfile
    venueListMetaId: number | null
}
interface IUserProfileProps extends IServerSideProps, IWithAuthInjectedProps { }

const UserProfileMePage: React.FC<IUserProfileProps> = ({ user, venueListMetaId }) => {
    const router = useRouter()
    console.log(router)

    React.useEffect(() => {
        if (router?.asPath && !(user.instagramId && user.instagramToken)) {
            const parseAsPath = qs.parse(router.asPath)
            if (parseAsPath['/?code']) {
                const authorizationCode: string = (parseAsPath['/?code'] as string).replace('#_', '')
                console.log(authorizationCode)

                const formData = new FormData()
                formData.append('client_id', INSTAGRAM_CLIENT_ID)
                formData.append('client_secret', INSTAGRAM_CLIENT_SECRET)
                formData.append('grant_type', 'authorization_code')
                formData.append('code', authorizationCode)
                formData.append('redirect_uri', INSTAGRAM_REDIRECT_URI)
            }
        }
    }, [user])

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
            venueListMetaId: venueListMetaId !== undefined && venueListMetaId !== null ? Number(venueListMetaId) : null,
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