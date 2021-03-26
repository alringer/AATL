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
import axios, { FETCH_USER_PROFILE_INSTAGRAM_MEDIA } from 'config/AxiosConfig'
import * as S from 'constants/StringConstants'
import moment from 'moment'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'
import { DeviceNameEnum, query, size } from 'style/device'
import { chopStringInstagramCaption } from 'utilities/helpers/chopString'
import useWindowSize from 'utilities/hooks/useWindowSize'
import { IUserProfile } from 'utilities/types/userProfile'

interface IReduxProps {
    currentUser: IUserProfile | null
}
interface IUserProfileInstagramProps extends IReduxProps {
    user: IUserProfile | null
}

const UserProfileInstagram: React.FC<IUserProfileInstagramProps> = ({ user, currentUser }) => {
    const isOwner = currentUser && user && currentUser.id === user.id
    interface IInstaPost {
        id: number
        caption: string
        mediaType: string
        mediaUrl: string
        timestamp: string
        hashtags: string[]
    }

    interface IInstaMedia {
        id: number
        username: string
        posts: IInstaPost[]
    }
    const [media, setMedia] = React.useState<IInstaMedia | null>(null)
    const windowSize = useWindowSize()
    const viewport: DeviceNameEnum =
        windowSize.width >= Number(size.laptop)
            ? DeviceNameEnum.laptop
            : windowSize.width >= Number(size.tablet)
            ? DeviceNameEnum.tablet
            : DeviceNameEnum.mobile

    React.useEffect(() => {
        if (user && user.instagramId) {
            setTimeout(() => {
                axios
                    .get(FETCH_USER_PROFILE_INSTAGRAM_MEDIA(user.id))
                    .then((res) => {
                        setMedia(res.data)
                    })
                    .catch((err) => console.log(err))
            }, 3000)
        }
    }, [user])

    const handleViewMore = () => {
        if (media) {
            window.open(`https://instagram.com/${media.username}`)
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
                                {user.instagramId
                                    ? S.USER_PROFILE_INSTAGRAM.SubTitle
                                    : isOwner
                                    ? S.USER_PROFILE_INSTAGRAM.Connect
                                    : null}
                            </UserProfileInstagramSubTitle>
                        </UserProfileInstagramTitlesContainer>
                        {media ? (
                            <>
                                <UserProfileInstagramPhotosContainer>
                                    {media?.posts[0] && (
                                        <UserProfileInstagramPhotosColumn url={media.posts[0].mediaUrl}>
                                            <UserProfilePhotoCaption>
                                                <UserProfilePhotoTitle>
                                                    {chopStringInstagramCaption(media.posts[0].caption, viewport)}
                                                </UserProfilePhotoTitle>
                                                <UserProfilePhotoDate>
                                                    {moment(media.posts[0].timestamp).fromNow()}
                                                </UserProfilePhotoDate>
                                            </UserProfilePhotoCaption>
                                        </UserProfileInstagramPhotosColumn>
                                    )}
                                    {media?.posts.length > 1 && (
                                        <>
                                            <HRSpacer />
                                            <UserProfileInstagramPhotosColumn>
                                                {(media?.posts[1] || media?.posts[2]) && (
                                                    <UserProfileInstagramPhotosRow>
                                                        {media?.posts[1] && (
                                                            <UserProfileInstagramPhotoLarge
                                                                url={media?.posts[1].mediaUrl}
                                                            >
                                                                <UserProfilePhotoCaption>
                                                                    <UserProfilePhotoTitle>
                                                                        {chopStringInstagramCaption(
                                                                            media?.posts[1].caption,
                                                                            viewport
                                                                        )}
                                                                    </UserProfilePhotoTitle>
                                                                    <UserProfilePhotoDate>
                                                                        {moment(media?.posts[1].timestamp).fromNow()}
                                                                    </UserProfilePhotoDate>
                                                                </UserProfilePhotoCaption>
                                                            </UserProfileInstagramPhotoLarge>
                                                        )}
                                                        {media?.posts[2] && (
                                                            <>
                                                                <HRSpacer />
                                                                <UserProfileInstagramPhotoSmall
                                                                    url={media?.posts[2].mediaUrl}
                                                                >
                                                                    <UserProfilePhotoCaption>
                                                                        <UserProfilePhotoTitle>
                                                                            {chopStringInstagramCaption(
                                                                                media?.posts[2].caption,
                                                                                viewport
                                                                            )}
                                                                        </UserProfilePhotoTitle>
                                                                        <UserProfilePhotoDate>
                                                                            {moment(
                                                                                media?.posts[2].timestamp
                                                                            ).fromNow()}
                                                                        </UserProfilePhotoDate>
                                                                    </UserProfilePhotoCaption>
                                                                </UserProfileInstagramPhotoSmall>
                                                            </>
                                                        )}
                                                    </UserProfileInstagramPhotosRow>
                                                )}
                                                {(media?.posts[3] || media?.posts[4]) && (
                                                    <>
                                                        <VRSpacer />
                                                        <UserProfileInstagramPhotosRow>
                                                            {media?.posts[3] && (
                                                                <UserProfileInstagramPhotoSmall
                                                                    url={media?.posts[3].mediaUrl}
                                                                >
                                                                    <UserProfilePhotoCaption>
                                                                        <UserProfilePhotoTitle>
                                                                            {chopStringInstagramCaption(
                                                                                media?.posts[3].caption,
                                                                                viewport
                                                                            )}
                                                                        </UserProfilePhotoTitle>
                                                                        <UserProfilePhotoDate>
                                                                            {moment(
                                                                                media?.posts[3].timestamp
                                                                            ).fromNow()}
                                                                        </UserProfilePhotoDate>
                                                                    </UserProfilePhotoCaption>
                                                                </UserProfileInstagramPhotoSmall>
                                                            )}
                                                            {media?.posts[4] && (
                                                                <>
                                                                    <HRSpacer />
                                                                    <UserProfileInstagramPhotoLarge
                                                                        url={media?.posts[4].mediaUrl}
                                                                    >
                                                                        <UserProfilePhotoCaption>
                                                                            <UserProfilePhotoTitle>
                                                                                {chopStringInstagramCaption(
                                                                                    media?.posts[4].caption,
                                                                                    viewport
                                                                                )}
                                                                            </UserProfilePhotoTitle>
                                                                            <UserProfilePhotoDate>
                                                                                {moment(
                                                                                    media?.posts[4].timestamp
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
                                {user.instagramId && (
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
