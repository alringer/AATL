import { Tooltip } from '@material-ui/core'
import CameraUploadHoveredIcon from 'assets/user-profile-hovered-camera-icon.svg'
import DefaultUserProfileImage from 'assets/user-profile-icon.svg'
import CameraUploadIcon from 'assets/user-profile-upload-icon.svg'
import * as S from 'constants/StringConstants'
import React from 'react'
import Dropzone from 'react-dropzone'
import {
    UserProfileBannerCameraImage,
    UserProfileBannerCameraImageContainer,
    UserProfileBannerImage,
    UserProfileImageDropzoneContainer,
    UserProfileImageDropzoneSection,
} from './UserProfileImageDropzone.style'

interface IImageDropzoneProps {
    handleDrop: (acceptedFile: any) => void
    handleRemove: (e: React.MouseEvent<HTMLElement>) => void
    imageCDNUrl: string
}

const UserProfileImageDropzone: React.FC<IImageDropzoneProps> = ({ imageCDNUrl, handleDrop, handleRemove }) => {
    const [isImageHovered, setImageHovered] = React.useState(false)
    const [isCameraHovered, setCameraHovered] = React.useState(false)

    const handleMouseEnter = () => {
        setImageHovered(true)
    }

    const handleMouseLeave = () => {
        setImageHovered(false)
    }

    const handleCameraMouseEnter = () => {
        setCameraHovered(true)
    }
    const handleCameraMouseLeave = () => {
        setCameraHovered(false)
    }

    const renderUserProfileDropzoneComponent = (getRootProps, getInputProps) => {
        return (
            <UserProfileImageDropzoneSection>
                <UserProfileImageDropzoneContainer
                    {...getRootProps()}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <input {...getInputProps()} />
                    <UserProfileBannerImage
                        src={imageCDNUrl ? imageCDNUrl : DefaultUserProfileImage}
                        alt="user-profile-image"
                    />
                    {imageCDNUrl && isImageHovered ? (
                        <Tooltip arrow={true} title={S.TOOL_TIPS.RemoveProfile} placement="top">
                            <UserProfileBannerCameraImageContainer
                                onMouseEnter={handleCameraMouseEnter}
                                onMouseLeave={handleCameraMouseLeave}
                                onClick={handleRemove}
                            >
                                <UserProfileBannerCameraImage
                                    src={isCameraHovered ? CameraUploadHoveredIcon : CameraUploadIcon}
                                    alt="user-profile-camera-image"
                                />
                            </UserProfileBannerCameraImageContainer>
                        </Tooltip>
                    ) : null}
                </UserProfileImageDropzoneContainer>
            </UserProfileImageDropzoneSection>
        )
    }

    return (
        <Dropzone onDrop={handleDrop} accept="image/png" minSize={0} maxSize={5242880} multiple={false}>
            {({ getRootProps, getInputProps, isDragReject, acceptedFiles }) => {
                return imageCDNUrl ? (
                    renderUserProfileDropzoneComponent(getRootProps, getInputProps)
                ) : (
                    <Tooltip arrow={true} title={S.TOOL_TIPS.UploadProfile} placement="top">
                        {renderUserProfileDropzoneComponent(getRootProps, getInputProps)}
                    </Tooltip>
                )
            }}
        </Dropzone>
    )
}

export default UserProfileImageDropzone
