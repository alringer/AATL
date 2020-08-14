import { AxiosResponse } from 'axios'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import axios, { UPLOAD_BLOG, USER_PROFILE } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { KeycloakInstance } from 'keycloak-js'
import { useSnackbar } from 'notistack'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import authReducer from 'store/authentication/authentication_reducer'
import { fetchUser } from 'store/user/user_actions'
import { closeUserProfileEditModal } from 'store/userProfileEditModal/userProfileEditModal_actions'
import { query } from 'style/device'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IUserProfile } from 'utilities/types/userProfile'
import UserProfileImageDropzone from '../UserProfileImageDropzone/UserProfileImageDropzone'
import {
    CancelButton,
    CustomDialog,
    MultiInput,
    NameInput,
    SubmitButton,
    TitleInput,
    UserProfileBannerInputsContainer,
    UserProfileBannerLeftContainer,
    UserProfileBannerRightContainer,
    UserProfileEditModalContentContainer,
    UserProfileEditModalDropzoneContainer,
    UserProfileEditModalFooterContainer,
    UserProfileEditModalHeaderContainer,
    UserProfileEditModalHeaderText,
    UserProfileEditModalMainAreaContainer,
    UserProfileEditModalMainContentContainer,
} from './UserProfileEditModal.style'

interface IReduxProps {
    isOpen: boolean
    user: IUserProfile
    closeUserProfileEditModal: () => void
    onSuccess?: () => void
    fetchUser: (keycloak: KeycloakInstance) => void
}
interface IUserProfileEditModalProps extends IReduxProps, IWithAuthInjectedProps {}

const UserProfileEditModal: React.FC<IUserProfileEditModalProps> = ({
    isOpen,
    closeUserProfileEditModal,
    user,
    authenticatedAction,
    getTokenConfig,
    onSuccess,
    fetchUser,
}) => {
    const { enqueueSnackbar } = useSnackbar()

    const userProfileEditModalRef = React.useRef(null)

    const [currentFullName, setCurrentFullName] = React.useState('')
    const [currentOccupation, setCurrentOccupation] = React.useState('')
    const [currentBio, setCurrentBio] = React.useState('')
    const [currentImageCDNURL, setCurrentImageCDNURL] = React.useState('')
    const [isUploadingImage, setUploadingImage] = React.useState(false)

    const handleChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setCurrentFullName(e.target.value)
        } else {
            setCurrentFullName('')
        }
    }
    const handleChangeOccupation = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setCurrentOccupation(e.target.value)
        } else {
            setCurrentOccupation('')
        }
    }
    const handleChangeBio = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setCurrentBio(e.target.value)
        } else {
            setCurrentBio('')
        }
    }

    React.useEffect(() => {
        if (user) {
            setCurrentFullName(
                user.firstName && user.lastName
                    ? user.firstName + ' ' + user.lastName
                    : user.firstName
                    ? user.firstName
                    : user.lastName
                    ? user.lastName
                    : ''
            )
            setCurrentOccupation(user.userByLine)
            setCurrentBio(user.content)
            setCurrentImageCDNURL(user.imageCDNUrl)
        }
    }, [user])

    const handleClickOutsideUserProfileEditModal = (event) => {
        if (userProfileEditModalRef.current && !userProfileEditModalRef.current.contains(event.target)) {
            closeModal()
        }
    }

    const closeModal = () => {
        closeUserProfileEditModal()
    }

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutsideUserProfileEditModal, true)
        return () => {
            document.removeEventListener('click', handleClickOutsideUserProfileEditModal, true)
        }
    }, [])

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
                    axios
                        .post(UPLOAD_BLOG, formData, uploadConfig)
                        .then((res: AxiosResponse<any>) => {
                            console.log('Uploading User Profile to S3: ', res)
                            setCurrentImageCDNURL(res.data.url)
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
        setCurrentImageCDNURL('')
        e.stopPropagation()
    }

    const handleCancel = () => {
        closeModal()
    }
    const handleSave = () => {
        const splitName = currentFullName.trim().split(' ')
        const firstName = splitName.length > 1 ? splitName.slice(0, splitName.length - 1).join(' ') : splitName[0]
        const lastName = splitName.length > 1 ? splitName[splitName.length - 1] : ''

        const token = getTokenConfig()
        const updateUserProfileConfig = {
            headers: {
                Authorization: token,
            },
        }
        let userProfilePayload: IUserProfile = {
            ...user,
            firstName: firstName,
            lastName: lastName,
            userByLine: currentOccupation,
            content: currentBio,
            imageCDNUrl: currentImageCDNURL,
        }
        axios
            .put(USER_PROFILE, userProfilePayload, updateUserProfileConfig)
            .then((res) => {
                console.log('PUT request result for User Profile: ', res)
                enqueueSnackbar('', {
                    content: (
                        <div>
                            <Snackbar
                                type={B.USER_PROFILE_UPDATED.Type}
                                title={B.USER_PROFILE_UPDATED.Title}
                                message={<SnackbarMessageBody>{B.USER_PROFILE_UPDATED.Body}</SnackbarMessageBody>}
                            />
                        </div>
                    ),
                })
                if (onSuccess) {
                    onSuccess()
                }
                const keycloak = authReducer.getState().keycloak
                if (keycloak) {
                    fetchUser(keycloak)
                }
                closeModal()
            })
            .catch((err) => console.log(err))
    }

    return (
        <Media queries={query} defaultMatches={{ mobile: true }}>
            {(matches) => (
                <CustomDialog open={isOpen} fullScreen={matches.laptop || matches.tablet ? false : true} maxWidth="lg">
                    <UserProfileEditModalContentContainer ref={userProfileEditModalRef}>
                        <UserProfileEditModalHeaderContainer>
                            <UserProfileEditModalHeaderText>Edit Profile</UserProfileEditModalHeaderText>
                        </UserProfileEditModalHeaderContainer>
                        <UserProfileEditModalMainAreaContainer>
                            <UserProfileEditModalMainContentContainer>
                                <UserProfileBannerInputsContainer>
                                    <UserProfileBannerLeftContainer>
                                        <UserProfileEditModalDropzoneContainer>
                                            <UserProfileImageDropzone
                                                handleDrop={handleDrop}
                                                handleRemove={handleRemove}
                                                imageCDNUrl={currentImageCDNURL}
                                            />
                                        </UserProfileEditModalDropzoneContainer>
                                    </UserProfileBannerLeftContainer>
                                    <UserProfileBannerRightContainer>
                                        <NameInput
                                            value={currentFullName}
                                            label={`Full Name`}
                                            onChange={handleChangeFullName}
                                            variant="outlined"
                                            autoFocus={true}
                                            // disabled={loading}
                                            // InputProps={
                                            //     errors.email !== ''
                                            //         ? {
                                            //               endAdornment: (
                                            //                   <InputAdornment position="end">
                                            //                       <Tooltip title={errors.email} placement="top">
                                            //                           <ErrorIcon />
                                            //                       </Tooltip>
                                            //                   </InputAdornment>
                                            //               ),
                                            //           }
                                            //         : null
                                        />
                                        <TitleInput
                                            value={currentOccupation}
                                            label={`Occupation`}
                                            onChange={handleChangeOccupation}
                                            variant="outlined"
                                            // disabled={loading}
                                            // InputProps={
                                            //     errors.email !== ''
                                            //         ? {
                                            //               endAdornment: (
                                            //                   <InputAdornment position="end">
                                            //                       <Tooltip title={errors.email} placement="top">
                                            //                           <ErrorIcon />
                                            //                       </Tooltip>
                                            //                   </InputAdornment>
                                            //               ),
                                            //           }
                                            //         : null
                                        />
                                        <MultiInput
                                            value={currentBio}
                                            label={`Bio`}
                                            onChange={handleChangeBio}
                                            variant="outlined"
                                            multiline
                                            // disabled={loading}
                                            // InputProps={
                                            //     errors.email !== ''
                                            //         ? {
                                            //               endAdornment: (
                                            //                   <InputAdornment position="end">
                                            //                       <Tooltip title={errors.email} placement="top">
                                            //                           <ErrorIcon />
                                            //                       </Tooltip>
                                            //                   </InputAdornment>
                                            //               ),
                                            //           }
                                            //         : null
                                        />
                                    </UserProfileBannerRightContainer>
                                </UserProfileBannerInputsContainer>
                            </UserProfileEditModalMainContentContainer>
                        </UserProfileEditModalMainAreaContainer>
                        <UserProfileEditModalFooterContainer>
                            {/* <UserProfileEditModalFooterRightContainer> */}
                            <CancelButton onClick={handleCancel}>{S.BUTTON_LABELS.Cancel}</CancelButton>
                            <SubmitButton onClick={handleSave}>
                                {/* disabled={!titleInput || isLoading} */}
                                SAVE
                            </SubmitButton>
                            {/* </UserProfileEditModalFooterRightContainer> */}
                        </UserProfileEditModalFooterContainer>
                    </UserProfileEditModalContentContainer>
                </CustomDialog>
            )}
        </Media>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isOpen: state.userProfileEditModalReducer.isOpen,
    user: state.userReducer.user,
    onSuccess: state.userProfileEditModalReducer.onSuccess,
})
const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            closeUserProfileEditModal,
            fetchUser,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(UserProfileEditModal))
