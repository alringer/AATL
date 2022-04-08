import StaticWelcomeBanner from 'components/StaticWelcome/StaticWelcomeBanner/StaticWelcomeBanner'
import TermsAndConditionsContent from 'components/TermsAndConditionsContent/TermsAndConditionsContent'
import React from 'react'

const TermsAndConditions = () => {
    return JSON.parse(localStorage.getItem('isPrelaunch')) ? (
        <p>Redirecting...</p>
    ) : (
        <>
            <StaticWelcomeBanner />
            <TermsAndConditionsContent />
        </>
    )
}

export default TermsAndConditions
