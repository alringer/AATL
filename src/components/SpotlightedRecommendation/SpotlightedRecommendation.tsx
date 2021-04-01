import CardRecommendationWide, {
    CardRecommendationWideEnum,
} from 'components/CardRecommendationWide/CardRecommendationWide'
import axios, { RECOMMENDATION_LIST_SPOTLIGHTED_RECOMMENDATION } from 'config/AxiosConfig'
import { KeycloakInstance } from 'keycloak-js'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from 'store/user/user_actions'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { ISpotlightedRecommendation } from 'utilities/types/ISpotlightedRecommendation'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'

interface IReduxProps {
    fetchUser: (keycloak: KeycloakInstance) => void
}

interface ISpotlightedRecommendationProps extends IWithAuthInjectedProps, IReduxProps {
    spotlightedRecommendation: ISpotlightedRecommendation | null
    recommendationListMeta: IRecommendationListMeta | null
    fetchRecommendationListMeta: () => void
}

const SpotlightedRecommendation: React.FC<ISpotlightedRecommendationProps> = ({
    spotlightedRecommendation,
    recommendationListMeta,
    getTokenConfig,
    fetchRecommendationListMeta,
    fetchUser,
    keycloak,
}) => {
    const handleRemoveFromList = () => {
        if (recommendationListMeta && spotlightedRecommendation) {
            const token = getTokenConfig()
            const config = {
                headers: {
                    Authorization: token,
                },
            }
            axios
                .delete(
                    RECOMMENDATION_LIST_SPOTLIGHTED_RECOMMENDATION(
                        recommendationListMeta.id,
                        spotlightedRecommendation.id
                    ),
                    config
                )
                .then((res) => {
                    fetchUser(keycloak)
                    fetchRecommendationListMeta()
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <CardRecommendationWide
            isFull={true}
            recommendation={spotlightedRecommendation.originalRecommendation}
            type={CardRecommendationWideEnum.RecommendationList}
            handleRemoveFromList={handleRemoveFromList}
        />
    )
}

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            fetchUser,
        },
        dispatch
    )

export default reduxConnect(null, mapDispatchToProps)(withAuth(SpotlightedRecommendation))
