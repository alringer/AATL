import SearchWorkBench from 'components/SearchWorkBench/SearchWorkBench'
import axios, { FETCH_TOP_CATEGORIES, SEARCH_AATL_RESTAURANTS } from 'config/AxiosConfig'
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
    ipLocation: ILocationInformation
    preferredLocation: ILocationInformation
    openSearchModal: () => void
}
interface ISearchProps extends IReduxProps, IWithAuthInjectedProps {}

const Search: React.FC<ISearchProps> = ({ openSearchModal, getTokenConfig, ipLocation, preferredLocation }) => {
    const [searchResults, setSearchResults] = React.useState<IVenue[]>([])
    const [topCategories, setTopCategories] = React.useState<ICategory[]>([])
    const [place, setPlace] = React.useState<string | null>()
    const [address, setAddress] = React.useState<string | null>()
    const [lat, setLat] = React.useState<string | null>()
    const [lng, setLng] = React.useState<string | null>()
    const [sort, setSort] = React.useState<string | null>()

    const router = useRouter()

    React.useEffect(() => {
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
        setPlace(queryPlace)
        setAddress(queryAddress)
        setLat(queryLat)
        setLng(queryLng)
        setSort(querySort)
        axios
            .post(
                SEARCH_AATL_RESTAURANTS,
                {
                    keyword: queryPlace ? queryPlace : '',
                    longitude: queryLng ? queryLng : Math.round(-117.161087),
                    latitude: queryLat ? queryLat : Math.round(32.715736),
                    sort: querySort ? querySort : SortEnum.MostRecommended,
                },
                {
                    headers: {
                        Authorization: getTokenConfig(),
                    },
                }
            )
            .then((res) => {
                console.log('Search result: ', res)
                setSearchResults(res.data)
            })
            .catch((err) => console.log(err))
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

    const handleSearch = (place?: string, address?: string, lat?: string, lng?: string, sort?: SortEnum) => {
        const paramsArray: ParamType[] = [
            { label: 'place', value: place ? encodeURIComponent(place) : place },
            { label: 'address', value: address ? encodeURIComponent(address) : address },
            { label: 'lat', value: lat },
            { label: 'lng', value: lng },
            { label: 'sort', value: sort },
        ]
        const paramsURL = buildURLWithParams(paramsArray)
        let url = `/search` + `${paramsURL ? '?' + paramsURL : ''}`
        router.push(url, undefined, { shallow: true })
    }

    return (
        <div>
            <SearchWorkBench
                inputPlace={place}
                inputAddress={address}
                inputLat={lat}
                inputLng={lng}
                inputSort={sort}
                searchResults={searchResults}
                topCategories={topCategories}
                handleSearch={handleSearch}
                openSearchModal={openSearchModal}
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
