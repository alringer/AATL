import Dialog from '@material-ui/core/Dialog'
import RecommendationEditor from 'components/RecommendationModal/RecommendationEditor'
import {
    RecommendationModalContainer,
    RecommendationModalContentContainer,
} from 'components/RecommendationModal/RecommendationModal.style'
import RecommendationPublished from 'components/RecommendationModal/RecommendationPublished'
import axios, { POST_RECOMMENDATION, PUT_RECOMMENDATION } from 'config/AxiosConfig'
import { KeycloakInstance } from 'keycloak-js'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import authStore from 'store/authentication/authentication_reducer'
import { openGuidelinesModal } from 'store/guidelinesModal/guidelinesModal_actions'
import {
    clearRecommendationModal,
    closeRecommendationModal,
} from 'store/recommendationModal/recommendationModal_actions'
import { RecommendationModalType } from 'store/recommendationModal/recommendationModal_types'
import { fetchUser } from 'store/user/user_actions'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { flaggedEnum } from 'utilities/types/enumerations'
import RecommendationEditorHeader from './RecommendationEditorHeader'

interface IReduxProps {
    placeID: number | null
    placeName: string | null
    recommendation_type: RecommendationModalType | null
    recommendationID: number | null
    isOpen: boolean
    venuesRecommendedIDs: number[]
    closeRecommendationModal: () => void
    clearRecommendationModal: () => void
    fetchUser: (keycloak: KeycloakInstance) => void
    openGuidelinesModal: () => void
}

interface IRecommendationModalProps extends IReduxProps, IWithAuthInjectedProps {}

const RecommendationModal: React.FC<IRecommendationModalProps> = ({
    clearRecommendationModal,
    closeRecommendationModal,
    isOpen,
    placeID,
    placeName,
    venuesRecommendedIDs,
    authenticatedAction,
    getTokenConfig,
    recommendation_type,
    recommendationID,
    fetchUser,
    keycloak,
    openGuidelinesModal,
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

    React.useEffect(() => {
        if (venuesRecommendedIDs.length <= 0) {
            openGuidelinesModal()
        }
    }, [venuesRecommendedIDs])

    const handlePublish = (title: string, description: string, temporaryImageKey: string, rating: number) => {
        setLoading(true)
        const payload =
            recommendation_type === RecommendationModalType.AATL
                ? {
                      venueID: placeID,
                      title: title,
                      description: description,
                      temporaryImageKey: temporaryImageKey,
                      rating: rating,
                  }
                : {
                      sourcePlaceId: placeID,
                      title: title,
                      description: description,
                      temporaryImageKey: temporaryImageKey,
                      rating: rating,
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
                setPublished(true)
                setPublishedTitle(title)
                setRecommendation(res.data)
                fetchUser(keycloak)
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false)
            })
    }

    const handleEdit = (
        inputRecommendationID: number,
        inputTitle: string,
        inputDescription: string,
        temporaryImageKey: string,
        inputRating: number,
        inputFlagged: flaggedEnum
    ) => {
        const payload = temporaryImageKey
            ? {
                  id: inputRecommendationID,
                  title: inputTitle,
                  content: inputDescription,
                  temporaryImageKey: temporaryImageKey,
                  rating: inputRating,
                  flagged: inputFlagged,
              }
            : {
                  id: inputRecommendationID,
                  title: inputTitle,
                  content: inputDescription,
                  rating: inputRating,
                  flagged: inputFlagged,
              }
        axios
            .put(
                PUT_RECOMMENDATION,
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
                setPublished(true)
                setPublishedTitle(inputTitle)
                setRecommendation(res.data)
                fetchUser(keycloak)
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false)
            })
    }

    const handleReadOurGuidelines = () => {
        openGuidelinesModal()
    }

    return (
        <Dialog open={isOpen} fullScreen>
            <RecommendationModalContainer>
                <RecommendationEditorHeader closeRecommendationModal={closeRecommendationModal} published={published} />
                <RecommendationModalContentContainer>
                    {published ? (
                        <RecommendationPublished
                            publishedTitle={publishedTitle}
                            recommendation={recommendation}
                            closeRecommendationModal={closeRecommendationModal}
                        />
                    ) : (
                        <RecommendationEditor
                            placeName={placeName}
                            isLoading={isLoading}
                            handlePublish={handlePublish}
                            handleEdit={handleEdit}
                            handleReadOurGuidelines={handleReadOurGuidelines}
                            recommendationID={recommendationID}
                            recommendation_type={recommendation_type}
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
    recommendation_type: state.recommendationModalReducer.recommendation_type,
    recommendationID: state.recommendationModalReducer.recommendationID,
    venuesRecommendedIDs: state.userReducer.venuesRecommendedVenueIDs,
})
const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            closeRecommendationModal,
            clearRecommendationModal,
            fetchUser,
            openGuidelinesModal,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(RecommendationModal))
