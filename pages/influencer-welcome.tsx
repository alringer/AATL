import StaticWelcomeBanner from 'components/StaticWelcome/StaticWelcomeBanner/StaticWelcomeBanner'
import StaticWelcomeContent from 'components/StaticWelcome/StaticWelcomeContent/StaticWelcomeContent'
import { useRouter } from 'next/router'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'

interface IReduxProps {
    isPrelaunch: boolean
    isLoggedIn: boolean
    userID: number | undefined
}
interface IInfluencerWelcomeProps extends IReduxProps {}

const InfluencerWelcome: React.FC<IInfluencerWelcomeProps> = ({ isPrelaunch, isLoggedIn, userID }) => {
    const router = useRouter()
    React.useEffect(() => {
        if (!isPrelaunch) {
            router.push('/')
        } else if (isLoggedIn && userID) {
            router.push(`/user-profile/me`)
        }
    }, [isPrelaunch, isLoggedIn])

    return (
        <>
            <StaticWelcomeBanner />
            <StaticWelcomeContent />
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isPrelaunch: state.prelaunchReducer.isPrelaunch,
    isLoggedIn: state.userReducer.loggedIn,
    userID: state.userReducer.user?.id,
})

export default reduxConnect(mapStateToProps)(InfluencerWelcome)
