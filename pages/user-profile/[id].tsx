import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import UserProfileBanner from 'components/UserProfile/UserProfileBanner/UserProfileBanner'
import UserProfileLists from 'components/UserProfile/UserProfileLists/UserProfileLists'
import { GetServerSideProps } from 'next'
import React from 'react'

interface IUserProfileProps {
    userID: number
}

const UserProfile: React.FC<IUserProfileProps> = () => {
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
