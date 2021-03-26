import UserProfile from 'components/UserProfile/UserProfile'
import axios, { FETCH_USER_PROFILE } from 'config/AxiosConfig'
import { GetServerSideProps } from 'next'
import React from 'react'
import { IUserProfile } from 'utilities/types/userProfile'

interface IServerSideProps {
    fetchedUser: IUserProfile | null
    venueListMetaId: number | null
}
interface IUserProfileProps extends IServerSideProps {}

const UserProfileIdPage: React.FC<IUserProfileProps> = ({ fetchedUser, venueListMetaId }) => {
    return <UserProfile fetchedUser={fetchedUser} venueListMetaId={venueListMetaId}></UserProfile>
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
                console.log('Viewing user: ', res)
                user = res.data
            })
            .catch((err) => console.log(err))
    }
    return {
        props: {
            fetchedUser: user ? user : null,
            venueListMetaId: venueListMetaId ? Number(venueListMetaId) : null,
        },
    }
}

export default UserProfileIdPage
