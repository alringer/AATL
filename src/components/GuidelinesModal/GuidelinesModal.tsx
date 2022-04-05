import { makeStyles } from '@material-ui/core/styles'
import {
    GuidelinesModalContainer,
    GuidelinesModalCustomDialog,
    GuidelinesModalDiv,
    GuidelinesModalHeader,
    GuidelinesModalMessage,
    GuidelinesModalOkGotIt,
    GuidelinesModalVerticalLine,
} from 'components/GuidelinesModal/GuidelinesModal.style'
import { GUIDELINES_MODAL } from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { closeGuidelinesModal } from 'store/guidelinesModal/guidelinesModal_actions'
import { query } from 'style/device'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'

interface IGuidelinesModalProps extends IReduxProps, IWithAuthInjectedProps {}
interface IReduxProps {
    isOpen: boolean
    closeGuidelinesModal: () => void
}
const GuidelinesModal: React.FC<IGuidelinesModalProps> = ({ isOpen, closeGuidelinesModal }) => {
    const closeModal = () => {
        closeGuidelinesModal()
    }

    const useStyles = makeStyles({
        guidelinesDialog: {
            position: 'fixed',
            bottom: 0,
        },
    })
    const classes = useStyles()

    const searchRef = React.useRef(null)

    const handleClickOutsideGuidelinesModal = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            closeGuidelinesModal()
        }
    }

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutsideGuidelinesModal, true)
        return () => {
            closeModal()
            document.removeEventListener('click', handleClickOutsideGuidelinesModal, true)
        }
    }, [])

    return (
        <Media queries={query} defaultMatches={{ mobile: true }}>
            {(matches) => (
                <GuidelinesModalCustomDialog
                    open={isOpen}
                    fullWidth={true}
                    maxWidth="xl"
                    classes={{ paper: classes.guidelinesDialog }}
                >
                    <GuidelinesModalContainer ref={searchRef}>
                        <GuidelinesModalHeader>{GUIDELINES_MODAL.Title}</GuidelinesModalHeader>
                        <GuidelinesModalDiv>
                            <GuidelinesModalMessage>{GUIDELINES_MODAL.Message}</GuidelinesModalMessage>
                            <GuidelinesModalVerticalLine></GuidelinesModalVerticalLine>
                            <GuidelinesModalOkGotIt onClick={closeGuidelinesModal}>
                                {GUIDELINES_MODAL.OkGotIt}
                            </GuidelinesModalOkGotIt>
                        </GuidelinesModalDiv>
                    </GuidelinesModalContainer>
                </GuidelinesModalCustomDialog>
            )}
        </Media>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isOpen: state.guidelinesModalReducer.isOpen,
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ closeGuidelinesModal }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(GuidelinesModal))
