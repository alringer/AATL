import DefaultUserProfileImage from 'assets/user-profile-icon.svg'
import UserProfileInstagramIcon from 'assets/user-profile-instagram-icon.svg'
import Image from 'components/Image/Image'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import axios, { DISCONNECT_INSTAGRAM, FETCH_USER_RECOMMENDATIONS } from 'config/AxiosConfig'
import { INSTAGRAM_CLIENT_ID, INSTAGRAM_REDIRECT_URI } from 'constants/InstagramConstants'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { KeycloakInstance } from 'keycloak-js'
import { useSnackbar } from 'notistack'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { openUserProfileEditModal } from 'store/userProfileEditModal/userProfileEditModal_actions'
import { OpenUserProfileEditModalPayload } from 'store/userProfileEditModal/userProfileEditModal_types'
import { query } from 'style/device'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IRecommendation } from 'utilities/types/recommendation'
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
    UserProfileDisconnectInstagramButton,
    UserProfileDisconnectInstagramContainer,
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
    fetchUser: (keycloak: KeycloakInstance) => void
}

const UserProfileBanner: React.FC<IUserProfileBannerProps> = ({
    user,
    currentUser,
    keycloak,
    openUserProfileEditModal,
    fetchUser,
    getTokenConfig,
}) => {
    const { enqueueSnackbar } = useSnackbar()

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
    const [numberOfPlacesRecommended, setNumberOfPlacesRecommended] = React.useState(0)
    const [recommendedVenueIDMap, setRecommendedVenueIDMap] = React.useState<{ [key: number]: true }>({})
    const [isDisconnecting, setDisconnecting] = React.useState(false)

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
            user.instagramProfile
                ? `https://instagram.com/${viewedUser?.instagramProfile?.username}`
                : isOwner
                ? `https://api.instagram.com/oauth/authorize?client_id=${encoded}&redirect_uri=${INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`
                : ''
        )
        fetchRecommendations(user.id)
    }, [user])

    React.useEffect(() => {
        setNumberOfPlacesRecommended(Object.keys(recommendedVenueIDMap).length)
    }, [recommendedVenueIDMap])

    const fetchRecommendations = (id: number) => {
        if (user) {
            axios
                .get(FETCH_USER_RECOMMENDATIONS(id))
                .then((res) => {
                    if (res?.data) {
                        let newRecommendedVenueIDMap = Object.assign({}, recommendedVenueIDMap)
                        res?.data?.map((recommendation: IRecommendation) => {
                            if (recommendation && recommendation?.venue) {
                                if (!newRecommendedVenueIDMap[recommendation.venue.id]) {
                                    newRecommendedVenueIDMap = Object.assign(newRecommendedVenueIDMap, {
                                        ...newRecommendedVenueIDMap,
                                        [recommendation.venue.id]: true,
                                    })
                                }
                            }
                        })
                        setRecommendedVenueIDMap({ ...newRecommendedVenueIDMap })
                    }
                })
                .catch((err) => console.log(err))
        }
    }

    const handleEditProfile = () => {
        openUserProfileEditModal({
            onSuccess: () => fetchUser(keycloak),
            user: user,
        })
    }

    const handleDisconnectInstagram = (id: number) => {
        const config = {
            headers: {
                Authorization: getTokenConfig(),
                'Content-Type': 'text/plain',
            },
        }
        setDisconnecting(true)
        axios
            .delete(DISCONNECT_INSTAGRAM(id), config)
            .then((res) => {
                // Surface Snackbar
                enqueueSnackbar('', {
                    content: (
                        <div>
                            <Snackbar
                                type={B.DELETE_INSTAGRAM.Type}
                                title={B.DELETE_INSTAGRAM.Title}
                                message={<SnackbarMessageBody>{B.DELETE_INSTAGRAM.Body}</SnackbarMessageBody>}
                            />
                        </div>
                    ),
                })
                // Fetch new user
                fetchUser(keycloak)
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setDisconnecting(false)
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
                                <UserProfileBannerEditButton
                                    onClick={handleEditProfile}
                                    data-tut={S.PRELAUNCH_TOUR.StepOne.Selector}
                                >
                                    <UserProfileBannerEditIcon />
                                    &nbsp; EDIT PROFILE
                                </UserProfileBannerEditButton>
                            )}
                            <UserProfileImageContainer>
                                <Image
                                    src={viewedUser.imageCDNUrl ? viewedUser.imageCDNUrl : DefaultUserProfileImage}
                                    alt="user-profile-image"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </UserProfileImageContainer>
                            {matches.mobile && renderHeaderAndDescription()}
                            {matches.mobile && (
                                <UserProfileBannerPencilButton
                                    onClick={handleEditProfile}
                                    data-tut={S.PRELAUNCH_TOUR.StepOne.Selector}
                                >
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
                                    {numberOfPlacesRecommended ? numberOfPlacesRecommended : 0}{' '}
                                    {S.USER_PROFILE_BANNER.Places}
                                </UserProfileNumberOfRecommendations>
                                {(viewedUser.instagramProfile || isOwner) && (
                                    <UserProfileInstagramContainer
                                        href={instagramLink}
                                        disabled={instagramLink ? false : true}
                                    >
                                        <UserProfileInstagramIconImg
                                            src={UserProfileInstagramIcon}
                                            alt="user-profile-instagram-icon"
                                        />
                                        <UserProfileInstagram>
                                            {viewedUser.instagramProfile
                                                ? `@${viewedUser.instagramProfile.username}`
                                                : isOwner
                                                ? S.USER_PROFILE_BANNER.EmptyInstagram
                                                : ''}
                                        </UserProfileInstagram>
                                    </UserProfileInstagramContainer>
                                )}
                                {isOwner && currentUser?.id && viewedUser.instagramProfile && (
                                    <UserProfileDisconnectInstagramContainer
                                        onClick={() => handleDisconnectInstagram(currentUser.id)}
                                    >
                                        <UserProfileDisconnectInstagramButton disabled={isDisconnecting}>
                                            {S.USER_PROFILE_BANNER.DisconnectInstagram}
                                        </UserProfileDisconnectInstagramButton>
                                    </UserProfileDisconnectInstagramContainer>
                                )}
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
