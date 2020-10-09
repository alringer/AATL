import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { closeFlagModal } from 'store/flagModal/flagModal_actions'
import { query } from 'style/device'
import { FlagModalContainer, FlagModalCustomDialog } from './FlagModal.style'

interface IReduxProps {
    isOpen: boolean
    closeFlagModal: () => void
}

interface IFlagModalProps extends IReduxProps {}

const FlagModal: React.FC<IFlagModalProps> = ({ isOpen, closeFlagModal }) => {
    const flagModalRef = React.useRef(null)

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutsideFlagModal, true)
        return () => {
            document.removeEventListener('click', handleClickOutsideFlagModal, true)
        }
    }, [])

    const handleClickOutsideFlagModal = (event) => {
        if (
            flagModalRef.current &&
            !flagModalRef.current.contains(event.target)
            // &&
            // !(
            //     event.srcElement.className === 'MuiAutocomplete-option' ||
            //     event.target.id === 'suggestion' ||
            //     event.className === 'MuiAutocomplete-option'
            // )
        ) {
            closeFlagModal()
        }
    }

    const closeModal = () => {
        closeFlagModal()
    }
    
    return (
        <Media queries={query} defaultMatches={{ mobile: true }}>
            {(matches) => (
                <FlagModalCustomDialog open={isOpen} fullScreen={matches.laptop || matches.tablet ? false : true} maxWidth="lg">
                    <FlagModalContainer ref={flagModalRef}>
                        This is flag modal
                    </FlagModalContainer>
                </FlagModalCustomDialog>
            )}
        </Media>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isOpen: state.flagModalReducer.isOpen
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ closeFlagModal }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(FlagModal)