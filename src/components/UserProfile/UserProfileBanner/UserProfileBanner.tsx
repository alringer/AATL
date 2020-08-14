import DefaultUserProfileImage from 'assets/user-profile-icon.svg'
import UserProfileInstagramIcon from 'assets/user-profile-instagram-icon.svg'
import Image from 'components/Image/Image'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { openUserProfileEditModal } from 'store/userProfileEditModal/userProfileEditModal_actions'
import { OpenUserProfileEditModalPayload } from 'store/userProfileEditModal/userProfileEditModal_types'
import { query } from 'style/device'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IUserProfile } from 'utilities/types/userProfile'
import {
    UserProfileBannerContainer,
    UserProfileBannerEditButton,
    UserProfileBannerEditIcon,
    UserProfileBannerPencilButton,
    UserProfileContentBodyContainer,
    UserProfileContentContainer,
    UserProfileContentHeaderContainer,
    UserProfileDescription,
    UserProfileDescriptionContainer,
    UserProfileImageContainer,
    UserProfileInstagram,
    UserProfileInstagramContainer,
    UserProfileInstagramIconImg,
    UserProfileMainInformationContainer,
    UserProfileName,
    UserProfileNameContainer,
    UserProfileNumberOfRecommendations,
    UserProfileTitle,
    UserProfileTitleContainer,
} from './UserProfileBanner.style'

interface IReduxProps {
    currentUser: IUserProfile | null
    openUserProfileEditModal: (payload: OpenUserProfileEditModalPayload) => void
}
interface IUserProfileBannerProps extends IReduxProps, IWithAuthInjectedProps {
    user: IUserProfile | null
    fetchUser: () => void
}

const UserProfileBanner: React.FC<IUserProfileBannerProps> = ({
    user,
    currentUser,
    openUserProfileEditModal,
    fetchUser,
}) => {
    const isOwner = currentUser && user && currentUser.id === user.id
    // Input States
    const [viewedUser, setViewedUser] = React.useState(user)
    const [userInformation, setUserInformation] = React.useState({
        userName:
            user.firstName && user.lastName
                ? user.firstName + ' ' + user.lastName
                : user.firstName
                ? user.firstName
                : user.lastName
                ? user.lastName
                : '',
        userTitle: user.userByLine ? user.userByLine : '',
        userDescription: user.content ? user.content : '',
    })

    React.useEffect(() => {
        setUserInformation({
            userName:
                user.firstName && user.lastName
                    ? user.firstName + ' ' + user.lastName
                    : user.firstName
                    ? user.firstName
                    : user.lastName
                    ? user.lastName
                    : '',
            userTitle: user.userByLine ? user.userByLine : '',
            userDescription: user.content ? user.content : '',
        })
        setViewedUser(user)
    }, [user])

    const handleEditProfile = () => {
        openUserProfileEditModal({
            onSuccess: fetchUser,
        })
    }

    const renderHeaderAndDescription = () => {
        return (
            <UserProfileContentHeaderContainer>
                <UserProfileNameContainer>
                    <UserProfileName id="userName">{userInformation.userName}</UserProfileName>
                </UserProfileNameContainer>
                <UserProfileTitleContainer>
                    <UserProfileTitle id="userTitle">{userInformation.userTitle}</UserProfileTitle>
                </UserProfileTitleContainer>
            </UserProfileContentHeaderContainer>
        )
    }

    return (
        <UserProfileBannerContainer>
            <Media queries={query} defaultMatches={{ mobile: true }}>
                {(matches) => (
                    <>
                        <UserProfileMainInformationContainer>
                            {isOwner && (matches.laptop || matches.tablet) && (
                                <UserProfileBannerEditButton onClick={handleEditProfile}>
                                    <UserProfileBannerEditIcon />
                                    &nbsp; EDIT PROFILE
                                </UserProfileBannerEditButton>
                            )}
                            <UserProfileImageContainer>
                                <Image
                                    src={viewedUser.imageCDNUrl ? viewedUser.imageCDNUrl : DefaultUserProfileImage}
                                    alt="user-profile-image"
                                />
                            </UserProfileImageContainer>
                            {matches.mobile && renderHeaderAndDescription()}
                            {matches.mobile && (
                                <UserProfileBannerPencilButton onClick={handleEditProfile}>
                                    <UserProfileBannerEditIcon />
                                </UserProfileBannerPencilButton>
                            )}
                        </UserProfileMainInformationContainer>
                        <UserProfileContentContainer>
                            {(matches.laptop || matches.tablet) && renderHeaderAndDescription()}
                            <UserProfileContentBodyContainer>
                                <UserProfileDescriptionContainer>
                                    <UserProfileDescription id="userDescription">
                                        {userInformation.userDescription}
                                    </UserProfileDescription>
                                </UserProfileDescriptionContainer>
                                <UserProfileNumberOfRecommendations>
                                    {S.USER_PROFILE_BANNER.Recommends}:{' '}
                                    {viewedUser.recommendations && viewedUser.recommendations.length
                                        ? viewedUser.recommendations.length
                                        : 0}{' '}
                                    {S.USER_PROFILE_BANNER.Places}
                                </UserProfileNumberOfRecommendations>
                                {viewedUser.instagramId ? (
                                    <UserProfileInstagramContainer
                                        href={`https://instagram.com/${viewedUser.instagramId}`}
                                        target="_blank"
                                    >
                                        <UserProfileInstagramIconImg
                                            src={UserProfileInstagramIcon}
                                            alt="user-profile-instagram-icon"
                                        />
                                        <UserProfileInstagram>@JaneDoe</UserProfileInstagram>
                                    </UserProfileInstagramContainer>
                                ) : null}
                            </UserProfileContentBodyContainer>
                        </UserProfileContentContainer>
                    </>
                )}
            </Media>
        </UserProfileBannerContainer>
    )
}

const mapStateToProps = (state: StoreState) => ({
    currentUser: state.userReducer.user,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            openUserProfileEditModal,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(UserProfileBanner))
