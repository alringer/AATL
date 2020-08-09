import { Tooltip } from '@material-ui/core'
import DefaultUserProfileImage from 'assets/user-profile-icon.svg'
import UserProfileInstagramIcon from 'assets/user-profile-instagram-icon.svg'
import { AxiosResponse } from 'axios'
import Image from 'components/Image/Image'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import axios, { UPLOAD_BLOG, USER_PROFILE } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { useSnackbar } from 'notistack'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'
import { query } from 'style/device'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IUserProfile } from 'utilities/types/userProfile'
import UserProfileImageDropzone from '../UserProfileImageDropzone/UserProfileImageDropzone'
import {
    UserProfileBannerContainer,
    UserProfileContentBodyContainer,
    UserProfileContentContainer,
    UserProfileContentHeaderContainer,
    UserProfileDescription,
    UserProfileDescriptionContainer,
    UserProfileDescriptionInput,
    UserProfileImageContainer,
    UserProfileInstagram,
    UserProfileInstagramContainer,
    UserProfileInstagramIconImg,
    UserProfileMainInformationContainer,
    UserProfileName,
    UserProfileNameContainer,
    UserProfileNameInput,
    UserProfileNumberOfRecommendations,
    UserProfileTitle,
    UserProfileTitleContainer,
    UserProfileTitleInput,
} from './UserProfileBanner.style'

interface IReduxProps {
    currentUser: IUserProfile | null
}
interface IUserProfileBannerProps extends IReduxProps, IWithAuthInjectedProps {
    user: IUserProfile
}

const UserProfileBanner: React.FC<IUserProfileBannerProps> = ({
    user,
    getTokenConfig,
    currentUser,
    authenticatedAction,
}) => {
    const { enqueueSnackbar } = useSnackbar()
    const isOwner = currentUser && user && currentUser.id === user.id
    const InputIDEnums = {
        userName: 'userName',
        userTitle: 'userTitle',
        userDescription: 'userDescription',
    }
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
    const [editing, setEditing] = React.useState({
        userName: false,
        userTitle: false,
        userDescription: false,
    })
    const [isUploading, setUploadingImage] = React.useState(false)

    const handleDrop = (acceptedFiles: any) => {
        authenticatedAction(() => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                acceptedFiles.forEach((file) => {
                    const formData = new FormData()
                    formData.append('file', file)
                    const token = getTokenConfig()
                    const uploadConfig = token
                        ? {
                              headers: {
                                  'content-type': 'multipart/form-data',
                                  Authorization: token,
                              },
                          }
                        : {
                              headers: {
                                  'content-type': 'multipart/form-data',
                              },
                          }
                    setUploadingImage(true)
                    let imageURL = ''
                    axios
                        .post(UPLOAD_BLOG, formData, uploadConfig)
                        .then((res: AxiosResponse<any>) => {
                            console.log('Uploading User Profile to S3: ', res)
                            imageURL = res.data.url
                            const updateUserProfileConfig = {
                                headers: {
                                    Authorization: token,
                                },
                            }
                            const userProfilePayload = {
                                ...user,
                                imageCDNUrl: imageURL,
                            }
                            axios
                                .put(USER_PROFILE, userProfilePayload, updateUserProfileConfig)
                                .then((res) => {
                                    console.log('PUT request result for User Profile: ', res)
                                    setViewedUser(res.data)
                                    enqueueSnackbar('', {
                                        content: (
                                            <div>
                                                <Snackbar
                                                    type={B.USER_PROFILE_UPDATED_PHOTO.Type}
                                                    title={B.USER_PROFILE_UPDATED_PHOTO.Title}
                                                    message={
                                                        <SnackbarMessageBody>
                                                            {B.USER_PROFILE_UPDATED_PHOTO.Body}
                                                        </SnackbarMessageBody>
                                                    }
                                                />
                                            </div>
                                        ),
                                    })
                                })
                                .catch((err) => console.log(err))
                        })
                        .catch((err) => console.log(err))
                        .finally(() => {
                            setUploadingImage(false)
                        })
                    const reader = new FileReader()

                    reader.onabort = () => console.log('file reading was aborted')
                    reader.onerror = () => console.log('file reading has failed')
                    reader.onload = () => {
                        // Do whatever you want with the file contents
                        const binaryStr = reader.result
                    }
                    reader.readAsArrayBuffer(file)
                })
            }
        })
    }

    const handleRemove = (e: React.MouseEvent<HTMLElement>) => {
        authenticatedAction(() => {
            const token = getTokenConfig()
            const userProfilePayload = {
                ...user,
                imageCDNUrl: null,
            }
            const updateUserProfileConfig = {
                headers: {
                    Authorization: token,
                },
            }
            axios
                .put(USER_PROFILE, userProfilePayload, updateUserProfileConfig)
                .then((res) => {
                    console.log('PUT request result for User Profile: ', res)
                    setViewedUser(res.data)
                    enqueueSnackbar('', {
                        content: (
                            <div>
                                <Snackbar
                                    type={B.USER_PROFILE_UPDATED_PHOTO.Type}
                                    title={B.USER_PROFILE_UPDATED_PHOTO.Title}
                                    message={
                                        <SnackbarMessageBody>{B.USER_PROFILE_UPDATED_PHOTO.Body}</SnackbarMessageBody>
                                    }
                                />
                            </div>
                        ),
                    })
                })
                .catch((err) => console.log(err))
        })
        e.stopPropagation()
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInformation({ ...userInformation, [e.target.id]: e.target.value })
    }

    const handleTextFieldKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'Enter':
                setEditing({ ...editing, [e.currentTarget.id]: false })
                authenticatedAction(() => {
                    postNewUserInformation(e)
                })

                break
            case 'Escape':
                setEditing({ ...editing, [e.currentTarget.id]: false })
                setUserInformation({
                    userName:
                        viewedUser.firstName && viewedUser.lastName
                            ? viewedUser.firstName + ' ' + viewedUser.lastName
                            : viewedUser.firstName
                            ? viewedUser.firstName
                            : viewedUser.lastName
                            ? viewedUser.lastName
                            : '',
                    userTitle: viewedUser.userByLine ? viewedUser.userByLine : '',
                    userDescription: viewedUser.content ? viewedUser.content : '',
                })
                break
            default:
                break
        }
    }

    const handleSetEditing = (e: React.MouseEvent<HTMLElement>) => {
        authenticatedAction(() => {
            setEditing({ ...editing, [e.currentTarget.id]: true })
        })
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setEditing({ ...editing, [e.currentTarget.id]: false })
        authenticatedAction(() => {
            postNewUserInformation(e)
        })
    }

    const postNewUserInformation = (e: any) => {
        const token = getTokenConfig()
        const updateUserProfileConfig = {
            headers: {
                Authorization: token,
            },
        }
        if (e.currentTarget.id === InputIDEnums.userName) {
            const userInput = String(e.currentTarget.value)
            if (userInput) {
                const splitName = userInput.trim().split(' ')
                const firstName =
                    splitName.length > 1 ? splitName.slice(0, splitName.length - 1).join(' ') : splitName[0]
                const lastName = splitName.length > 1 ? splitName[splitName.length - 1] : ''

                let userProfilePayload: IUserProfile = {
                    ...user,
                    firstName: firstName,
                    lastName: lastName,
                }
                axios
                    .put(USER_PROFILE, userProfilePayload, updateUserProfileConfig)
                    .then((res) => {
                        console.log('PUT request result for User Profile: ', res)
                        setViewedUser(res.data)
                        setUserInformation({
                            userName:
                                res.data.firstName && res.data.lastName
                                    ? res.data.firstName + ' ' + res.data.lastName
                                    : res.data.firstName
                                    ? res.data.firstName
                                    : res.data.lastName
                                    ? res.data.lastName
                                    : '',
                            userTitle: res.data.userByLine ? res.data.userByLine : '',
                            userDescription: res.data.content ? res.data.content : '',
                        })
                        enqueueSnackbar('', {
                            content: (
                                <div>
                                    <Snackbar
                                        type={B.USER_PROFILE_UPDATED_NAME.Type}
                                        title={B.USER_PROFILE_UPDATED_NAME.Title}
                                        message={
                                            <SnackbarMessageBody>
                                                {B.USER_PROFILE_UPDATED_NAME.Body}
                                            </SnackbarMessageBody>
                                        }
                                    />
                                </div>
                            ),
                        })
                    })
                    .catch((err) => console.log(err))
            } else {
                // TODO: Handle if the user input is empty
                setUserInformation({
                    userName:
                        viewedUser.firstName && viewedUser.lastName
                            ? viewedUser.firstName + ' ' + viewedUser.lastName
                            : viewedUser.firstName
                            ? viewedUser.firstName
                            : viewedUser.lastName
                            ? viewedUser.lastName
                            : '',
                    userTitle: viewedUser.userByLine ? viewedUser.userByLine : '',
                    userDescription: viewedUser.content ? viewedUser.content : '',
                })
            }
        } else if (e.currentTarget.id === InputIDEnums.userTitle) {
            let userProfilePayload: IUserProfile = {
                ...user,
                userByLine: e.currentTarget.value,
            }
            axios
                .put(USER_PROFILE, userProfilePayload, updateUserProfileConfig)
                .then((res) => {
                    console.log('PUT request result for User Profile: ', res)
                    setViewedUser(res.data)
                    setUserInformation({
                        userName:
                            res.data.firstName && res.data.lastName
                                ? res.data.firstName + ' ' + res.data.lastName
                                : res.data.firstName
                                ? res.data.firstName
                                : res.data.lastName
                                ? res.data.lastName
                                : '',
                        userTitle: res.data.userByLine ? res.data.userByLine : '',
                        userDescription: res.data.content ? res.data.content : '',
                    })
                    enqueueSnackbar('', {
                        content: (
                            <div>
                                <Snackbar
                                    type={B.USER_PROFILE_UPDATED_TITLE.Type}
                                    title={B.USER_PROFILE_UPDATED_TITLE.Title}
                                    message={
                                        <SnackbarMessageBody>{B.USER_PROFILE_UPDATED_TITLE.Body}</SnackbarMessageBody>
                                    }
                                />
                            </div>
                        ),
                    })
                })
                .catch((err) => console.log(err))
        } else if (e.currentTarget.id === InputIDEnums.userDescription) {
            let userProfilePayload: IUserProfile = {
                ...user,
                content: e.currentTarget.value,
            }
            axios
                .put(USER_PROFILE, userProfilePayload, updateUserProfileConfig)
                .then((res) => {
                    console.log('PUT request result for User Profile: ', res)
                    setViewedUser(res.data)
                    setUserInformation({
                        userName:
                            res.data.firstName && res.data.lastName
                                ? res.data.firstName + ' ' + res.data.lastName
                                : res.data.firstName
                                ? res.data.firstName
                                : res.data.lastName
                                ? res.data.lastName
                                : '',
                        userTitle: res.data.userByLine ? res.data.userByLine : '',
                        userDescription: res.data.content ? res.data.content : '',
                    })
                    enqueueSnackbar('', {
                        content: (
                            <div>
                                <Snackbar
                                    type={B.USER_PROFILE_UPDATED_DESCRIPTION.Type}
                                    title={B.USER_PROFILE_UPDATED_DESCRIPTION.Title}
                                    message={
                                        <SnackbarMessageBody>
                                            {B.USER_PROFILE_UPDATED_DESCRIPTION.Body}
                                        </SnackbarMessageBody>
                                    }
                                />
                            </div>
                        ),
                    })
                })
                .catch((err) => console.log(err))
        }
    }

    const renderHeaderAndDescription = () => {
        return (
            <UserProfileContentHeaderContainer>
                <UserProfileNameContainer>
                    {isOwner ? (
                        editing.userName ? (
                            <UserProfileNameInput
                                id={InputIDEnums.userName}
                                value={userInformation.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onKeyDown={handleTextFieldKeyDown}
                                autoFocus={true}
                                wrap="soft"
                            />
                        ) : (
                            <Tooltip arrow={true} title={S.TOOL_TIPS.ProfileNameEdit} placement="top">
                                <UserProfileName id="userName" onClick={handleSetEditing}>
                                    {userInformation.userName}
                                </UserProfileName>
                            </Tooltip>
                        )
                    ) : (
                        <UserProfileName id="userName" onClick={handleSetEditing}>
                            {userInformation.userName}
                        </UserProfileName>
                    )}
                </UserProfileNameContainer>
                <UserProfileTitleContainer>
                    {isOwner ? (
                        editing.userTitle ? (
                            <UserProfileTitleInput
                                id={InputIDEnums.userTitle}
                                value={userInformation.userTitle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onKeyDown={handleTextFieldKeyDown}
                                placeholder={S.USER_PROFILE_BANNER.EmptyMessageByLine}
                                autoFocus={true}
                                wrap="soft"
                            />
                        ) : !userInformation.userTitle ? (
                            <Tooltip arrow={true} title={S.TOOL_TIPS.ProfileByLineEdit} placement="top">
                                <UserProfileTitle id="userTitle" onClick={handleSetEditing}>
                                    {S.USER_PROFILE_BANNER.EmptyMessageByLine}
                                </UserProfileTitle>
                            </Tooltip>
                        ) : (
                            <Tooltip arrow={true} title={S.TOOL_TIPS.ProfileByLineEdit} placement="top">
                                <UserProfileTitle id="userTitle" onClick={handleSetEditing}>
                                    {userInformation.userTitle}
                                </UserProfileTitle>
                            </Tooltip>
                        )
                    ) : (
                        <UserProfileTitle id="userTitle" onClick={handleSetEditing}>
                            {userInformation.userTitle}
                        </UserProfileTitle>
                    )}
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
                            <UserProfileImageContainer>
                                {isOwner ? (
                                    <UserProfileImageDropzone
                                        handleDrop={handleDrop}
                                        handleRemove={handleRemove}
                                        imageCDNUrl={viewedUser.imageCDNUrl}
                                    />
                                ) : (
                                    <Image
                                        src={viewedUser.imageCDNUrl ? viewedUser.imageCDNUrl : DefaultUserProfileImage}
                                        alt="user-profile-image"
                                    />
                                )}
                            </UserProfileImageContainer>
                            {matches.mobile && renderHeaderAndDescription()}
                        </UserProfileMainInformationContainer>
                        <UserProfileContentContainer>
                            {(matches.laptop || matches.tablet) && renderHeaderAndDescription()}
                            <UserProfileContentBodyContainer>
                                <UserProfileDescriptionContainer>
                                    {isOwner ? (
                                        editing.userDescription ? (
                                            <UserProfileDescriptionInput
                                                id={InputIDEnums.userDescription}
                                                value={userInformation.userDescription}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                onKeyDown={handleTextFieldKeyDown}
                                                autoFocus={true}
                                                wrap="soft"
                                                placeholder={S.USER_PROFILE_BANNER.EmptyMessageDescription}
                                            />
                                        ) : !userInformation.userDescription ? (
                                            <Tooltip
                                                arrow={true}
                                                title={S.TOOL_TIPS.ProfileDescriptionEdit}
                                                placement="top"
                                            >
                                                <UserProfileDescription id="userDescription" onClick={handleSetEditing}>
                                                    {S.USER_PROFILE_BANNER.EmptyMessageDescription}
                                                </UserProfileDescription>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip
                                                arrow={true}
                                                title={S.TOOL_TIPS.ProfileDescriptionEdit}
                                                placement="top"
                                            >
                                                <UserProfileDescription id="userDescription" onClick={handleSetEditing}>
                                                    {userInformation.userDescription}
                                                </UserProfileDescription>
                                            </Tooltip>
                                        )
                                    ) : (
                                        <UserProfileDescription id="userDescription">
                                            {userInformation.userDescription}
                                        </UserProfileDescription>
                                    )}
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

export default reduxConnect(mapStateToProps)(withAuth(UserProfileBanner))
