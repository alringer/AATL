import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { openRecommendationModal } from 'store/recommendationModal/recommendationModal_actions'
import { RecommendationModalPlaceInformation } from 'store/recommendationModal/recommendationModal_types'
import EmailSubscription from '../src/components/EmailSubscription/EmailSubscription'

interface IReduxProps {
    isOpen: boolean
    openRecommendationModal: (placeInformation: RecommendationModalPlaceInformation) => void
}

interface IIndexProps extends IReduxProps {}

const Index: React.FC<IIndexProps> = ({ isOpen, openRecommendationModal }) => {
    return (
        <>
            {/* <button onClick={() => openRecommendationModal({ placeID: 0, placeName: 'Alaskan Salmon' })}>
                Hello there
            </button> */}
            {/* {isOpen && <RecommendationModal />} */}
            <EmailSubscription />
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isRecommendationOpen: state.recommendationModalReducer.isOpen,
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ openRecommendationModal }, dispatch)
export default reduxConnect(mapStateToProps, mapDispatchToProps)(Index)
