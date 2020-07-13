import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCategories } from '../../store/categories/categories_actions'
interface IReduxProps {
    fetchCategories: () => void
}
const RootApp = ({ children, fetchCategories }) => {
    React.useEffect(() => {
        fetchCategories()
    }, [])
    return <>{children}</>
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ fetchCategories }, dispatch)

export default reduxConnect(null, mapDispatchToProps)(RootApp)
