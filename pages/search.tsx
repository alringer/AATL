import { IYelpRestaurant } from 'components/SearchModal/SearchRestaurant'
import SearchWorkBench from 'components/SearchWorkBench/SearchWorkBench'
import axios, { FETCH_TOP_CATEGORIES, SEARCH_AATL_RESTAURANTS, SEARCH_YELP_RESTAURANTS } from 'config/AxiosConfig'
import { useRouter } from 'next/router'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { ILocationInformation } from 'store/location/location_types'
import { openSearchModal } from 'store/searchModal/searchModal_actions'
import buildURLWithParams from 'utilities/helpers/buildURLWithParams'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { ICategory } from 'utilities/types/category'
import { ParamType } from 'utilities/types/clientDTOS/ParamType'
import { SortEnum } from 'utilities/types/clientDTOS/SortType'
import { IVenue } from 'utilities/types/venue'

interface IReduxProps {
    ipLocation: ILocationInformation | null
    preferredLocation: ILocationInformation | null
    openSearchModal: () => void
}
interface ISearchProps extends IReduxProps, IWithAuthInjectedProps {}

const Search: React.FC<ISearchProps> = ({ openSearchModal, getTokenConfig, ipLocation, preferredLocation }) => {
    const [searchResults, setSearchResults] = React.useState<IVenue[]>([])
    const [topCategories, setTopCategories] = React.useState<ICategory[]>([])
    const [place, setPlace] = React.useState<string | null>(null)
    const [categoryID, setCategoryID] = React.useState<string | null>(null)
    const [address, setAddress] = React.useState<string | null>(null)
    const [lat, setLat] = React.useState<string | null>(null)
    const [lng, setLng] = React.useState<string | null>(null)
    const [sort, setSort] = React.useState<string | null>(null)

    // LFB Search Parameters
    const [currentTotal, setCurrentTotal] = React.useState(0)
    const [currentPageCount, setCurrentPageCount] = React.useState(0)
    const [currentPage, setCurrentPage] = React.useState(1)
    // Yelp Search Parameters
    const [isRobust, setRobust] = React.useState(false)
    const [currentYelpOffset, setCurrentYelpOffset] = React.useState(0)
    const [currentYelpLimit, setCurrentYelpLimit] = React.useState(10)
    const [currentYelpPage, setCurrentYelpPage] = React.useState(1)
    const [currentYelpPageCount, setCurrentYelpPageCount] = React.useState(0)
    const [currentYelpTotal, setCurrentYelpTotal] = React.useState(0)
    const [currentYelpResults, setCurrentYelpResults] = React.useState<IYelpRestaurant[]>([])
    // Loading
    const [isLFBLoading, setLFBLoading] = React.useState(false)
    const [isYelpLoading, setYelpLoading] = React.useState(false)

    const router = useRouter()

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const queryRobust = router.query.robust && router.query.robust === 'true' ? true : false
        // LFB Parameters
        const queryCategoryID = router.query.categoryID ? String(router.query.categoryID) : null
        // Yelp Parameters
        let queryOffset = router.query.offset ? Number(router.query.offset) : null
        let queryLimit = router.query.limit ? Number(router.query.limit) : null
        // Shared Parameters
        const queryPlace = router.query.place ? String(router.query.place) : null
        let queryAddress = null
        let queryLat = null
        let queryLng = null
        if (router.query.address && router.query.lat && router.query.lng) {
            queryAddress = String(router.query.address)
            queryLat = String(router.query.lat)
            queryLng = String(router.query.lng)
        } else if (preferredLocation) {
            queryAddress = `${preferredLocation.city ? `${preferredLocation.city}, ` : ''}${
                preferredLocation.state ? `${preferredLocation.state}, ` : ''
            }${preferredLocation.country ? `${preferredLocation.country}` : ''}`
            queryLat = preferredLocation.lat
            queryLng = preferredLocation.lng
        } else if (ipLocation) {
            queryAddress = `${ipLocation.city ? `${ipLocation.city}, ` : ''}${
                ipLocation.state ? `${ipLocation.state}, ` : ''
            }${ipLocation.country ? `${ipLocation.country}` : ''}`
            queryLat = ipLocation.lat
            queryLng = ipLocation.lng
        }
        const querySort = router.query.sort ? String(router.query.sort) : null
        const queryPage = router.query.page ? Number(router.query.page) : null
        setPlace(queryPlace)
        setCategoryID(queryCategoryID)
        setAddress(queryAddress)
        setLat(queryLat)
        setLng(queryLng)
        setSort(querySort)
        setCurrentPage(queryPage)
        setRobust(queryRobust)

        // Yelp Parameters
        if (queryRobust) {
            searchYelp(queryPlace, queryLat, queryLng, queryOffset, queryLimit)
        } else {
            searchLFB(queryPlace, queryCategoryID, queryLat, queryLng, querySort, queryPage)
        }
        const topCategoriesConfig = {
            params: {
                longitude: queryLng ? queryLng : Math.round(-117.161087),
                latitude: queryLat ? queryLat : Math.round(32.715736),
                limit: 30,
            },
        }
        axios
            .get(FETCH_TOP_CATEGORIES, topCategoriesConfig)
            .then((res) => {
                setTopCategories(res.data)
            })
            .catch((err) => console.log(err))
    }, [router])

    const searchLFB = (
        inputPlace: string,
        inputCategoryID: string | undefined,
        inputLat: string | undefined,
        inputLng: string | undefined,
        inputSort,
        inputPage
    ) => {
        setLFBLoading(true)
        const payload =
            inputCategoryID !== null && inputCategoryID !== undefined
                ? {
                      categoryId: inputCategoryID ? inputCategoryID : '',
                      longitude: inputLng ? inputLng : Math.round(-117.161087),
                      latitude: inputLat ? inputLat : Math.round(32.715736),
                      sort: inputSort ? inputSort : SortEnum.BestRated,
                      page: inputPage ? inputPage : 0,
                  }
                : {
                      keyword: inputPlace ? inputPlace : '',
                      longitude: inputLng ? inputLng : Math.round(-117.161087),
                      latitude: inputLat ? inputLat : Math.round(32.715736),
                      sort: inputSort ? inputSort : SortEnum.BestRated,
                      page: inputPage ? inputPage : 0,
                  }
        axios
            .post(SEARCH_AATL_RESTAURANTS, payload)
            .then((res) => {
                if (res?.data?.content?.length > 0) {
                    setSearchResults(res.data.content)
                    setCurrentPage(res.data.number + 1)
                    setCurrentPageCount(res.data.totalPages)
                    setCurrentTotal(res.data.totalElements)
                    setRobust(false)
                } else {
                    // Trigger Yelp Search if there are no LFB results
                    searchYelp(inputPlace, inputLat, inputLng, currentYelpOffset, currentYelpLimit)
                }
            })
            .catch((err) => {
                // Trigger Yelp Search if there are no LFB results
                searchYelp(inputPlace, inputLat, inputLng, currentYelpOffset, currentYelpLimit)
                console.log(err)
            })
            .finally(() => {
                setLFBLoading(false)
            })
    }

    const searchYelp = (
        inputPlace: string,
        inputLat: string,
        inputLng: string,
        inputOffset: number,
        inputLimit: number
    ) => {
        setYelpLoading(true)
        axios
            .get(SEARCH_YELP_RESTAURANTS, {
                params: {
                    searchTerm: inputPlace ? inputPlace : '',
                    lat: inputLat ? inputLat : '40.7128',
                    lng: inputLng ? inputLng : '-74.0060',
                    radiusInMeter: 40000,
                    offset: inputOffset,
                    limit: inputLimit,
                },
            })
            .then((res) => {
                const newYelpTotal = res.data.total ? res.data.total : currentYelpTotal
                const newYelpPageCount = Math.ceil(res.data.total / inputLimit)
                const newYelpOffset =
                    res.data.restaurants && res.data.restaurants.length > 0
                        ? inputOffset + res.data.restaurants.length
                        : inputOffset
                const newYelpPage = inputOffset / inputLimit + 1
                setCurrentYelpTotal(newYelpTotal)
                setCurrentYelpPageCount(newYelpPageCount)
                setCurrentYelpOffset(newYelpOffset)
                setCurrentYelpPage(newYelpPage)
                const newSearchResults = res.data.restaurants &&
                    res.data.restaurants.length > 0 && [...res.data.restaurants]
                setCurrentYelpResults(newSearchResults)
                setRobust(true)
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setYelpLoading(false)
            })
    }

    const handleLFBSearch = (
        place?: string,
        categoryID?: string,
        address?: string,
        lat?: string,
        lng?: string,
        sort?: SortEnum,
        page?: string
    ) => {
        const paramsArray: ParamType[] = [
            { label: 'place', value: place ? encodeURIComponent(place) : place },
            { label: 'address', value: address ? encodeURIComponent(address) : address },
            { label: 'lat', value: lat },
            { label: 'lng', value: lng },
            { label: 'sort', value: sort },
            { label: 'categoryID', value: categoryID },
            { label: 'page', value: page },
            { label: 'robust', value: 'false' },
        ]
        const paramsURL = buildURLWithParams(paramsArray)
        let url = `/search` + `${paramsURL ? '?' + paramsURL : ''}`
        // LFB Search Parameters
        setSearchResults([])
        setCurrentTotal(0)
        setCurrentPageCount(0)
        setCurrentPage(1)
        // Yelp Search Parameters
        setCurrentYelpResults([])
        setCurrentYelpOffset(0)
        setCurrentYelpLimit(10)
        setCurrentYelpPage(1)
        setCurrentYelpPageCount(0)
        setCurrentYelpTotal(0)
        setCurrentYelpResults([])
        // Search Mode
        setRobust(false)
        // Trigger
        router.push(url, undefined, { shallow: true })
    }

    const handleYelpSearch = (
        place?: string,
        address?: string,
        lat?: string,
        lng?: string,
        offset?: string,
        limit?: string
    ) => {
        const paramsArray: ParamType[] = [
            { label: 'place', value: place ? encodeURIComponent(place) : place },
            { label: 'address', value: address ? encodeURIComponent(address) : address },
            { label: 'lat', value: lat },
            { label: 'lng', value: lng },
            { label: 'offset', value: offset },
            { label: 'limit', value: limit },
            { label: 'robust', value: 'true' },
        ]
        const paramsURL = buildURLWithParams(paramsArray)
        let url = `/search` + `${paramsURL ? '?' + paramsURL : ''}`
        // LFB Search Parameters
        setSearchResults([])
        setCurrentTotal(0)
        setCurrentPageCount(0)
        setCurrentPage(1)
        // Yelp Search Parameters
        setCurrentYelpResults([])
        setCurrentYelpOffset(0)
        setCurrentYelpLimit(10)
        setCurrentYelpPage(1)
        setCurrentYelpPageCount(0)
        setCurrentYelpTotal(0)
        setCurrentYelpResults([])
        // Search Mode
        setRobust(true)
        // Trigger
        router.push(url, undefined, { shallow: true })
    }

    return JSON.parse(localStorage.getItem('isPrelaunch')) ? (
        <p>Redirecting...</p>
    ) : (
        <div>
            <SearchWorkBench
                inputPlace={place}
                inputAddress={address}
                inputLat={lat}
                inputLng={lng}
                // LFB Search Parameters
                searchResults={searchResults}
                inputCategoryID={categoryID}
                inputSort={sort}
                inputPageCount={currentPageCount}
                inputPage={currentPage}
                inputTotal={currentTotal}
                // Yelp Search Parameters
                searchYelpResults={currentYelpResults}
                currentYelpPageCount={currentYelpPageCount}
                currentYelpPage={currentYelpPage}
                currentYelpTotal={currentYelpTotal}
                currentYelpOffset={currentYelpOffset}
                currentYelpLimit={currentYelpLimit}
                topCategories={topCategories}
                handleLFBSearch={handleLFBSearch}
                handleYelpSearch={handleYelpSearch}
                openSearchModal={openSearchModal}
                isRobust={isRobust}
                isLFBLoading={isLFBLoading}
                isYelpLoading={isYelpLoading}
            />
        </div>
    )
}

const mapStateToProps = (state: StoreState) => ({
    ipLocation: state.locationReducer.ipLocation,
    preferredLocation: state.locationReducer.preferredLocation,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            openSearchModal,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(Search))
