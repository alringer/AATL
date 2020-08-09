import DeleteRestaurantList from 'components/ListModal/DeleteRestaurantList'
import EditRestaurantList from 'components/ListModal/EditRestaurantList'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { closeListModal, switchListModalView } from 'store/listModal/listModal_actions'
import { ListModalViewEnum } from 'store/listModal/listModal_types'
import { query } from 'style/device'
import AddNewRestaurantList from './AddNewRestaurantList'
import AddToRestaurantList from './AddToRestaurantList'
import { CustomDialog, ListModalContentContainer } from './ListModal.style'

interface IReduxProps {
    isOpen: boolean
    currentListModalView: ListModalViewEnum
    closeListModal: () => void
    switchListModalView: (newListModalView: ListModalViewEnum) => void
}

interface IListModalProps extends IReduxProps {}

const ListModal: React.FC<IListModalProps> = ({
    isOpen,
    currentListModalView,
    closeListModal,
    switchListModalView,
}) => {
    const [currentView, setCurrentView] = React.useState<ListModalViewEnum | null>(
        currentListModalView ? currentListModalView : null
    )
    const listModalRef = React.useRef(null)

    React.useEffect(() => {
        setCurrentView(currentListModalView)
    }, [currentListModalView])

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

    const switchView = (newListModalView: ListModalViewEnum) => {
        switchListModalView(newListModalView)
    }
    // const switchViewToAddPlace = () => {
    //     setCurrentView(SearchModalViewNum.AddNewPlace)
    // }

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutsideSearchModal, true)
        return () => {
            document.removeEventListener('click', handleClickOutsideSearchModal, true)
        }
    }, [])

    return (
        <Media queries={query} defaultMatches={{ mobile: true }}>
            {(matches) => (
                <CustomDialog open={isOpen} fullScreen={matches.laptop || matches.tablet ? false : true} maxWidth="lg">
                    <ListModalContentContainer ref={listModalRef}>
                        {currentView === ListModalViewEnum.AddToRestaurantList ? (
                            <AddToRestaurantList closeModal={closeModal} switchView={switchView} />
                        ) : currentView === ListModalViewEnum.AddToNewRestaurantList ? (
                            <AddNewRestaurantList closeModal={closeModal} switchView={switchView} />
                        ) : currentView === ListModalViewEnum.EditRestaurantList ? (
                            <EditRestaurantList closeModal={closeModal} />
                        ) : currentView === ListModalViewEnum.DeleteRestaurantList ? (
                            <DeleteRestaurantList closeModal={closeModal} />
                        ) : null}
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

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ closeListModal, switchListModalView }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(ListModal)
