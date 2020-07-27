import HomeBanner from 'components/HomeBanner/HomeBanner'
import { KeycloakTokenParsed } from 'keycloak-js'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { openRecommendationModal } from 'store/recommendationModal/recommendationModal_actions'
import { RecommendationModalPlaceInformation } from 'store/recommendationModal/recommendationModal_types'
import withAuth from 'utilities/hocs/withAuth'
import EmailSubscription from '../src/components/EmailSubscription/EmailSubscription'

type ParsedToken = KeycloakTokenParsed & {
    email?: string
    preferred_username?: string
    name?: string
    given_name?: string
    family_name?: string
}

interface IReduxProps {
    isOpen: boolean
    openRecommendationModal: (placeInformation: RecommendationModalPlaceInformation) => void
}

interface IIndexProps {}

const Index: IIndexProps = () => {
    const lookupIP = () => {
        // console.log('Looking up IP. The current token is: ', keycloak.tokenParsed)
        // axios
        //     .get(IP_LOOKUP('2600:8801:8502:a100:783a:36b9:59f5:b98a'), {
        //         headers: { Authorization: 'Bearer ' + keycloak.token },
        //     })
        //     .then((res) => console.log('IP Address Success: ', res))
        //     .catch((err) => console.log('IP Addres Fail: ', err))
    }

    return (
        <>
            {/* <button onClick={() => openRecommendationModal({ placeID: 0, placeName: 'Alaskan Salmon' })}>
                Hello there
            </button> */}
            {/* {isOpen && <RecommendationModal />} */}
            <HomeBanner />
            <EmailSubscription />
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isRecommendationOpen: state.recommendationModalReducer.isOpen,
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ openRecommendationModal }, dispatch)
export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(Index))
