import HomeBanner from 'components/HomeBanner/HomeBanner'
import { KeycloakTokenParsed } from 'keycloak-js'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { openRecommendationModal } from 'store/recommendationModal/recommendationModal_actions'
import { RecommendationModalPlaceInformation } from 'store/recommendationModal/recommendationModal_types'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
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

interface IIndexProps extends IReduxProps, IWithAuthInjectedProps {}

const Index: React.FC<IIndexProps> = () => {
    return (
        <>
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
