import Dialog from '@material-ui/core/Dialog'
import RecommendationEditor from 'components/RecommendationModal/RecommendationEditor'
import {
    RecommendationModalContainer,
    RecommendationModalContentContainer,
} from 'components/RecommendationModal/RecommendationModal.style'
import RecommendationPublished from 'components/RecommendationModal/RecommendationPublished'
import axios, { POST_RECOMMENDATION } from 'config/AxiosConfig'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import authStore from 'store/authentication/authentication_reducer'
import {
    clearRecommendationModal,
    closeRecommendationModal,
} from 'store/recommendationModal/recommendationModal_actions'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import RecommendationEditorHeader from './RecommendationEditorHeader'

interface IReduxProps {
    placeID: number | null
    placeName: string | null
    isAATL: boolean | null
    isOpen: boolean
    closeRecommendationModal: () => void
    clearRecommendationModal: () => void
}

interface IRecommendationModalProps extends IReduxProps, IWithAuthInjectedProps {}

const RecommendationModal: React.FC<IRecommendationModalProps> = ({
    clearRecommendationModal,
    closeRecommendationModal,
    isOpen,
    placeID,
    placeName,
    authenticatedAction,
    getTokenConfig,
    isAATL,
}) => {
    const [isLoading, setLoading] = React.useState(false)
    const [publishedTitle, setPublishedTitle] = React.useState('')
    const [published, setPublished] = React.useState(false)
    const [recommendation, setRecommendation] = React.useState(null)

    React.useEffect(() => {
        return () => {
            clearRecommendationModal()
        }
    }, [])

    const handlePublish = (title: string, description: string, temporaryImageKey: string) => {
        setLoading(true)
        const payload =
            isAATL === true
                ? {
                      venueID: placeID,
                      title: title,
                      description: description,
                      temporaryImageKey: temporaryImageKey,
                  }
                : {
                      sourcePlaceId: placeID,
                      title: title,
                      description: description,
                      temporaryImageKey: temporaryImageKey,
                  }
        axios
            .post(
                POST_RECOMMENDATION,
                payload,
                authStore.getState().keycloak && authStore.getState().keycloak.token
                    ? {
                          headers: {
                              Authorization: getTokenConfig(),
                          },
                      }
                    : {}
            )
            .then((res) => {
                console.log(res)
                setPublished(true)
                setPublishedTitle(title)
                setLoading(false)
                setRecommendation(res.data)
                // TODO: Get the recommendation ID and create a permalink from res.data.id
            })
            .catch((err) => console.log(err))
    }

    const handleReadOurGuidelines = () => {
        console.log('TODO: Wire up API for handleReadOurGuidelines')
    }
    const handleMoreTips = () => {
        console.log('TODO: Wire up API for handleMoreTips')
    }

    return (
        <Dialog open={isOpen} fullScreen>
            <RecommendationModalContainer>
                <RecommendationEditorHeader
                    closeRecommendationModal={closeRecommendationModal}
                    handleMoreTips={handleMoreTips}
                    published={published}
                />
                <RecommendationModalContentContainer>
                    {published ? (
                        <RecommendationPublished publishedTitle={publishedTitle} recommendation={recommendation} />
                    ) : (
                        <RecommendationEditor
                            placeName={placeName}
                            isLoading={isLoading}
                            handlePublish={handlePublish}
                            handleReadOurGuidelines={handleReadOurGuidelines}
                        />
                    )}
                </RecommendationModalContentContainer>
            </RecommendationModalContainer>
        </Dialog>
    )
}

const mapStateToProps = (state: StoreState) => ({
    placeID: state.recommendationModalReducer.placeID,
    placeName: state.recommendationModalReducer.placeName,
    isOpen: state.recommendationModalReducer.isOpen,
    isAATL: state.recommendationModalReducer.isAATL,
})
const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ closeRecommendationModal, clearRecommendationModal }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(RecommendationModal))
