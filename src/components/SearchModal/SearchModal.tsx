import Dialog from '@material-ui/core/Dialog'
import RestaurantImageFour from 'assets/mock-images/earl-sandwich.jpg'
import RestaurantImageOne from 'assets/mock-images/restaurant_image.jpg'
import RestaurantImageTwo from 'assets/mock-images/restaurant_image2.jpeg'
import RestaurantImageThree from 'assets/mock-images/sushi_image.png'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { closeSearchModal } from 'store/searchModal/searchModal_actions'
import { SearchModalViewNum } from 'store/searchModal/searchModal_types'
import { query } from 'style/device'
import AddNewPlace from './AddNewPlace'
import { SearchModalContentContainer } from './SearchModal.style'
import SearchRestaurant from './SearchRestaurant'

interface IReduxProps {
    isOpen: boolean
    closeSearchModal: () => void
}

interface ISearchModalProps extends IReduxProps {}

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

const SearchModal: React.FC<ISearchModalProps> = ({ isOpen, closeSearchModal }) => {
    const [currentView, setCurrentView] = React.useState(SearchModalViewNum.Search)
    const [place, setPlace] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [searchResults, setSearchResults] = React.useState<IMockSearchResult[]>([])

    const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlace(String(e.target.value))
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(String(e.target.value))
    }

    const handleSearch = () => {
        setSearchResults(MOCK_SEARCH_RESULTS)
    }

    const searchRef = React.useRef(null)

    const handleClickOutsideSearchModal = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            closeSearchModal()
        }
    }

    const closeModal = () => {
        closeSearchModal()
    }

    const switchViewToSearch = () => {
        setCurrentView(SearchModalViewNum.Search)
    }
    const switchViewToAddPlace = () => {
        setCurrentView(SearchModalViewNum.AddNewPlace)
    }

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutsideSearchModal, true)
        return () => {
            closeModal()
            document.removeEventListener('click', handleClickOutsideSearchModal, true)
        }
    }, [])

    return (
        <Media queries={query} defaultMatches={{ laptop: true }}>
            {(matches) => (
                <Dialog open={isOpen} fullScreen={matches.laptop || matches.tablet ? false : true} maxWidth="lg">
                    <SearchModalContentContainer ref={searchRef}>
                        {currentView === SearchModalViewNum.Search ? (
                            <SearchRestaurant
                                switchViewToAddPlace={switchViewToAddPlace}
                                place={place}
                                address={address}
                                searchResults={searchResults}
                                handlePlaceChange={handlePlaceChange}
                                handleAddressChange={handleAddressChange}
                                handleSearch={handleSearch}
                            />
                        ) : currentView === SearchModalViewNum.AddNewPlace ? (
                            <AddNewPlace switchViewToSearch={switchViewToSearch} />
                        ) : null}
                    </SearchModalContentContainer>
                </Dialog>
            )}
        </Media>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isOpen: state.searchModalReducer.isOpen,
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ closeSearchModal }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(SearchModal)
