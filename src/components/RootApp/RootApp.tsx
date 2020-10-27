import { useRouter } from 'next/router'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Footer from 'sections/Footer/Footer'
import Header from 'sections/Header/Header'
import { StoreState } from 'store'
import { fetchCategories } from 'store/categories/categories_actions'
import { PageContainer } from 'style/App.style'

interface IReduxProps {
    isPrelaunch: boolean
    fetchCategories: () => void
}

interface IRootAppProps extends IReduxProps {
    children: React.ReactNode
}

const RootApp: React.FC<IRootAppProps> = ({ children, fetchCategories, isPrelaunch }) => {
    const router = useRouter()

    React.useEffect(() => {
        fetchCategories()
    }, [])

    React.useEffect(() => {
        // console.log('Route: ', router.route.split('/'))
        // console.log('asPath: ', router.asPath)
        // console.log('pathname: ', router.pathname)
        // console.log('basePath: ', router.basePath)
        // console.log('query: ', router.query)
        if (
            !router.route.includes('/user-profile') &&
            !router.route.includes('/influencer-welcome') &&
            isPrelaunch === true
        ) {
            router.push('/influencer-welcome')
        }
    }, [router, isPrelaunch])
    return (
        <>
            <Header />
            <PageContainer>{children}</PageContainer>
            <Footer />
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isPrelaunch: state.prelaunchReducer.isPrelaunch,
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ fetchCategories }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(RootApp)
