import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import UserProfileBanner from 'components/UserProfile/UserProfileBanner/UserProfileBanner'
import UserProfileLists from 'components/UserProfile/UserProfileLists/UserProfileLists'
import axios, { FETCH_USER_PROFILE } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import { IUserProfile } from 'utilities/types/userProfile'

interface IServerSideProps {
    fetchedUser: IUserProfile | null
    venueListMetaId: number | null
}
interface IUserProfileProps extends IServerSideProps {}

const UserProfile: React.FC<IUserProfileProps> = ({ fetchedUser, venueListMetaId }) => {
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
    }, [])

    const fetchUser = () => {
        if (user) {
            axios
                .get(FETCH_USER_PROFILE(user.id))
                .then((res) => {
                    setUser(res.data)
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <>
            {user !== null ? (
                <>
                    <UserProfileBanner user={user} fetchUser={fetchUser} />
                    <UserProfileLists user={user} venueListMetaId={venueListMetaId} />
                    <EmailSubscription />
                </>
            ) : null}
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const userID = context && context.params ? context.params.id : null
    const venueListMetaId = context.query.v
    const inputUserID = Number(userID)
    let user = null
    if (userID !== undefined) {
        await axios
            .get(FETCH_USER_PROFILE(inputUserID))
            .then((res) => {
                user = res.data
            })
            .catch((err) => console.log(err))
    }
    return {
        props: {
            fetchedUser: user ? user : null,
            venueListMetaId: venueListMetaId !== undefined && venueListMetaId !== null ? Number(venueListMetaId) : null,
        },
    }
}

export default UserProfile
