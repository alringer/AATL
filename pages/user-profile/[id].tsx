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
    user: IUserProfile | null
}
interface IUserProfileProps extends IServerSideProps {}

const UserProfile: React.FC<IUserProfileProps> = ({ user }) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    React.useEffect(() => {
        if (user === null) {
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
        }
    }, [])

    return (
        <>
            {user !== null ? (
                <>
                    <UserProfileBanner user={user} />
                    <UserProfileLists user={user} />
                    <EmailSubscription />
                </>
            ) : null}
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // let categoryList = []
    // await axios.get(FETCH_CATEGORIES).then((res) => {
    //     // categoryList = res.data
    // })
    const userID = context && context.params ? context.params.id : null
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
            user: user,
        },
    }
}

export default UserProfile
