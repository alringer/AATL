import HomeCarousel from 'components/Home/HomeCarousel/HomeCarousel'
import HomeNewRecommendations from 'components/Home/HomeNewRecommendations/HomeNewRecommendations'
import HomeBanner from 'components/HomeComponents/HomeBanner/HomeBanner'
import MostRecommended from 'components/HomeComponents/MostRecommended/MostRecommended'
import axios, { FETCH_HOME } from 'config/AxiosConfig'
import { INSTAGRAM_CLIENT_ID, INSTAGRAM_CLIENT_SECRET, INSTAGRAM_REDIRECT_URI } from 'constants/InstagramConstants'
import { KeycloakTokenParsed } from 'keycloak-js'
import { useRouter } from 'next/router'
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

interface IIndexProps extends IReduxProps, IWithAuthInjectedProps { }

const Index: React.FC<IIndexProps> = ({ preferredLocation }) => {
    const [homeData, setHomeData] = React.useState<IHomepage | null>(null)

    const router = useRouter()
    console.log(router)

    if (router?.query['code']) {
        const authorizationCode: string = router?.query['code'][0]
        console.log(authorizationCode)
        const formData = new FormData()
        formData.append('client_id', INSTAGRAM_CLIENT_ID)
        formData.append('client_secret', INSTAGRAM_CLIENT_SECRET)
        formData.append('grant_type', 'authorization_code')
        formData.append('code', authorizationCode)
        formData.append('redirect_uri', INSTAGRAM_REDIRECT_URI)

        const instagramToken = axios.post(
            'https://api.instagram.com/oauth/access_token',
            formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res['access_token'])
            return res['access_token']
        })
    }

    React.useEffect(() => {
        if (preferredLocation) {
            axios
                .post(FETCH_HOME, {
                    latitude: preferredLocation.lat,
                    longitude: preferredLocation.lng,
                })
                .then((res) => {
                    setHomeData(res.data)
                })
                .catch((err) => console.log(err))
        }
    }, [preferredLocation])

    return (
        <>
            <HomeBanner />
            <HomeNewRecommendations
                initialRecommendations={
                    homeData?.newRecommendations?.content ? homeData?.newRecommendations?.content : []
                }
                initialTotalPages={
                    homeData?.newRecommendations?.totalPages ? homeData?.newRecommendations?.totalPages : 1
                }
                initialPage={
                    homeData?.newRecommendations?.pageable?.pageNumber !== undefined &&
                        homeData?.newRecommendations?.pageable?.pageNumber !== null
                        ? homeData.newRecommendations?.pageable?.pageNumber
                        : 0
                }
                initialPageSize={
                    homeData?.newRecommendations?.pageable?.pageSize !== undefined &&
                        homeData?.newRecommendations?.pageable?.pageSize !== null
                        ? homeData?.newRecommendations?.pageable?.pageSize
                        : 3
                }
            />
            <HomeCarousel
                featuredRecommendationsLists={
                    homeData?.featuredRecommendationsLists ? homeData?.featuredRecommendationsLists : null
                }
            />
            <MostRecommended venues={homeData?.recommendedNearby ? homeData.recommendedNearby : []} />
            <EmailSubscription />
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    preferredLocation: state.locationReducer.preferredLocation,
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ openRecommendationModal }, dispatch)
export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(Index))
