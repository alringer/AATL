import AuthenticationModal from 'components/AuthenticationModal/AuthenticationModal'
import RecommendationModal from 'components/RecommendationModal/RecommendationModal'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'

interface IReduxProps {
    isAuthenticationOpen: boolean
    isRecommendationModalOpen: boolean
}

interface IAuthWrapperProps extends IReduxProps {
    children: React.ReactChildren[]
}

const AuthWrapper: React.FC<IAuthWrapperProps> = ({ children, isAuthenticationOpen, isRecommendationModalOpen }) => {
    return (
        <>
            {isAuthenticationOpen && <AuthenticationModal />}
            {isRecommendationModalOpen && <RecommendationModal />}
            {children}
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isAuthenticationOpen: state.authenticationReducer.isOpen,
    isRecommendationModalOpen: state.recommendationModalReducer.isOpen,
})

export default reduxConnect(mapStateToProps)(AuthWrapper)
