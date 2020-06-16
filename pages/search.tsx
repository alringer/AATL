import RestaurantImageFour from 'assets/mock-images/earl-sandwich.jpg'
import RestaurantImageOne from 'assets/mock-images/restaurant_image.jpg'
import RestaurantImageTwo from 'assets/mock-images/restaurant_image2.jpeg'
import RestaurantImageThree from 'assets/mock-images/sushi_image.png'
import SearchWorkBench from 'components/SearchWorkBench/SearchWorkBench'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openSearchModal } from 'store/searchModal/searchModal_actions'
import { PlaceBannerData } from 'stories/PlaceBanner.stories'
import { IPlace } from 'utilities/types/place'

interface IReduxProps {
    openSearchModal: () => void
}
interface ISearchProps extends IReduxProps {
    queryPlace: string
    queryAddress: string
}

export interface IMockSearchResult {
    name: string
    categories: string[]
    specials: string
    address: string
    imgSrc: string
}

const MOCK_SEARCH_RESULTS: IMockSearchResult[] = [
    {
        name: 'Kawaii Sushi',
        categories: ['Seafood'],
        specials: 'Free soup for a sandwich',
        address: '123 Where St',
        imgSrc: RestaurantImageOne,
    },
    {
        name: 'Tokyo Sushi Loha',
        categories: ['Breakfast', 'Sushi'],
        specials: 'Amazing BBQ & happy-hour specials',
        address: '123 Where St',
        imgSrc: RestaurantImageTwo,
    },
    {
        name: 'I Luv Sushi',
        categories: ['Breakfast', 'American', 'Sushi'],
        specials: 'Creative sushi & happy-hour specials',
        address: '123 Where St',
        imgSrc: RestaurantImageThree,
    },
    {
        name: "Nakamura's",
        categories: ['Japanese', 'Sushi'],
        specials: 'Creative sushi & happy-hour specials',
        address: '123 Where St',
        imgSrc: RestaurantImageFour,
    },
]

const Search: React.FC<ISearchProps> = ({ openSearchModal, queryPlace, queryAddress }) => {
    const [searchResults, setSearchResults] = React.useState<IPlace[]>([])
    const [placeEntry, setPlaceEntry] = React.useState('')
    const [addressEntry, setAddressEntry] = React.useState('')
    const router = useRouter()

    React.useEffect(() => {
        setPlaceEntry(queryPlace ? queryPlace : '')
        setAddressEntry(queryAddress ? queryAddress : '')
        // TODO: Do a search with the queries
        setSearchResults([PlaceBannerData.default, PlaceBannerData.longName])
    }, [])

    const handleSearch = (place?: string, address?: string) => {
        let url = `/search`
        if (place && address) {
            url = url + `?place=${place}&address=${address}`
        } else if (place) {
            url = url + `?place=${place}`
        } else if (address) {
            url = url + `?address=${address}`
        }
        router.push(url, undefined, { shallow: true })
        setPlaceEntry(place ? place : '')
        setAddressEntry(address ? address : '')
        // TODO: Do a search with the queries
        setSearchResults([
            PlaceBannerData.default,
            PlaceBannerData.longName,
            PlaceBannerData.default,
            PlaceBannerData.longName,
        ])
    }

    return (
        <div>
            <SearchWorkBench
                inputPlace={placeEntry ? placeEntry : ''}
                inputAddress={addressEntry ? addressEntry : ''}
                searchResults={searchResults}
                handleSearch={handleSearch}
                openSearchModal={openSearchModal}
            />
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { place, address } = context.query

    console.log(context.query)

    return {
        props: {
            queryPlace: place ? place : '',
            queryAddress: address ? address : '',
        },
    }
}

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            openSearchModal,
        },
        dispatch
    )

export default reduxConnect(null, mapDispatchToProps)(Search)
