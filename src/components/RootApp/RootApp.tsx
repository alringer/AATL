import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import * as B from 'constants/SnackbarConstants'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
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
    isLoggedIn: boolean
    fetchCategories: () => void
}

interface IRootAppProps extends IReduxProps {
    children: React.ReactNode
}

const RootApp: React.FC<IRootAppProps> = ({ children, fetchCategories, isPrelaunch, isLoggedIn }) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    React.useEffect(() => {
        localStorage.setItem('isPrelaunch', JSON.stringify(isPrelaunch))
    }, [isPrelaunch])

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
            JSON.parse(localStorage.getItem('isPrelaunch')) &&
            !router.route.includes('/me') &&
            !router.route.includes('/influencer-welcome') &&
            !router.route.includes('/admin') &&
            !router.route.includes('recommendations-lists') &&
            !router.route.includes('recommendation-list')
        ) {
            if (isLoggedIn) {
                router.push('/user-profile/me')
            } else {
                router.push('/influencer-welcome')
            }
            if (router.route !== '/')
                enqueueSnackbar('', {
                    content: (
                        <div>
                            <Snackbar
                                type={B.SNACKBAR_TYPES.Complete}
                                title={B.PRELAUNCH_MESSAGE.Title}
                                message={<SnackbarMessageBody>{B.PRELAUNCH_MESSAGE.Body}</SnackbarMessageBody>}
                            />
                        </div>
                    ),
                })
        }
    }, [router, isPrelaunch, isLoggedIn])
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
    isLoggedIn: state.userReducer.loggedIn,
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ fetchCategories }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(RootApp)
