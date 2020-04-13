// Dependencies
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import userReducer from './user/user_reducer'
import { UserReducerState } from './user/user_types'

const reducer = combineReducers({ userReducer })

const middleware = applyMiddleware(thunk)

const store = createStore(reducer, composeWithDevTools(middleware))

export interface StoreState {
    userReducer: UserReducerState
}

export default store
