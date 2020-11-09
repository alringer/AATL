import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import InfluencerTourCard from 'components/InfluencerTour/InfluencerTourCard'
import * as S from 'constants/StringConstants'
import dynamic from 'next/dynamic'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { openUserProfileEditModal } from 'store/userProfileEditModal/userProfileEditModal_actions'
import { OpenUserProfileEditModalPayload } from 'store/userProfileEditModal/userProfileEditModal_types'
import { IUserProfile } from 'utilities/types/userProfile'
import { InfluencerCardMessage, InfluencerCardOrangeMessage } from './InfluencerTour.style'

interface IReduxProps {
    isPrelaunch: boolean
    currentUser: IUserProfile | null
    isLoggedIn: boolean
    isLoading: boolean
    openUserProfileEditModal: (payload: OpenUserProfileEditModalPayload) => void
}

interface IInfluencerTourProps extends IReduxProps {}

const InfluencerTour: React.FC<IInfluencerTourProps> = ({
    isPrelaunch,
    isLoggedIn,
    isLoading,
    currentUser,
    openUserProfileEditModal,
}) => {
    const Tour = dynamic(() => import('reactour'), { ssr: false })
    const [isTourOpen, setIsTourOpen] = React.useState(false)

    React.useEffect(() => {
        if (isPrelaunch && !isLoading && isLoggedIn && (!currentUser?.content || !currentUser?.userByLine)) {
            setIsTourOpen(true)
        }
    }, [isLoggedIn, isPrelaunch, isLoading])

    const disableBody = (target) => disableBodyScroll(target)
    const enableBody = (target) => enableBodyScroll(target)

    const steps = [
        {
            selector: `[data-tut="${S.PRELAUNCH_TOUR.StepOne.Selector}"]`,
            content: ({ goTo, inDOM }) => (
                <div>
                    <InfluencerTourCard
                        title={S.PRELAUNCH_TOUR.StepOne.Title}
                        message={
                            <InfluencerCardMessage>
                                {S.PRELAUNCH_TOUR.StepOne.PreOrangeMessage}&nbsp;
                                <InfluencerCardOrangeMessage>
                                    {S.PRELAUNCH_TOUR.StepOne.OrangeMessage}&nbsp;
                                </InfluencerCardOrangeMessage>
                                {S.PRELAUNCH_TOUR.StepOne.PostOrangeMessage}
                            </InfluencerCardMessage>
                        }
                        handleNextStep={() => {
                            openUserProfileEditModal({})
                            goTo(1)
                        }}
                    />
                </div>
            ),
            position: 'left',
        },
        {
            selector: `[data-tut="${S.PRELAUNCH_TOUR.StepTwo.Selector}"]`,
            content: ({ goTo, inDOM }) => (
                <div>
                    <InfluencerTourCard
                        title={S.PRELAUNCH_TOUR.StepTwo.Title}
                        message={
                            <InfluencerCardMessage>
                                {S.PRELAUNCH_TOUR.StepTwo.PreOrangeMessage}&nbsp;
                                <InfluencerCardOrangeMessage>
                                    {S.PRELAUNCH_TOUR.StepTwo.Name},
                                </InfluencerCardOrangeMessage>
                                ,&nbsp;
                                <InfluencerCardOrangeMessage>
                                    {S.PRELAUNCH_TOUR.StepTwo.Occupation}
                                </InfluencerCardOrangeMessage>
                                , and&nbsp;
                                <InfluencerCardOrangeMessage>
                                    {S.PRELAUNCH_TOUR.StepTwo.Bio}&nbsp;
                                </InfluencerCardOrangeMessage>
                                {S.PRELAUNCH_TOUR.StepTwo.PostOrangeMessage}
                            </InfluencerCardMessage>
                        }
                        handleNextStep={() => {
                            goTo(2)
                        }}
                    />
                </div>
            ),
            // observe: `[data-tut="${S.PRELAUNCH_TOUR.StepTwo.Selector}"]`,
            observe: `[data-tut="${S.PRELAUNCH_TOUR.StepTwo.Observer}"]`,
        },
        {
            selector: `[data-tut="${S.PRELAUNCH_TOUR.StepThree.Selector}"]`,
            content: '',
        },
    ]

    return (
        <Tour
            steps={steps}
            isOpen={isTourOpen}
            rounded={5}
            onRequestClose={() => setIsTourOpen(false)}
            getCurrentStep={(curr) => console.log(`The current step is ${curr + 1}`)}
            onAfterOpen={disableBody}
            onBeforeClose={enableBody}
            prevButton={<div></div>}
            showNavigation={false}
            showNumber={false}
            showButtons={false}
            disableDotsNavigation={true}
            disableInteraction={true}
            className={'influencer-tour'}
        />
    )
}

const mapStateToProps = (state: StoreState) => ({
    isPrelaunch: state.prelaunchReducer.isPrelaunch,
    currentUser: state.userReducer.user,
    isLoggedIn: state.userReducer.loggedIn,
    isLoading: state.userReducer.isLoading,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            openUserProfileEditModal,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(InfluencerTour)
