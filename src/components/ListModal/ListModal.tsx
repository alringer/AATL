import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { closeListModal } from 'store/listModal/listModal_actions'
import { ListModalViewEnum } from 'store/listModal/listModal_types'
import { query } from 'style/device'
import AddToRestaurantList from './AddToRestaurantList'
import { CustomDialog, ListModalContentContainer } from './ListModal.style'

interface IReduxProps {
    isOpen: boolean
    currentListModalView: ListModalViewEnum
    closeListModal: () => void
}

interface IListModalProps extends IReduxProps {}

const ListModal: React.FC<IListModalProps> = ({ isOpen, currentListModalView, closeListModal }) => {
    const [currentView, setCurrentView] = React.useState(
        currentListModalView ? currentListModalView : ListModalViewEnum.AddToRestaurantList
    )
    const listModalRef = React.useRef(null)

    const handleClickOutsideSearchModal = (event) => {
        if (
            listModalRef.current &&
            !listModalRef.current.contains(event.target)
            // &&
            // !(
            //     event.srcElement.className === 'MuiAutocomplete-option' ||
            //     event.target.id === 'suggestion' ||
            //     event.className === 'MuiAutocomplete-option'
            // )
        ) {
            closeListModal()
        }
    }

    const closeModal = () => {
        closeListModal()
    }

    // const switchViewToSearch = () => {
    //     setCurrentView(SearchModalViewNum.Search)
    // }
    // const switchViewToAddPlace = () => {
    //     setCurrentView(SearchModalViewNum.AddNewPlace)
    // }

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
                    <ListModalContentContainer ref={listModalRef}>
                        {currentView === ListModalViewEnum.AddToRestaurantList ? <AddToRestaurantList /> : null}
                    </ListModalContentContainer>
                </CustomDialog>
            )}
        </Media>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isOpen: state.listModalReducer.isOpen,
    currentListModalView: state.listModalReducer.currentListModalView,
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ closeListModal }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(ListModal)
