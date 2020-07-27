import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { fetchCategories } from '../../store/categories/categories_actions'
interface IReduxProps {
    // preferredLocation: PreferredLocationReducerState
    fetchCategories: () => void
}
const RootApp = ({ children, fetchCategories, preferredLocation }) => {
    React.useEffect(() => {
        fetchCategories()
        // if (preferredLocation.lat === null && preferredLocation.long === null) {

        // }
    }, [])
    return <>{children}</>
}

const mapStateToProps = (state: StoreState) => ({
    // preferredLocation: state.preferredLocationReducer
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ fetchCategories }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(RootApp)
