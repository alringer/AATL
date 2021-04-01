import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import InfluencerTour from 'components/InfluencerTour/InfluencerTour'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import UserProfileBanner from 'components/UserProfile/UserProfileBanner/UserProfileBanner'
import UserProfileInfluencerGuide from 'components/UserProfile/UserProfileInfluencerGuide/UserProfileInfluencerGuide'
import UserProfileInstagram from 'components/UserProfile/UserProfileInstagram/UserProfileInstagram'
import UserProfileLists from 'components/UserProfile/UserProfileLists/UserProfileLists'
import * as R from 'constants/RouteConstants'
import * as B from 'constants/SnackbarConstants'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { fetchUser } from 'store/user/user_actions'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IUserProfile } from 'utilities/types/userProfile'

interface IReduxProps {
    isPrelaunch: boolean
    currentUser: IUserProfile | null
    isLoggedIn: boolean
    isLoading: boolean
}

interface IServerSideProps {
    fetchedUser: IUserProfile | null
    venueListMetaId: number | null
}
interface IUserProfileProps extends IServerSideProps, IWithAuthInjectedProps, IReduxProps {}

const UserProfile: React.FC<IUserProfileProps> = ({
    fetchedUser,
    venueListMetaId,
    keycloak,
    isPrelaunch,
    currentUser,
    isLoggedIn,
    isLoading,
}) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        if (fetchedUser === null) {
            enqueueSnackbar('', {
                content: (
                    <div>
                        <Snackbar
                            type={B.ERROR_USER_PROFILE.Type}
                            title={B.ERROR_USER_PROFILE.Title}
                            message={<SnackbarMessageBody>{B.ERROR_USER_PROFILE.Body}</SnackbarMessageBody>}
                        />
                    </div>
                ),
            })
            router.push('/')
        } else {
            setUser(fetchedUser)
        }
    }, [fetchedUser])

    React.useEffect(() => {
        if (isPrelaunch === true && isLoading === false && isLoggedIn === false) {
            router.push(R.ROUTE_ITEMS.influencerWelcome)
        }
    }, [isLoggedIn, isPrelaunch, isLoading])

    React.useEffect(() => {
        if (isPrelaunch && currentUser && fetchedUser && currentUser.id !== fetchedUser.id) {
            router.push(R.ROUTE_ITEMS.influencerWelcome)
        }
    }, [isPrelaunch, currentUser, fetchedUser])

    const refreshUser = () => {
        fetchUser(keycloak)
    }

    return (
        <>
            {user ? (
                <>
                    <UserProfileBanner user={user} fetchUser={refreshUser} />
                    {isPrelaunch && <UserProfileInfluencerGuide user={user} refreshUser={refreshUser} />}
                    <UserProfileLists user={user} venueListMetaId={venueListMetaId} />
                    <UserProfileInstagram user={user} />
                    <EmailSubscription />
                    {isPrelaunch && <InfluencerTour />}
                </>
            ) : null}
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isPrelaunch: state.prelaunchReducer.isPrelaunch,
    currentUser: state.userReducer.user,
    isLoggedIn: state.userReducer.loggedIn,
    isLoading: state.userReducer.isLoading,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            fetchUser,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(UserProfile))
