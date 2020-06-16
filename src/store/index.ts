// Dependencies
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { RecommendationModalReducerState } from 'store/recommendationModal/recommendationModal_types'
import authenticationReducer from './authentication/authentication_reducer'
import { AuthenticationReducerState } from './authentication/authentication_types'
import recommendationModalReducer from './recommendationModal/recommendationModal_reducer'
import searchModalReducer from './searchModal/searchModal_reducer'
import { SearchModalReducerState } from './searchModal/searchModal_types'
import userReducer from './user/user_reducer'
import { UserReducerState } from './user/user_types'

const reducer = combineReducers({ userReducer, authenticationReducer, recommendationModalReducer, searchModalReducer })

const middleware = applyMiddleware(thunk)

const store = createStore(reducer, composeWithDevTools(middleware))

export interface StoreState {
    userReducer: UserReducerState
    authenticationReducer: AuthenticationReducerState
    recommendationModalReducer: RecommendationModalReducerState
    searchModalReducer: SearchModalReducerState
}

export default store
