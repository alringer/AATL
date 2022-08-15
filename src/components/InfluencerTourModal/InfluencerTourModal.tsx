import {
    InfluencerTourModalContainer,
    InfluencerTourModalInnerContainer,
} from 'components/InfluencerTourModal/InfluencerTourModal.style'
import { CancelButton, SubmitButton } from 'components/ListModal/ListModal.style'
import {
    MultiInput,
    NameInput,
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
} from 'components/UserProfile/UserProfileEditModal/UserProfileEditModal.style'
import UserProfileImageDropzone from 'components/UserProfile/UserProfileImageDropzone/UserProfileImageDropzone'
import * as S from 'constants/StringConstants'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'

interface IReduxProps {
    isTourOpen: boolean
    isModalOpen: boolean
}

interface IInfluencerTourModalProps extends IReduxProps {}

const EditUserProfileOverlay: React.FC<IInfluencerTourModalProps> = ({ isModalOpen, isTourOpen }) => {
    const [currentFullName, setCurrentFullName] = React.useState('')
    const [currentOccupation, setCurrentOccupation] = React.useState('')
    const [currentBio, setCurrentBio] = React.useState('')
    const [currentImageCDNURL, setCurrentImageCDNURL] = React.useState('')

    return (
        <InfluencerTourModalContainer isVisible={isModalOpen}>
            <InfluencerTourModalInnerContainer>
                <UserProfileEditModalContentContainer>
                    <UserProfileEditModalHeaderContainer>
                        <UserProfileEditModalHeaderText>
                            {S.USER_PROFILE_BANNER.EditProfile}
                        </UserProfileEditModalHeaderText>
                    </UserProfileEditModalHeaderContainer>
                    <UserProfileEditModalMainAreaContainer>
                        <UserProfileEditModalMainContentContainer>
                            <UserProfileBannerInputsContainer>
                                <UserProfileBannerLeftContainer>
                                    <UserProfileEditModalDropzoneContainer
                                        data-tut={S.PRELAUNCH_TOUR.StepThree.Selector}
                                    >
                                        <UserProfileImageDropzone
                                            handleDrop={() => {}}
                                            handleRemove={() => {}}
                                            imageCDNUrl={currentImageCDNURL}
                                            isUploadingImage={false}
                                        />
                                    </UserProfileEditModalDropzoneContainer>
                                </UserProfileBannerLeftContainer>
                                <UserProfileBannerRightContainer data-tut={S.PRELAUNCH_TOUR.StepTwo.Selector}>
                                    <NameInput
                                        value={currentFullName}
                                        label={`Full Name`}
                                        // onChange={handleChangeFullName}
                                        variant="outlined"
                                        autoFocus={true}
                                        // disabled={isSaving}
                                    />
                                    <TitleInput
                                        value={currentOccupation}
                                        label={`Tagline`}
                                        // onChange={handleChangeOccupation}
                                        variant="outlined"
                                        // disabled={isSaving}
                                    />
                                    <MultiInput
                                        value={currentBio}
                                        label={`Bio`}
                                        // onChange={handleChangeBio}
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        multiline
                                        // disabled={isSaving}
                                        placeholder={S.INPUT_PLACEHOLDERS.UserProfileBio}
                                    />
                                </UserProfileBannerRightContainer>
                            </UserProfileBannerInputsContainer>
                        </UserProfileEditModalMainContentContainer>
                    </UserProfileEditModalMainAreaContainer>
                    <UserProfileEditModalFooterContainer>
                        <CancelButton>{S.BUTTON_LABELS.Cancel}</CancelButton>
                        <SubmitButton>{S.BUTTON_LABELS.Save}</SubmitButton>
                    </UserProfileEditModalFooterContainer>
                </UserProfileEditModalContentContainer>
            </InfluencerTourModalInnerContainer>
        </InfluencerTourModalContainer>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isTourOpen: state.influencerTourModalReducer.isTourOpen,
    isModalOpen: state.influencerTourModalReducer.isOpen,
})

export default reduxConnect(mapStateToProps)(EditUserProfileOverlay)
