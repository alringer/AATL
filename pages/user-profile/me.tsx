import UserProfile from 'components/UserProfile/UserProfile'
import { KeycloakInstance } from 'keycloak-js'
import { GetServerSideProps } from 'next'
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
    return (
        <>
            {user ? (<UserProfile fetchedUser={user} venueListMetaId={venueListMetaId}></UserProfile>) : null}
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const venueListMetaId = context.query.v
    console.log('there', venueListMetaId)
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