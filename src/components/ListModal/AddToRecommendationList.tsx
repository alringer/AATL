import { CircularProgress } from '@material-ui/core'
import Image from 'components/Image/Image'
import {
    AddIcon,
    CancelButton,
    ListModalAddToListWideButton,
    ListModalCardButton,
    ListModalCardContainer,
    ListModalCardImageContainer,
    ListModalCardSubTitle,
    ListModalCardTextContainer,
    ListModalCardTitle,
    ListModalFooterContainer,
    ListModalFooterLeftContainer,
    ListModalFooterRightContainer,
    ListModalHeaderContainer,
    ListModalHeaderText,
    ListModalLoadingContainer,
    ListModalMainAreaContainer,
    ListModalMainContentContainer,
    ListModalNavigationButton,
    ListModalTitleText,
    SubmitButton,
} from 'components/ListModal/ListModal.style'
import axios, { RECOMMENDATION_LIST_METAS, RECOMMENDATION_LIST_SPOTLIGHTED_RECOMMENDATION } from 'config/AxiosConfig'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'
import { ListModalViewEnum } from 'store/listModal/listModal_types'
import { query } from 'style/device'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'

interface IReduxProps {
    recommendationID: number | null
}
interface IAddToRecommendationListProps extends IReduxProps, IWithAuthInjectedProps {
    closeModal: () => void
    switchView: (newListModalView: ListModalViewEnum) => void
}

const AddToRecommendationList: React.FC<IAddToRecommendationListProps> = ({
    closeModal,
    switchView,
    recommendationID,
    getTokenConfig,
}) => {
    const [recommendationLists, setRecommendationLists] = React.useState([])
    const [selectedID, setSelectedID] = React.useState<number | null>(null)
    const [isLoading, setLoading] = React.useState(false)

    React.useEffect(() => {
        const token = getTokenConfig()
        const config = {
            headers: {
                Authorization: token,
            },
        }
        setLoading(true)
        axios
            .get(RECOMMENDATION_LIST_METAS, config)
            .then((res) => {
                console.log('Fetched Recommendation List Metas: ', res)
                if (res && res.data && res.data.length && res.data[0] && res.data[0].id) {
                    setRecommendationLists(res.data)
                    setSelectedID(res.data[0].id)
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const handleSelect = (id: number) => {
        setSelectedID(id)
    }
    const handleAddToNewList = () => {
        switchView(ListModalViewEnum.AddToNewRecommendationList)
    }
    const handleCancel = () => {
        closeModal()
    }
    const handleAddRecommendation = () => {
        if (recommendationID !== null && recommendationID !== undefined && selectedID !== null) {
            const token = getTokenConfig()
            if (token) {
                const config = {
                    headers: {
                        Authorization: token,
                    },
                }
                axios
                    .post(RECOMMENDATION_LIST_SPOTLIGHTED_RECOMMENDATION(selectedID, recommendationID), {}, config)
                    .then((res) => {
                        console.log('Adding a recommendation to the recommendation list: ', res)
                        closeModal()
                    })
                    .catch((err) => console.log(err))
            }
        }
    }

    return (
        <>
            <ListModalHeaderContainer>
                <ListModalHeaderText>{S.LIST_MODAL.AddToRecommendation.Header}</ListModalHeaderText>
            </ListModalHeaderContainer>
            <ListModalMainAreaContainer>
                <ListModalTitleText>{S.LIST_MODAL.AddToRecommendation.Title}</ListModalTitleText>
                <ListModalMainContentContainer>
                    {isLoading ? (
                        <ListModalLoadingContainer>
                            <CircularProgress />
                        </ListModalLoadingContainer>
                    ) : recommendationLists.length > 0 ? (
                        recommendationLists.map((recommendationList: IRecommendationListMeta) => (
                            <ListModalCardButton
                                onClick={() => handleSelect(recommendationList.id)}
                                key={recommendationList.id}
                            >
                                <ListModalCardContainer
                                    id={selectedID === recommendationList.id ? 'selected' : 'not-selected'}
                                >
                                    <ListModalCardImageContainer>
                                        <Image
                                            src={recommendationList.imageCDNUrl}
                                            alt="recommendation-meta-list-image"
                                        />
                                    </ListModalCardImageContainer>
                                    <ListModalCardTextContainer>
                                        <ListModalCardTitle>{recommendationList.title}</ListModalCardTitle>
                                        <ListModalCardSubTitle>
                                            {recommendationList.spotlightedRecommendations &&
                                            recommendationList.spotlightedRecommendations.length
                                                ? recommendationList.spotlightedRecommendations.length
                                                : 0}{' '}
                                            {S.LIST_MODAL.AddToRecommendation.Recommendations}
                                        </ListModalCardSubTitle>
                                    </ListModalCardTextContainer>
                                </ListModalCardContainer>
                            </ListModalCardButton>
                        ))
                    ) : (
                        <p>{S.LIST_MODAL.AddToRecommendation.EmptyMessage}</p>
                    )}
                    <Media queries={query} defaultMatches={{ mobile: true }}>
                        {(matches) => (
                            <>
                                {matches.mobile && (
                                    <ListModalAddToListWideButton onClick={handleAddToNewList}>
                                        <AddIcon />
                                        {S.BUTTON_LABELS.AddToNewList}
                                    </ListModalAddToListWideButton>
                                )}
                            </>
                        )}
                    </Media>
                </ListModalMainContentContainer>
            </ListModalMainAreaContainer>
            <ListModalFooterContainer>
                <Media queries={query} defaultMatches={{ mobile: true }}>
                    {(matches) => (
                        <>
                            {(matches.laptop || matches.tablet) && (
                                <ListModalFooterLeftContainer>
                                    <ListModalNavigationButton onClick={handleAddToNewList}>
                                        {S.BUTTON_LABELS.AddToNewList}
                                    </ListModalNavigationButton>
                                </ListModalFooterLeftContainer>
                            )}
                        </>
                    )}
                </Media>
                <ListModalFooterRightContainer>
                    <CancelButton onClick={handleCancel}>{S.BUTTON_LABELS.Cancel}</CancelButton>
                    <SubmitButton onClick={handleAddRecommendation} disabled={selectedID === null}>
                        {S.BUTTON_LABELS.Add}
                    </SubmitButton>
                </ListModalFooterRightContainer>
            </ListModalFooterContainer>
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    recommendationID: state.listModalReducer.recommendationID,
})

export default reduxConnect(mapStateToProps)(withAuth(AddToRecommendationList))
