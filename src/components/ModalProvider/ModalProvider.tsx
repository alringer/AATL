import AuthenticationModal from 'components/AuthenticationModal/AuthenticationModal'
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
}) => {
    return (
        <>
            {isAuthenticationOpen && <AuthenticationModal />}
            {isRecommendationModalOpen && <RecommendationModal />}
            {isSearchModalOpen && <SearchModal />}
            {isListModalOpen && <ListModal />}
            {isUserProfileEditModalOpen && <UserProfileEditModal />}
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
})

export default reduxConnect(mapStateToProps)(ModalProvider)
