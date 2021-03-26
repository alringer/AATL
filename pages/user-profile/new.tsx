const UserProfile: React.FC<IUserProfileProps> = ({
    fetchedUser,
    venueListMetaId,
    isPrelaunch,
    currentUser,
    isLoggedIn,
    isLoading,
    keycloak,
    fetchUser,
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
            console.log('Fetched User:: ', fetchedUser)
            setUser(fetchedUser)
        }
    }, [])

    React.useEffect(() => {
        if (isPrelaunch === true && isLoading === false && isLoggedIn === false) {
            router.push(R.ROUTE_ITEMS.influencerWelcome)
        }
    }, [isLoggedIn, isPrelaunch, isLoading])

    React.useEffect(() => {
        if (currentUser && fetchedUser && currentUser.id !== fetchedUser.id) {
            router.push(R.ROUTE_ITEMS.influencerWelcome)
        }
    }, [currentUser, fetchedUser])

    const refreshUser = () => {
        if (user) {
            axios
                .get(FETCH_USER_PROFILE(user.id))
                .then((res) => {
                    setUser(res.data)
                })
                .catch((err) => console.log(err))
        }
        fetchUser(keycloak)
    }

    return (
        <>
            {user !== null ? (
                <>
                    <UserProfileBanner user={user} refreshUser={refreshUser} />
                    {isPrelaunch && <UserProfileInfluencerGuide refreshUser={refreshUser} />}
                    <UserProfileLists user={user} venueListMetaId={venueListMetaId} />
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
