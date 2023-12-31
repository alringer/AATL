// Dependencies
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { InfluencerTourModalReducerState } from 'store/influencerTourModal/influencerTourModal_types'
import listModalReducer from 'store/listModal/listModal_reducer'
import { ListModalReducerState } from 'store/listModal/listModal_types'
import { RecommendationModalReducerState } from 'store/recommendationModal/recommendationModal_types'
import authModalReducer from './authModal/authModal_reducer'
import { AuthModalReducerState } from './authModal/authModal_types'
import categoriesReducer from './categories/categories_reducer'
import { CategoriesReducerState } from './categories/categories_types'
import deleteRecommendationModalReducer from './deleteRecommendationModal/deleteRecommendationModal_reducer'
import { DeleteRecommendationModalReducerState } from './deleteRecommendationModal/deleteRecommendationModal_types'
import flagModalReducer from './flagModal/flagModal_reducer'
import { FlagModalReducerState } from './flagModal/flagModal_types'
import influencerTourModalReducer from './influencerTourModal/influencerTourModal_reducer'
import locationReducer from './location/location_reducer'
import { LocationReducerState } from './location/location_types'
import prelaunchReducer from './prelaunch/prelaunch_reducer'
import { PrelaunchReducerState } from './prelaunch/prelaunch_types'
import recommendationModalReducer from './recommendationModal/recommendationModal_reducer'
import searchModalReducer from './searchModal/searchModal_reducer'
import { SearchModalReducerState } from './searchModal/searchModal_types'
import userReducer from './user/user_reducer'
import { UserReducerState } from './user/user_types'
import userProfileEditModalReducer from './userProfileEditModal/userProfileEditModal_reducer'
import { UserProfileEditModalReducerState } from './userProfileEditModal/userProfileEditModal_types'

const reducer = combineReducers({
    userReducer,
    authModalReducer,
    recommendationModalReducer,
    searchModalReducer,
    categoriesReducer,
    locationReducer,
    listModalReducer,
    userProfileEditModalReducer,
    flagModalReducer,
    deleteRecommendationModalReducer,
    prelaunchReducer,
    influencerTourModalReducer,
})

const middleware = applyMiddleware(thunk)

const store = createStore(reducer, composeWithDevTools(middleware))

export interface StoreState {
    userReducer: UserReducerState
    categoriesReducer: CategoriesReducerState
    locationReducer: LocationReducerState
    listModalReducer: ListModalReducerState
    recommendationModalReducer: RecommendationModalReducerState
    authModalReducer: AuthModalReducerState
    searchModalReducer: SearchModalReducerState
    userProfileEditModalReducer: UserProfileEditModalReducerState
    flagModalReducer: FlagModalReducerState
    deleteRecommendationModalReducer: DeleteRecommendationModalReducerState
    prelaunchReducer: PrelaunchReducerState
    influencerTourModalReducer: InfluencerTourModalReducerState
}

export default store
