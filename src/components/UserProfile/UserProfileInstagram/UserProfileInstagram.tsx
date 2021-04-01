import {
    HRSpacer,
    InstagramBroughtToYou,
    InstagramItalic,
    UserProfileInstagramContainer,
    UserProfileInstagramEmpty,
    UserProfileInstagramEmptyContainer,
    UserProfileInstagramEmptyThree,
    UserProfileInstagramEmptyTwo,
    UserProfileInstagramFooterContainer,
    UserProfileInstagramPhotoLarge,
    UserProfileInstagramPhotosColumn,
    UserProfileInstagramPhotosContainer,
    UserProfileInstagramPhotoSmall,
    UserProfileInstagramPhotosRow,
    UserProfileInstagramSubTitle,
    UserProfileInstagramTitle,
    UserProfileInstagramTitlesContainer,
    UserProfilePhotoCaption,
    UserProfilePhotoDate,
    UserProfilePhotoTitle,
    ViewMoreButton,
    ViewMoreButtonContainer,
    VRSpacer,
} from 'components/UserProfile/UserProfileInstagram/UserProfileInstagram.style'
import * as S from 'constants/StringConstants'
import moment from 'moment'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'
import { DeviceNameEnum, query, size } from 'style/device'
import { chopStringInstagramCaption } from 'utilities/helpers/chopString'
import useWindowSize from 'utilities/hooks/useWindowSize'
import { InstagramProfileDTO } from 'utilities/types/instagramProfile'
import { IUserProfile } from 'utilities/types/userProfile'

interface IReduxProps {
    currentUser: IUserProfile | null
}
interface IUserProfileInstagramProps extends IReduxProps {
    user: IUserProfile | null
}

const UserProfileInstagram: React.FC<IUserProfileInstagramProps> = ({ user, currentUser }) => {
    const isOwner = currentUser && user && currentUser.id === user.id

    const [instagramUser, setInstagramUser] = React.useState<InstagramProfileDTO | null>(null)
    const windowSize = useWindowSize()
    const viewport: DeviceNameEnum =
        windowSize.width >= Number(size.laptop)
            ? DeviceNameEnum.laptop
            : windowSize.width >= Number(size.tablet)
            ? DeviceNameEnum.tablet
            : DeviceNameEnum.mobile

    React.useEffect(() => {
        if (user && user.instagramProfile) {
            setInstagramUser(user.instagramProfile)
        }
    }, [user])

    const handleViewMore = () => {
        if (instagramUser) {
            window.open(`https://instagram.com/${instagramUser.username}`)
        }
    }

    return (
        <Media queries={query} defaultMatches={{ mobile: true }}>
            {(matches) =>
                matches.laptop || matches.tablet ? (
                    <UserProfileInstagramContainer>
                        <UserProfileInstagramTitlesContainer>
                            <UserProfileInstagramTitle>{S.USER_PROFILE_INSTAGRAM.Title}</UserProfileInstagramTitle>
                            <UserProfileInstagramSubTitle>
                                {instagramUser
                                    ? S.USER_PROFILE_INSTAGRAM.SubTitle
                                    : isOwner
                                    ? S.USER_PROFILE_INSTAGRAM.Connect
                                    : null}
                            </UserProfileInstagramSubTitle>
                        </UserProfileInstagramTitlesContainer>
                        {instagramUser ? (
                            <>
                                <UserProfileInstagramPhotosContainer>
                                    {instagramUser?.posts[0] && (
                                        <UserProfileInstagramPhotosColumn url={instagramUser.posts[0].mediaUrl}>
                                            <UserProfilePhotoCaption>
                                                <UserProfilePhotoTitle>
                                                    {chopStringInstagramCaption(
                                                        instagramUser.posts[0].caption,
                                                        viewport
                                                    )}
                                                </UserProfilePhotoTitle>
                                                <UserProfilePhotoDate>
                                                    {moment(instagramUser.posts[0].timestamp).fromNow()}
                                                </UserProfilePhotoDate>
                                            </UserProfilePhotoCaption>
                                        </UserProfileInstagramPhotosColumn>
                                    )}
                                    {instagramUser?.posts.length > 1 && (
                                        <>
                                            <HRSpacer />
                                            <UserProfileInstagramPhotosColumn>
                                                {(instagramUser?.posts[1] || instagramUser?.posts[2]) && (
                                                    <UserProfileInstagramPhotosRow>
                                                        {instagramUser?.posts[1] && (
                                                            <UserProfileInstagramPhotoLarge
                                                                url={instagramUser?.posts[1].mediaUrl}
                                                            >
                                                                <UserProfilePhotoCaption>
                                                                    <UserProfilePhotoTitle>
                                                                        {chopStringInstagramCaption(
                                                                            instagramUser?.posts[1].caption,
                                                                            viewport
                                                                        )}
                                                                    </UserProfilePhotoTitle>
                                                                    <UserProfilePhotoDate>
                                                                        {moment(
                                                                            instagramUser?.posts[1].timestamp
                                                                        ).fromNow()}
                                                                    </UserProfilePhotoDate>
                                                                </UserProfilePhotoCaption>
                                                            </UserProfileInstagramPhotoLarge>
                                                        )}
                                                        {instagramUser?.posts[2] && (
                                                            <>
                                                                <HRSpacer />
                                                                <UserProfileInstagramPhotoSmall
                                                                    url={instagramUser?.posts[2].mediaUrl}
                                                                >
                                                                    <UserProfilePhotoCaption>
                                                                        <UserProfilePhotoTitle>
                                                                            {chopStringInstagramCaption(
                                                                                instagramUser?.posts[2].caption,
                                                                                viewport
                                                                            )}
                                                                        </UserProfilePhotoTitle>
                                                                        <UserProfilePhotoDate>
                                                                            {moment(
                                                                                instagramUser?.posts[2].timestamp
                                                                            ).fromNow()}
                                                                        </UserProfilePhotoDate>
                                                                    </UserProfilePhotoCaption>
                                                                </UserProfileInstagramPhotoSmall>
                                                            </>
                                                        )}
                                                    </UserProfileInstagramPhotosRow>
                                                )}
                                                {(instagramUser?.posts[3] || instagramUser?.posts[4]) && (
                                                    <>
                                                        <VRSpacer />
                                                        <UserProfileInstagramPhotosRow>
                                                            {instagramUser?.posts[3] && (
                                                                <UserProfileInstagramPhotoSmall
                                                                    url={instagramUser?.posts[3].mediaUrl}
                                                                >
                                                                    <UserProfilePhotoCaption>
                                                                        <UserProfilePhotoTitle>
                                                                            {chopStringInstagramCaption(
                                                                                instagramUser?.posts[3].caption,
                                                                                viewport
                                                                            )}
                                                                        </UserProfilePhotoTitle>
                                                                        <UserProfilePhotoDate>
                                                                            {moment(
                                                                                instagramUser?.posts[3].timestamp
                                                                            ).fromNow()}
                                                                        </UserProfilePhotoDate>
                                                                    </UserProfilePhotoCaption>
                                                                </UserProfileInstagramPhotoSmall>
                                                            )}
                                                            {instagramUser?.posts[4] && (
                                                                <>
                                                                    <HRSpacer />
                                                                    <UserProfileInstagramPhotoLarge
                                                                        url={instagramUser?.posts[4].mediaUrl}
                                                                    >
                                                                        <UserProfilePhotoCaption>
                                                                            <UserProfilePhotoTitle>
                                                                                {chopStringInstagramCaption(
                                                                                    instagramUser?.posts[4].caption,
                                                                                    viewport
                                                                                )}
                                                                            </UserProfilePhotoTitle>
                                                                            <UserProfilePhotoDate>
                                                                                {moment(
                                                                                    instagramUser?.posts[4].timestamp
                                                                                ).fromNow()}
                                                                            </UserProfilePhotoDate>
                                                                        </UserProfilePhotoCaption>
                                                                    </UserProfileInstagramPhotoLarge>
                                                                </>
                                                            )}
                                                        </UserProfileInstagramPhotosRow>
                                                    </>
                                                )}
                                            </UserProfileInstagramPhotosColumn>
                                        </>
                                    )}
                                </UserProfileInstagramPhotosContainer>
                                {instagramUser && (
                                    <>
                                        <UserProfileInstagramFooterContainer>
                                            <InstagramBroughtToYou>
                                                Brought to you by <InstagramItalic>Instagram</InstagramItalic>
                                            </InstagramBroughtToYou>
                                        </UserProfileInstagramFooterContainer>
                                        <ViewMoreButtonContainer>
                                            <ViewMoreButton onClick={handleViewMore}>View More</ViewMoreButton>
                                        </ViewMoreButtonContainer>
                                    </>
                                )}
                            </>
                        ) : (
                            <UserProfileInstagramEmptyContainer>
                                <UserProfileInstagramEmpty />
                                <HRSpacer />
                                <UserProfileInstagramEmptyTwo />
                                <HRSpacer />
                                <UserProfileInstagramEmptyThree />
                            </UserProfileInstagramEmptyContainer>
                        )}
                    </UserProfileInstagramContainer>
                ) : null
            }
        </Media>
    )
}

const mapStateToProps = (state: StoreState) => ({
    currentUser: state.userReducer.user,
})

export default reduxConnect(mapStateToProps)(UserProfileInstagram)
