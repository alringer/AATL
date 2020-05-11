import Dialog from '@material-ui/core/Dialog'
import CloseButton from 'assets/recommendation-modal-close.svg'
import Image from 'components/Image/Image'
import {
    RecommendationModalContainer,
    RecommendationModalContentContainer,
    RecommendationModalHeaderContainer,
} from 'components/RecommendationModal/Recommendation.style'
import RecommendationEditor from 'components/RecommendationModal/RecommendationEditor'
import RecommendationPublished from 'components/RecommendationModal/RecommendationPublished'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import {
    clearRecommendationModal,
    closeRecommendationModal,
} from 'store/recommendationModal/recommendationModal_actions'
import { CustomIconButton } from 'style/Button/IconButton.style'

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

    const RecommendationEditorHeader = () => {
        return (
            <RecommendationModalHeaderContainer>
                <CustomIconButton onClick={closeRecommendationModal}>
                    <Image src={CloseButton} alt="close" />
                </CustomIconButton>
            </RecommendationModalHeaderContainer>
        )
    }
    return (
        <Dialog open={isOpen} fullScreen>
            <RecommendationModalContainer>
                <RecommendationEditorHeader />
                <RecommendationModalContentContainer>
                    {published ? (
                        <RecommendationPublished publishedTitle={publishedTitle} />
                    ) : (
                        <RecommendationEditor
                            placeName={placeName}
                            isLoading={isLoading}
                            handlePublish={handlePublish}
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
