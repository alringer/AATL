import HomeCarousel from 'components/Home/HomeCarousel/HomeCarousel'
import HomeBanner from 'components/HomeComponents/HomeBanner/HomeBanner'
import MostRecommended from 'components/HomeComponents/MostRecommended/MostRecommended'
import axios, { FETCH_HOME } from 'config/AxiosConfig'
import { KeycloakTokenParsed } from 'keycloak-js'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { ILocationInformation } from 'store/location/location_types'
import { openRecommendationModal } from 'store/recommendationModal/recommendationModal_actions'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IHomepage } from 'utilities/types/homepage'
import EmailSubscription from '../src/components/EmailSubscription/EmailSubscription'

type ParsedToken = KeycloakTokenParsed & {
    email?: string
    preferred_username?: string
    name?: string
    given_name?: string
    family_name?: string
}

interface IReduxProps {
    preferredLocation: ILocationInformation | null
}

interface IIndexProps extends IReduxProps, IWithAuthInjectedProps {}

const Index: React.FC<IIndexProps> = ({ preferredLocation }) => {
    const [homeData, setHomeData] = React.useState<IHomepage | null>(null)

    React.useEffect(() => {
        if (preferredLocation) {
            axios
                .post(FETCH_HOME, {
                    latitude: preferredLocation.lat,
                    longitude: preferredLocation.lng,
                })
                .then((res) => {
                    console.log('Fetch Home Response:', res)
                    setHomeData(res.data)
                })
                .catch((err) => console.log(err))
        }
    }, [preferredLocation])

    return (
        <>
            <HomeBanner />
            <HomeCarousel featuredRecommendationsLists={homeData ? homeData.featuredRecommendationsLists : null} />
            <MostRecommended venues={homeData && homeData.recommendedNearby ? homeData.recommendedNearby : []} />
            <EmailSubscription />
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    preferredLocation: state.locationReducer.preferredLocation,
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ openRecommendationModal }, dispatch)
export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(Index))
