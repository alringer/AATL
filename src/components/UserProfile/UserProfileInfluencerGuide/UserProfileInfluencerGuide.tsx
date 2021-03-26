import UnlockedFoodie from 'assets/foodie-badge-shining.svg'
import LockedFoodie from 'assets/foodie-founder-locked.svg'
import axios, { FETCH_USER_RECOMMENDATIONS } from 'config/AxiosConfig'
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
    UserProfileInfluencerGuideLockedIcon,
    UserProfileInfluencerGuideMessage,
    UserProfileInfluencerGuideRecommendationIconsContainer,
    UserProfileInfluencerGuideRecommendationWritten,
    UserProfileInfluencerGuideTextsContainer,
    UserProfileInfluencerGuideUnlockedIcon,
} from './UserProfileInfluencerGuide.style'

interface IReduxProps {
    userMe: IUserProfile | null
    openUserProfileEditModal: (payload: OpenUserProfileEditModalPayload) => void
    openSearchModal: () => void
}

interface IUserProfileInfluencerGuideProps extends IReduxProps {
    user: IUserProfile | null
    refreshUser: () => void
}

const UserProfileInfluencerGuide: React.FC<IUserProfileInfluencerGuideProps> = ({
    user,
    userMe,
    openUserProfileEditModal,
    refreshUser,
    openSearchModal,
}) => {
    const [isComplete, setComplete] = React.useState(false)
    const [recommendationsCount, setRecommendationsCount] = React.useState(0)
    const [isLocked, setLocked] = React.useState(true)
    const [isLockedComponentsVisible, setLockedComponentsVisible] = React.useState(true)

    React.useEffect(() => {
        console.log('Recommendation Count: ', recommendationsCount)
        if (recommendationsCount >= 3) {
            setLocked(false)
        }
    }, [recommendationsCount])

    React.useEffect(() => {
        console.log('User:', user)
        if (user && (user.firstName || user.lastName) && user.imageCDNUrl && user.content && user.userByLine) {
            setComplete(true)
            fetchRecommendations(user.id, 0)
        } else {
            setComplete(false)
        }
    }, [user])

    const handleAnimationEnd = () => {
        if (!isLocked) {
            setLockedComponentsVisible(false)
        }
    }

    const handleEditProfile = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        openUserProfileEditModal({
            onSuccess: refreshUser,
            user: user,
        })
    }
    const handleWriteRecommendation = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        openSearchModal()
    }

    const fetchRecommendations = (id: number, page: number) => {
        if (user) {
            axios
                .get(FETCH_USER_RECOMMENDATIONS(id, page))
                .then((res) => {
                    console.log('Fetched recommendations: ', res)
                    setRecommendationsCount(res.headers['x-total-count'])
                })
                .catch((err) => console.log(err))
        }
    }

    const renderIncompleteComponent = () => {
        return (
            <UserProfileInfluencerGuideTextsContainer data-tut={S.PRELAUNCH_TOUR.StepFour.Selector}>
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
                <UserProfileInfluencerGuideTextsContainer data-tut={S.PRELAUNCH_TOUR.StepFour.Selector}>
                    <UserProfileInfluencerGuideHeader>
                        {isLocked
                            ? S.USER_PROFILE_INFLUENCER_GUIDE.Complete.Title
                            : S.USER_PROFILE_INFLUENCER_GUIDE.CompleteUnlocked.Title}
                    </UserProfileInfluencerGuideHeader>
                    <UserProfileInfluencerGuideMessage>
                        {isLocked
                            ? S.USER_PROFILE_INFLUENCER_GUIDE.Complete.Message
                            : S.USER_PROFILE_INFLUENCER_GUIDE.CompleteUnlocked.Message}
                    </UserProfileInfluencerGuideMessage>
                    <UserProfileInfluencerGuideButton onClick={handleWriteRecommendation}>
                        {S.USER_PROFILE_INFLUENCER_GUIDE.Complete.ButtonLabel}
                    </UserProfileInfluencerGuideButton>
                </UserProfileInfluencerGuideTextsContainer>
                <UserProfileInfluencerGuideIconsContainer isLocked={isLocked}>
                    {isLockedComponentsVisible ? (
                        <UserProfileInfluencerGuideLockedIcon
                            src={LockedFoodie}
                            alt="foodie-badge-locked"
                            isLocked={isLocked}
                        />
                    ) : (
                        <UserProfileInfluencerGuideUnlockedIcon
                            src={UnlockedFoodie}
                            alt="foodie-badge-unlocked"
                            isLocked={isLocked}
                        />
                    )}
                    {isLockedComponentsVisible && (
                        <UserProfileInfluencerGuideRecommendationIconsContainer
                            fadeOut={!isLocked}
                            onAnimationEnd={handleAnimationEnd}
                        >
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
                    )}
                    {isLockedComponentsVisible && (
                        <UserProfileInfluencerGuideRecommendationWritten fadeOut={!isLocked}>
                            {S.USER_PROFILE_INFLUENCER_GUIDE.Complete.RecommendationWritten}
                        </UserProfileInfluencerGuideRecommendationWritten>
                    )}
                    {!isLockedComponentsVisible && (
                        <UserProfileInfluencerGuideRecommendationWritten fadeIn={!isLocked}>
                            {S.USER_PROFILE_INFLUENCER_GUIDE.CompleteUnlocked.Unlocked}
                        </UserProfileInfluencerGuideRecommendationWritten>
                    )}
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
    userMe: state.userReducer.user,
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
