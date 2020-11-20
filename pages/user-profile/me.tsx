import UserProfile from 'components/UserProfile/UserProfile'
import axios, { FETCH_USER_PROFILE } from 'config/AxiosConfig'
import { GetServerSideProps } from 'next'
import React from 'react'
import { IUserProfile } from 'utilities/types/userProfile'

interface IServerSideProps {
    fetchedUser: IUserProfile | null
    venueListMetaId: number | null
}
interface IUserProfileProps extends IServerSideProps { }

const UserProfileMePage: React.FC<IUserProfileProps> = ({ fetchedUser, venueListMetaId }) => {
    return (
        <UserProfile fetchedUser={fetchedUser} venueListMetaId={venueListMetaId}></UserProfile>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const userID = 1354
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

export default UserProfileMePage