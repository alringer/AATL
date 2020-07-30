import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import UserProfileBanner from 'components/UserProfile/UserProfileBanner/UserProfileBanner'
import UserProfileLists from 'components/UserProfile/UserProfileLists/UserProfileLists'
import { GetServerSideProps } from 'next'
import React from 'react'
// import Snackbar from 'components/Snackbar/Snackbar'
// import * as B from 'constants/SnackbarConstants'
// import { useSnackbar } from 'notistack'
// import { useRouter } from 'next/router'

interface IUserProfileProps {
    userID: number
}

const UserProfile: React.FC<IUserProfileProps> = () => {
    // TODO: Add a toast if the user profile with the given ID does not exist
    // const router = useRouter()
    // const { enqueueSnackbar } = useSnackbar()

    // React.useEffect(() => {
    //     enqueueSnackbar('', {
    //         content: (
    //             <div>
    //                 <Snackbar
    //                     type={B.ERROR_CITY.Type}
    //                     title={B.ERROR_CITY.Title}
    //                     message={B.ERROR_CITY.Body}
    //                 />
    //             </div>
    //         ),
    //     })
    //     router.push('/')
    // }, [])

    return (
        <>
            <UserProfileBanner />
            <UserProfileLists />
            <EmailSubscription />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // let categoryList = []
    // await axios.get(FETCH_CATEGORIES).then((res) => {
    //     // categoryList = res.data
    // })
    const userID = context && context.params ? context.params.id : null
    console.log('TODO: Query user with ID: ', userID)
    return {
        props: {
            userID: userID,
        },
    }
}

export default UserProfile
