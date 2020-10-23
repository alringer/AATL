import InfluencerWelcomeBanner from 'components/InfluencerWelcome/InfluencerWelcomeBanner/InfluencerWelcomeBanner'
import InfluencerWelcomeContent from 'components/InfluencerWelcome/InfluencerWelcomeContent/InfluencerWelcomeContent'
import { useRouter } from 'next/router'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'

interface IReduxProps {
    isPrelaunch: boolean
}
interface IInfluencerWelcomeProps extends IReduxProps {}

const InfluencerWelcome: React.FC<IInfluencerWelcomeProps> = ({ isPrelaunch }) => {
    const router = useRouter()
    React.useEffect(() => {
        if (!isPrelaunch) {
            router.push('/')
        }
    }, [isPrelaunch])

    return (
        <>
            <InfluencerWelcomeBanner />
            <InfluencerWelcomeContent />
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isPrelaunch: state.prelaunchReducer.isPrelaunch,
})

export default reduxConnect(mapStateToProps)(InfluencerWelcome)
