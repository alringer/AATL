import Dialog from '@material-ui/core/Dialog'
import RecommendationEditor from 'components/RecommendationModal/RecommendationEditor'
import {
    RecommendationModalContainer,
    RecommendationModalContentContainer,
} from 'components/RecommendationModal/RecommendationModal.style'
import RecommendationPublished from 'components/RecommendationModal/RecommendationPublished'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import {
    clearRecommendationModal,
    closeRecommendationModal,
} from 'store/recommendationModal/recommendationModal_actions'
import RecommendationEditorHeader from './RecommendationEditorHeader'

interface IReduxProps {
    placeID: number | null
    placeName: string | null
    isOpen: boolean
    closeRecommendationModal: () => void
    clearRecommendationModal: () => void
}

interface IRecommendationModalProps extends IReduxProps {}

const RecommendationModal: React.FC<IRecommendationModalProps> = ({
    clearRecommendationModal,
    closeRecommendationModal,
    isOpen,
    placeID,
    placeName,
}) => {
    const [isLoading, setLoading] = React.useState(false)
    const [publishedTitle, setPublishedTitle] = React.useState('')
    const [published, setPublished] = React.useState(false)

    React.useEffect(() => {
        return () => {
            clearRecommendationModal()
        }
    }, [])

    const handlePublish = (title: string, description: string, file: File) => {
        // TODO: Call publish API
        // TODO: On successful publish, switch the modal view to the <PUBLISHED> view
        console.log('Call publish API for place with ID: ', placeID)
        console.log('Publish with title: ', title)
        console.log('Publish with description: ', description)
        console.log('File being published: ', file)
        setLoading(true)
        setTimeout(() => {
            setPublished(true)
            setPublishedTitle(title)
            setLoading(false)
        }, 2000)
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
                        <RecommendationPublished publishedTitle={publishedTitle} />
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
})
const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ closeRecommendationModal, clearRecommendationModal }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(RecommendationModal)
