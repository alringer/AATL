import UserProfileInstagramIcon from 'assets/user-profile-instagram-icon.svg'
import React from 'react'
import Media from 'react-media'
import { query } from 'style/device'
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

const UserProfileBanner = () => {
    const [imageFile, setImageFile] = React.useState(null)
    // Input States
    const [userInformation, setUserInformation] = React.useState({
        userName: 'Jane Doe',
        userTitle: 'Magazine Writer & Actor',
        userDescription:
            'A wannabe musician and later fake life coach, I am a "work-shy freeloader" who has been unemployed for most of my life. I love good food and am obsessed with finding the perfect item on any menu. I love burgers, kebabs, curry, sushi, fish and chips, falafel, wraps, cupcakes, unhealthy salads and alcohol.',
    })
    const [editing, setEditing] = React.useState({
        userName: false,
        userTitle: false,
        userDescription: false,
    })

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            acceptedFiles.forEach((file) => {
                console.log('TODO: Call API to upload the image and get the updated user profile')
                // TODO: Call API to upload the image and get the updated user profile
                const reader = new FileReader()
                reader.onabort = () => console.log('file reading was aborted')
                reader.onerror = () => console.log('file reading has failed')
                reader.onload = () => {
                    // Do whatever you want with the file contents
                    const binaryStr = reader.result
                    // console.log(binaryStr)
                }
                reader.readAsArrayBuffer(file)
            })
            setImageFile(acceptedFiles[0])
        }
    }

    const handleRemove = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        console.log('TODO: Call API to remove the profile image and get the updated user profile')
        setImageFile(null)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInformation({ ...userInformation, [e.target.id]: e.target.value })
    }

    const handleTextFieldKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'Enter':
                setEditing({ ...editing, [e.currentTarget.id]: false })
                break
            case 'Escape':
                setEditing({ ...editing, [e.currentTarget.id]: false })
                break
            default:
                break
        }
    }

    const handleSetEditing = (e: React.MouseEvent<HTMLElement>) => {
        setEditing({ ...editing, [e.currentTarget.id]: true })
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditing({ ...editing, [e.currentTarget.id]: false })
    }

    const renderHeaderAndDescription = () => {
        return (
            <UserProfileContentHeaderContainer>
                <UserProfileNameContainer>
                    {editing.userName ? (
                        <UserProfileNameInput
                            id="userName"
                            value={userInformation.userName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleTextFieldKeyDown}
                            autoFocus={true}
                            wrap="soft"
                        />
                    ) : (
                        <UserProfileName id="userName" onClick={handleSetEditing}>
                            {userInformation.userName}
                        </UserProfileName>
                    )}
                </UserProfileNameContainer>
                <UserProfileTitleContainer>
                    {editing.userTitle ? (
                        <UserProfileTitleInput
                            id="userTitle"
                            value={userInformation.userTitle}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleTextFieldKeyDown}
                            autoFocus={true}
                            wrap="soft"
                        />
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
            <Media queries={query} defaultMatches={{ laptop: true }}>
                {(matches) => (
                    <>
                        <UserProfileMainInformationContainer>
                            <UserProfileImageContainer>
                                <UserProfileImageDropzone
                                    handleDrop={handleDrop}
                                    handleRemove={handleRemove}
                                    imageFile={imageFile}
                                />
                            </UserProfileImageContainer>
                            {matches.mobile && renderHeaderAndDescription()}
                        </UserProfileMainInformationContainer>
                        <UserProfileContentContainer>
                            {(matches.laptop || matches.tablet) && renderHeaderAndDescription()}
                            <UserProfileContentBodyContainer>
                                <UserProfileDescriptionContainer>
                                    {editing.userDescription ? (
                                        <UserProfileDescriptionInput
                                            id="userDescription"
                                            value={userInformation.userDescription}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            onKeyDown={handleTextFieldKeyDown}
                                            autoFocus={true}
                                            wrap="soft"
                                        />
                                    ) : (
                                        <UserProfileDescription id="userDescription" onClick={handleSetEditing}>
                                            {userInformation.userDescription}
                                        </UserProfileDescription>
                                    )}
                                </UserProfileDescriptionContainer>
                                <UserProfileNumberOfRecommendations>
                                    Recommends: 266 Places
                                </UserProfileNumberOfRecommendations>
                                <UserProfileInstagramContainer href="https://instagram.com" target="_blank">
                                    <UserProfileInstagramIconImg
                                        src={UserProfileInstagramIcon}
                                        alt="user-profile-instagram-icon"
                                    />
                                    <UserProfileInstagram>@JaneDoe</UserProfileInstagram>
                                </UserProfileInstagramContainer>
                            </UserProfileContentBodyContainer>
                        </UserProfileContentContainer>
                    </>
                )}
            </Media>
        </UserProfileBannerContainer>
    )
}

export default UserProfileBanner
