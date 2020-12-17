import { CircularProgress } from '@material-ui/core'
import Image from 'components/Image/Image'
import SearchFull from 'components/SearchFull/SearchFull'
import axios, { SEARCH_YELP_RESTAURANTS } from 'config/AxiosConfig'
import * as S from 'constants/StringConstants'
import { useRouter } from 'next/router'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openRecommendationModal } from 'store/recommendationModal/recommendationModal_actions'
import { RecommendationModalPlaceInformation } from 'store/recommendationModal/recommendationModal_types'
import { concatCategories } from 'utilities/helpers/concatStrings'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { ICategory } from 'utilities/types/category'
import { SortEnum } from 'utilities/types/clientDTOS/SortType'
import {
    RecommendButton,
    SearchModalContentWrapper,
    SearchModalHeaderContainer,
    SearchModalHeaderText,
    SearchModalInputFieldsContainer,
    SearchModalLoadingIconContainer,
    SearchModalMatchesFound,
    SearchModalNoResultsHeader,
    SearchModalRestaurantCardAddress,
    SearchModalRestaurantCardAddressContainer,
    SearchModalRestaurantCardCategories,
    SearchModalRestaurantCardContainer,
    SearchModalRestaurantCardContentContainer,
    SearchModalRestaurantCardDetailsContainer,
    SearchModalRestaurantCardImageContainer,
    SearchModalRestaurantCardInformationsContainer,
    SearchModalRestaurantCardRestaurantName,
    SearchModalRestaurantCardsContainer,
    SearchModalScrollContainer,
    SearchModalSearchResultsContainer,
} from './SearchModal.style'

interface IReduxProps {
    openRecommendationModal: (placeInformation: RecommendationModalPlaceInformation) => void
}
interface ISearchRestaurantProps extends IReduxProps, IWithAuthInjectedProps {
    switchViewToAddPlace: () => void
    closeModal: () => void
}

interface IYelpRestaurant {
    address1: string | null
    address2: string | null
    address3: string | null
    categories: ICategory[]
    city: string | null
    closed: boolean | null
    country: string | null
    displayAddresses: string | null
    id: string | null
    imageURL: string | null
    latitude: number | null
    longitude: number | null
    name: string | null
    phone: string | null
    photos: null
    state: string | null
    zipCode: string | null
}

const SearchRestaurant: React.FC<ISearchRestaurantProps> = ({
    switchViewToAddPlace,
    closeModal,
    authenticatedAction,
    openRecommendationModal,
}) => {
    const [results, setResults] = React.useState<IYelpRestaurant[] | null>(null)
    const [offset, setOffset] = React.useState(0)
    const [total, setTotal] = React.useState(0)
    const [initialPlace, setInitialPlace] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)
    const [inputPlace, setInputPlace] = React.useState('')
    const [inputLat, setInputLat] = React.useState('')
    const [inputLng, setInputLng] = React.useState('')

    const scrollRef = React.useRef(null)
    const router = useRouter()

    React.useEffect(() => {
        const queryPlace = router.query.place ? String(router.query.place) : null
        setInitialPlace(queryPlace)
    }, [router])

    const handleScroll = (e) => {
        if (e) {
            const node = e.target
            if (node) {
                const bottom = node.scrollHeight - node.scrollTop === node.clientHeight
                if (bottom && !isLoading && results !== null) {
                    handleInfiniteScroll()
                }
            }
        }
    }

    const handleInfiniteScroll = () => {
        if (!(offset > total) && results !== null) {
            setLoading(true)
            axios
                .get(SEARCH_YELP_RESTAURANTS, {
                    params: {
                        searchTerm: inputPlace ? inputPlace : '',
                        lat: inputLat ? inputLat : '40.7128',
                        lng: inputLng ? inputLng : '-74.0060',
                        radiusInMeter: 40000,
                        offset: offset,
                    },
                })
                .then((res) => {
                    const newSearchResults =
                        res.data.restaurants && res.data.restaurants.length > 0
                            ? [...results, ...res.data.restaurants]
                            : results
                    const newTotal = res.data.total ? res.data.total : total
                    const newOffset =
                        res.data.restaurants && res.data.restaurants.length > 0
                            ? offset + res.data.restaurants.length
                            : offset
                    setResults(newSearchResults)
                    setTotal(newTotal)
                    setOffset(newOffset)
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    const handleSearch = (
        place?: string,
        categoryID?: string,
        address?: string,
        lat?: string,
        lng?: string,
        sort?: SortEnum
    ) => {
        const params = `?searchTerm=${place ? encodeURIComponent(place) : ''}&lat=${lat ? lat : '40.7128'}&lng=${
            lng ? lng : '-72.0060'
        }&radiusInMeter=40000`
        setInputPlace(place)
        setInputLat(lat)
        setInputLng(lng)
        axios
            .get(SEARCH_YELP_RESTAURANTS + params)
            .then((res) => {
                const newSearchResults =
                    res.data.restaurants && res.data.restaurants.length > 0 ? res.data.restaurants : []
                const newTotal = res.data.total ? res.data.total : 0
                const newOffset =
                    res.data.restaurants && res.data.restaurants.length > 0 ? res.data.restaurants.length : 0
                setResults(newSearchResults)
                setTotal(newTotal)
                setOffset(newOffset)
            })
            .catch((err) => console.log(err))
    }

    const handleRecommend = (id: string, name: string) => {
        authenticatedAction(() =>
            openRecommendationModal({
                placeID: id,
                placeName: name,
                isAATL: false,
            })
        )
    }

    const renderSearchModalRestaurantCard = (restaurant: IYelpRestaurant, key: number) => {
        return (
            <SearchModalRestaurantCardContainer key={key}>
                <SearchModalRestaurantCardContentContainer>
                    <SearchModalRestaurantCardImageContainer>
                        {/* TODO: Add default image url? */}
                        <Image src={restaurant.imageURL ? restaurant.imageURL : ''} alt="restaurant-image" />
                    </SearchModalRestaurantCardImageContainer>
                    <SearchModalRestaurantCardInformationsContainer>
                        <SearchModalRestaurantCardDetailsContainer>
                            <SearchModalRestaurantCardRestaurantName>
                                {restaurant.name}
                            </SearchModalRestaurantCardRestaurantName>
                            <SearchModalRestaurantCardCategories>
                                {restaurant.categories
                                    ? concatCategories(
                                          restaurant.categories.map((category: ICategory) => category.longName)
                                      )
                                    : null}
                            </SearchModalRestaurantCardCategories>
                            {/* <SearchModalRestaurantCardSpecials>{restaurant.specials}</SearchModalRestaurantCardSpecials> */}
                        </SearchModalRestaurantCardDetailsContainer>
                        <SearchModalRestaurantCardAddressContainer>
                            <SearchModalRestaurantCardAddress>
                                {restaurant.address1 ? restaurant.address1 : null}
                            </SearchModalRestaurantCardAddress>
                        </SearchModalRestaurantCardAddressContainer>
                    </SearchModalRestaurantCardInformationsContainer>
                </SearchModalRestaurantCardContentContainer>
                <RecommendButton
                    onClick={() =>
                        handleRecommend(restaurant.id ? restaurant.id : '', restaurant.name ? restaurant.name : '')
                    }
                >
                    {S.BUTTON_LABELS.Recommend}
                </RecommendButton>
            </SearchModalRestaurantCardContainer>
        )
    }

    return (
        <SearchModalScrollContainer ref={scrollRef} onScroll={handleScroll}>
            <SearchModalHeaderContainer>
                <SearchModalHeaderText>{S.RESTAURANT_SEARCH.Header}</SearchModalHeaderText>
            </SearchModalHeaderContainer>
            <SearchModalContentWrapper>
                <SearchModalInputFieldsContainer>
                    <SearchFull
                        handleSearch={handleSearch}
                        inputPlace={initialPlace}
                        inputCategoryID={null}
                        inputAddress={null}
                        inputLat={null}
                        inputLng={null}
                    />
                </SearchModalInputFieldsContainer>
                {results && (
                    <>
                        <SearchModalSearchResultsContainer>
                            {results && results.length === 0 && (
                                <SearchModalNoResultsHeader>No results found</SearchModalNoResultsHeader>
                            )}
                            <SearchModalMatchesFound>
                                {results && results.length > 0
                                    ? `${results.length} ${S.RESTAURANT_SEARCH.Matches}`
                                    : 'Try a different location, alternative spelling or a more generalized search.'}
                            </SearchModalMatchesFound>
                            <SearchModalRestaurantCardsContainer>
                                {results.map((result: IYelpRestaurant, index: number) => {
                                    return renderSearchModalRestaurantCard(result, index)
                                })}
                                {isLoading && (
                                    <SearchModalLoadingIconContainer>
                                        <CircularProgress />
                                    </SearchModalLoadingIconContainer>
                                )}
                            </SearchModalRestaurantCardsContainer>
                        </SearchModalSearchResultsContainer>
                        {/* <SearchModalSearchFooterContainer>
                            <CancelButton onClick={closeModal}>{S.BUTTON_LABELS.Cancel}</CancelButton>
                        </SearchModalSearchFooterContainer> */}
                    </>
                )}
            </SearchModalContentWrapper>
        </SearchModalScrollContainer>
    )
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ openRecommendationModal }, dispatch)
export default reduxConnect(null, mapDispatchToProps)(withAuth(SearchRestaurant))
