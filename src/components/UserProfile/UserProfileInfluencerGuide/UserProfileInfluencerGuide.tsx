import * as S from 'constants/StringConstants'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { openSearchModal } from 'store/searchModal/searchModal_actions'
import { openUserProfileEditModal } from 'store/userProfileEditModal/userProfileEditModal_actions'
import { OpenUserProfileEditModalPayload } from 'store/userProfileEditModal/userProfileEditModal_types'
import { IUserProfile } from 'utilities/types/userProfile'
import {
    UserProfileInfluencerGuideButton,
    UserProfileInfluencerGuideContainer,
    UserProfileInfluencerGuideHeader,
    UserProfileInfluencerGuideIconsContainer,
    UserProfileInfluencerGuideIconSpan,
    UserProfileInfluencerGuideIconText,
    UserProfileInfluencerGuideMessage,
    UserProfileInfluencerGuideRecommendationIconsContainer,
    UserProfileInfluencerGuideRecommendationWritten,
    UserProfileInfluencerGuideTextsContainer,
} from './UserProfileInfluencerGuide.style'

interface IReduxProps {
    user: IUserProfile | null
    openUserProfileEditModal: (payload: OpenUserProfileEditModalPayload) => void
    openSearchModal: () => void
}

interface IUserProfileInfluencerGuideProps extends IReduxProps {
    refreshUser: () => void
}

const UserProfileInfluencerGuide: React.FC<IUserProfileInfluencerGuideProps> = ({
    user,
    openUserProfileEditModal,
    refreshUser,
    openSearchModal,
}) => {
    const [isComplete, setComplete] = React.useState(false)
    const [recommendationsCount, setRecommendationsCount] = React.useState(2)

    React.useEffect(() => {
        if (user && (user.firstName || user.lastName) && user.imageCDNUrl && user.content && user.userByLine) {
            setComplete(true)
        } else {
            setComplete(false)
        }
    }, [user])

    const handleEditProfile = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        openUserProfileEditModal({
            onSuccess: refreshUser,
        })
    }
    const handleWriteRecommendation = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        openSearchModal()
    }

    const renderIncompleteComponent = () => {
        return (
            <UserProfileInfluencerGuideTextsContainer>
                <UserProfileInfluencerGuideHeader>
                    {S.USER_PROFILE_INFLUENCER_GUIDE.Incomplete.Title}
                </UserProfileInfluencerGuideHeader>
                <UserProfileInfluencerGuideMessage>
                    {S.USER_PROFILE_INFLUENCER_GUIDE.Incomplete.Message}
                </UserProfileInfluencerGuideMessage>
                <UserProfileInfluencerGuideButton onClick={handleEditProfile}>
                    {S.USER_PROFILE_INFLUENCER_GUIDE.Incomplete.ButtonLabel}
                </UserProfileInfluencerGuideButton>
            </UserProfileInfluencerGuideTextsContainer>
        )
    }
    const renderCompleteComponent = () => {
        return (
            <>
                <UserProfileInfluencerGuideTextsContainer>
                    <UserProfileInfluencerGuideHeader>
                        {S.USER_PROFILE_INFLUENCER_GUIDE.Complete.Title}
                    </UserProfileInfluencerGuideHeader>
                    <UserProfileInfluencerGuideMessage>
                        {S.USER_PROFILE_INFLUENCER_GUIDE.Complete.Message}
                    </UserProfileInfluencerGuideMessage>
                    <UserProfileInfluencerGuideButton onClick={handleWriteRecommendation}>
                        {S.USER_PROFILE_INFLUENCER_GUIDE.Complete.ButtonLabel}
                    </UserProfileInfluencerGuideButton>
                </UserProfileInfluencerGuideTextsContainer>
                <UserProfileInfluencerGuideIconsContainer>
                    <p>Badge</p>
                    <UserProfileInfluencerGuideRecommendationIconsContainer>
                        <UserProfileInfluencerGuideIconSpan recommendationsCount={recommendationsCount} target={1}>
                            <UserProfileInfluencerGuideIconText>
                                {S.USER_PROFILE_INFLUENCER_GUIDE.Complete.First}
                            </UserProfileInfluencerGuideIconText>
                        </UserProfileInfluencerGuideIconSpan>
                        <UserProfileInfluencerGuideIconSpan recommendationsCount={recommendationsCount} target={2}>
                            <UserProfileInfluencerGuideIconText>
                                {S.USER_PROFILE_INFLUENCER_GUIDE.Complete.Second}
                            </UserProfileInfluencerGuideIconText>
                        </UserProfileInfluencerGuideIconSpan>
                        <UserProfileInfluencerGuideIconSpan recommendationsCount={recommendationsCount} target={3}>
                            <UserProfileInfluencerGuideIconText>
                                {S.USER_PROFILE_INFLUENCER_GUIDE.Complete.Third}
                            </UserProfileInfluencerGuideIconText>
                        </UserProfileInfluencerGuideIconSpan>
                    </UserProfileInfluencerGuideRecommendationIconsContainer>
                    <UserProfileInfluencerGuideRecommendationWritten>
                        {S.USER_PROFILE_INFLUENCER_GUIDE.Complete.RecommendationWritten}
                    </UserProfileInfluencerGuideRecommendationWritten>
                </UserProfileInfluencerGuideIconsContainer>
            </>
        )
    }

    return (
        <UserProfileInfluencerGuideContainer>
            {isComplete ? renderCompleteComponent() : renderIncompleteComponent()}
        </UserProfileInfluencerGuideContainer>
    )
}

const mapStateToProps = (state: StoreState) => ({
    user: state.userReducer.user,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            openUserProfileEditModal,
            openSearchModal,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(UserProfileInfluencerGuide)
