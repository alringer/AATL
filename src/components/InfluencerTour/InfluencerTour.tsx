//@ts-nocheck
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import InfluencerTourCard from 'components/InfluencerTour/InfluencerTourCard'
import * as S from 'constants/StringConstants'
import dynamic from 'next/dynamic'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import {
    closeInfluencerTour,
    closeInfluencerTourModal,
    openInfluencerTour,
    openInfluencerTourModal,
} from 'store/influencerTourModal/influencerTourModal_actions'
import { IUserProfile } from 'utilities/types/userProfile'
import { InfluencerCardMessage, InfluencerCardOrangeMessage } from './InfluencerTour.style'

interface IReduxProps {
    isPrelaunch: boolean
    currentUser: IUserProfile | null
    isLoggedIn: boolean
    isLoading: boolean
    openInfluencerTourModal: () => void
    closeInfluencerTourModal: () => void
    openInfluencerTour: () => void
    closeInfluencerTour: () => void
}

interface IInfluencerTourProps extends IReduxProps {}

const InfluencerTour: React.FC<IInfluencerTourProps> = ({
    isPrelaunch,
    isLoggedIn,
    isLoading,
    currentUser,
    openInfluencerTourModal,
    closeInfluencerTourModal,
    openInfluencerTour,
    closeInfluencerTour,
}) => {
    const Tour = dynamic(() => import('reactour'), { ssr: false })
    const [isTourOpen, setIsTourOpen] = React.useState(false)
    const [isOverlayOpen, setOverlayOpen] = React.useState(false)

    React.useEffect(() => {
        if (isPrelaunch && !isLoading && isLoggedIn && (!currentUser?.content || !currentUser?.userByLine)) {
            handleOpenTour()
        }
    }, [isLoggedIn, isPrelaunch, isLoading])

    const disableBody = (target) => disableBodyScroll(target)
    const enableBody = (target) => enableBodyScroll(target)

    const handleOpenTour = () => {
        setIsTourOpen(true)
        openInfluencerTour()
    }

    const handleRequestClose = () => {
        setIsTourOpen(false)
        closeInfluencerTourModal()
        closeInfluencerTour()
    }

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
                            openInfluencerTourModal()
                            setTimeout(() => {
                                goTo(1)
                            }, 100)
                        }}
                        step={1}
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
                        step={2}
                    />
                </div>
            ),
            position: 'left',
            // observe: `[data-tut="${S.PRELAUNCH_TOUR.StepTwo.Observer}"]`,
        },
        {
            selector: `[data-tut="${S.PRELAUNCH_TOUR.StepThree.Selector}"]`,
            content: ({ goTo, inDOM }) => (
                <div>
                    <InfluencerTourCard
                        title={S.PRELAUNCH_TOUR.StepThree.Title}
                        message={<InfluencerCardMessage>{S.PRELAUNCH_TOUR.StepThree.Message}</InfluencerCardMessage>}
                        handleNextStep={() => {
                            closeInfluencerTourModal()
                            goTo(3)
                        }}
                        step={3}
                    />
                </div>
            ),
            position: 'right',
        },
        {
            selector: `[data-tut="${S.PRELAUNCH_TOUR.StepFour.Selector}"]`,
            content: ({ goTo, inDOM }) => (
                <div>
                    <InfluencerTourCard
                        title={S.PRELAUNCH_TOUR.StepFour.Title}
                        message={
                            <InfluencerCardMessage>
                                {S.PRELAUNCH_TOUR.StepFour.PreOrangeMessage}&nbsp;
                                <InfluencerCardOrangeMessage>
                                    {S.PRELAUNCH_TOUR.StepFour.OrangeMessage}&nbsp;
                                </InfluencerCardOrangeMessage>
                                {S.PRELAUNCH_TOUR.StepFour.PostOrangeMessage}
                            </InfluencerCardMessage>
                        }
                        handleNextStep={() => {
                            handleRequestClose()
                        }}
                        step={4}
                    />
                </div>
            ),
            position: 'right',
        },
    ]
    // data-tut={S.PRELAUNCH_TOUR.StepTwo.Observer}
    // data-tut={S.PRELAUNCH_TOUR.StepThree.Selector}
    // data-tut={S.PRELAUNCH_TOUR.StepTwo.Selector}

    return (
        <Tour
            steps={steps}
            isOpen={isTourOpen}
            rounded={5}
            getCurrentStep={(curr) => console.log(`The current step is ${curr + 1}`)}
            onRequestClose={handleRequestClose}
            // onAfterOpen={disableBody}
            // onBeforeClose={enableBody}
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
            openInfluencerTourModal,
            closeInfluencerTourModal,
            openInfluencerTour,
            closeInfluencerTour,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(InfluencerTour)
