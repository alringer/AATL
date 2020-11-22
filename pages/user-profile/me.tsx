import UserProfile from 'components/UserProfile/UserProfile'
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

    if (router?.asPath && !(user?.instagramId && user?.instagramToken)) {
        const parseAsPath = qs.parse(router.asPath.replace(`${router.pathname}?`, ''))
        console.log(parseAsPath)
        if (parseAsPath['code'][0]) {
            const authorizationCode: string = (parseAsPath['code'][0] as string).replace('#_', '')
            console.log(authorizationCode)
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