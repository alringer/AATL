import DefaultUserProfileImage from 'assets/user-profile-icon.svg'
import UserProfileInstagramIcon from 'assets/user-profile-instagram-icon.svg'
import Image from 'components/Image/Image'
import { INSTAGRAM_CLIENT_ID, INSTAGRAM_REDIRECT_URI } from 'constants/InstagramConstants'
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
    const [instagramLink, setInstagramLink] = React.useState(null)

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
        // TODO: Set the link to activation link if the user has no instagram ID or disable the link
        const encoded = encodeURI(INSTAGRAM_CLIENT_ID)
        setInstagramLink(
            user.instagramId && user.instagramToken
                ? `https://instagram.com/${viewedUser.instagramId}`
                : isOwner
                ? `https://api.instagram.com/oauth/authorize?client_id=${encoded}&redirect_uri=${INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`
                : ''
        )
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
                    <UserProfileTitle id="userTitle">
                        {userInformation.userTitle
                            ? userInformation.userTitle
                            : isOwner
                            ? S.USER_PROFILE_BANNER.EmptyMessageByLine
                            : null}
                    </UserProfileTitle>
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
                                        {userInformation.userDescription
                                            ? userInformation.userDescription
                                            : isOwner
                                            ? S.USER_PROFILE_BANNER.EmptyMessageDescription
                                            : null}
                                    </UserProfileDescription>
                                </UserProfileDescriptionContainer>
                                <UserProfileNumberOfRecommendations>
                                    {S.USER_PROFILE_BANNER.Recommends}:{' '}
                                    {viewedUser.recommendations && viewedUser.recommendations.length
                                        ? viewedUser.recommendations.length
                                        : 0}{' '}
                                    {S.USER_PROFILE_BANNER.Places}
                                </UserProfileNumberOfRecommendations>
                                {
                                    <UserProfileInstagramContainer
                                        href={instagramLink}
                                        disabled={instagramLink ? false : true}
                                    >
                                        {(viewedUser.instagramId || isOwner) && (
                                            <UserProfileInstagramIconImg
                                                src={UserProfileInstagramIcon}
                                                alt="user-profile-instagram-icon"
                                            />
                                        )}
                                        <UserProfileInstagram>
                                            {viewedUser.instagramId
                                                ? `@${viewedUser.instagramId}`
                                                : isOwner
                                                ? S.USER_PROFILE_BANNER.EmptyInstagram
                                                : ''}
                                        </UserProfileInstagram>
                                    </UserProfileInstagramContainer>
                                }
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
