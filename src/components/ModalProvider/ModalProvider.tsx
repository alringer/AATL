import AuthenticationModal from 'components/AuthenticationModal/AuthenticationModal'
import FlagModal from 'components/FlagModal/FlagModal'
import ListModal from 'components/ListModal/ListModal'
import RecommendationModal from 'components/RecommendationModal/RecommendationModal'
import SearchModal from 'components/SearchModal/SearchModal'
import UserProfileEditModal from 'components/UserProfile/UserProfileEditModal/UserProfileEditModal'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'

interface IReduxProps {
    isAuthenticationOpen: boolean
    isRecommendationModalOpen: boolean
    isSearchModalOpen: boolean
    isListModalOpen: boolean
    isUserProfileEditModalOpen: boolean
    isFlagModalOpen: boolean
}

interface IModalProviderProps extends IReduxProps {
    children: React.ReactChildren[]
}

const ModalProvider: React.FC<IModalProviderProps> = ({
    children,
    isAuthenticationOpen,
    isRecommendationModalOpen,
    isSearchModalOpen,
    isListModalOpen,
    isUserProfileEditModalOpen,
    isFlagModalOpen
}) => {
    return (
        <>
            {isAuthenticationOpen && <AuthenticationModal />}
            {isRecommendationModalOpen && <RecommendationModal />}
            {isSearchModalOpen && <SearchModal />}
            {isListModalOpen && <ListModal />}
            {isUserProfileEditModalOpen && <UserProfileEditModal />}
            {isFlagModalOpen && <FlagModal />}
            {children}
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isAuthenticationOpen: state.authModalReducer.isOpen,
    isRecommendationModalOpen: state.recommendationModalReducer.isOpen,
    isSearchModalOpen: state.searchModalReducer.isOpen,
    isListModalOpen: state.listModalReducer.isOpen,
    isUserProfileEditModalOpen: state.userProfileEditModalReducer.isOpen,
    isFlagModalOpen: state.flagModalReducer.isOpen
})

export default reduxConnect(mapStateToProps)(ModalProvider)
