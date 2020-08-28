import CardRecommendationWide, {
    CardRecommendationWideEnum,
} from 'components/CardRecommendationWide/CardRecommendationWide'
import axios, { RECOMMENDATION_LIST_SPOTLIGHTED_RECOMMENDATION } from 'config/AxiosConfig'
import React from 'react'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { ISpotlightedRecommendation } from 'utilities/types/ISpotlightedRecommendation'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'

interface ISpotlightedRecommendationProps extends IWithAuthInjectedProps {
    spotlightedRecommendation: ISpotlightedRecommendation | null
    recommendationListMeta: IRecommendationListMeta | null
    fetchRecommendationListMeta: () => void
}

const SpotlightedRecommendation: React.FC<ISpotlightedRecommendationProps> = ({
    spotlightedRecommendation,
    recommendationListMeta,
    getTokenConfig,
    fetchRecommendationListMeta,
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

export default withAuth(SpotlightedRecommendation)
