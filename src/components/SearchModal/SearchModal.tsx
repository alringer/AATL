import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { closeSearchModal } from 'store/searchModal/searchModal_actions'
import { SearchModalViewNum } from 'store/searchModal/searchModal_types'
import { query } from 'style/device'
import AddNewPlace from './AddNewPlace'
import { CustomDialog, SearchModalContentContainer } from './SearchModal.style'
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

const SearchModal: React.FC<ISearchModalProps> = ({ isOpen, closeSearchModal }) => {
    const [currentView, setCurrentView] = React.useState(SearchModalViewNum.Search)

    const searchRef = React.useRef(null)

    const handleClickOutsideSearchModal = (event) => {
        if (
            searchRef.current &&
            !searchRef.current.contains(event.target) &&
            !(
                event.srcElement.className === 'MuiAutocomplete-option' ||
                event.target.id === 'suggestion' ||
                event.className === 'MuiAutocomplete-option'
            )
            // !(event.target.id === 'suggestion' || event.className === 'MuiAutocomplete-option')
        ) {
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
        <Media queries={query} defaultMatches={{ mobile: true }}>
            {(matches) => (
                <CustomDialog open={isOpen} fullScreen={matches.laptop || matches.tablet ? false : true} maxWidth="lg">
                    <SearchModalContentContainer ref={searchRef}>
                        {currentView === SearchModalViewNum.Search ? (
                            <SearchRestaurant switchViewToAddPlace={switchViewToAddPlace} closeModal={closeModal} />
                        ) : currentView === SearchModalViewNum.AddNewPlace ? (
                            <AddNewPlace switchViewToSearch={switchViewToSearch} />
                        ) : null}
                    </SearchModalContentContainer>
                </CustomDialog>
            )}
        </Media>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isOpen: state.searchModalReducer.isOpen,
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ closeSearchModal }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(SearchModal)
