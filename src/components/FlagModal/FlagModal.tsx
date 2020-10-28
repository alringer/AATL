import {
    CancelButton,
    ListModalFooterContainer,
    ListModalFooterRightContainer,
    ListModalHeaderContainer,
    ListModalHeaderText,
    ListModalMainAreaContainer,
    ListModalMainContentContainer,
    SubmitButton,
} from 'components/ListModal/ListModal.style'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { closeFlagModal } from 'store/flagModal/flagModal_actions'
import { query } from 'style/device'
import { FlagModalContainer, FlagModalCustomDialog, FlagModalInput, FlagModalTitle } from './FlagModal.style'

interface IReduxProps {
    isOpen: boolean
    closeFlagModal: () => void
}

interface IFlagModalProps extends IReduxProps {}

const FlagModal: React.FC<IFlagModalProps> = ({ isOpen, closeFlagModal }) => {
    const [inputReason, setInputReason] = React.useState('')
    const [isSubmitting, setSubmitting] = React.useState(false)

    const flagModalRef = React.useRef(null)

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutsideFlagModal, true)
        return () => {
            document.removeEventListener('click', handleClickOutsideFlagModal, true)
        }
    }, [])

    const handleClickOutsideFlagModal = (event) => {
        if (flagModalRef.current && !flagModalRef.current.contains(event.target)) {
            closeFlagModal()
        }
    }

    const closeModal = () => {
        closeFlagModal()
    }

    const handleChangeReason = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e) {
            setInputReason(e.target.value)
        }
    }
    const handleCancel = () => {
        closeModal()
    }
    const handleFlag = () => {
        // TODO: Call Flag API
        // TODO: Handle submitting states
        // TODO: Close the modal on success and toast
    }

    return (
        <Media queries={query} defaultMatches={{ mobile: true }}>
            {(matches) => (
                <FlagModalCustomDialog
                    open={isOpen}
                    fullScreen={matches.laptop || matches.tablet ? false : true}
                    maxWidth="lg"
                >
                    <FlagModalContainer ref={flagModalRef}>
                        <ListModalHeaderContainer>
                            <ListModalHeaderText>{S.FLAG_MODAL.Header}</ListModalHeaderText>
                        </ListModalHeaderContainer>
                        <ListModalMainAreaContainer>
                            <FlagModalTitle>{S.FLAG_MODAL.Title}</FlagModalTitle>
                            <ListModalMainContentContainer>
                                <FlagModalInput
                                    value={inputReason}
                                    placeholder={S.INPUT_PLACEHOLDERS.Reason}
                                    onChange={handleChangeReason}
                                    variant="outlined"
                                    InputLabelProps={{ shrink: false }}
                                />
                            </ListModalMainContentContainer>
                        </ListModalMainAreaContainer>
                        <ListModalFooterContainer>
                            <ListModalFooterRightContainer>
                                <CancelButton onClick={handleCancel}>{S.BUTTON_LABELS.Cancel}</CancelButton>
                                <SubmitButton onClick={handleFlag} disabled={!inputReason}>
                                    {S.BUTTON_LABELS.Flag}
                                </SubmitButton>
                            </ListModalFooterRightContainer>
                        </ListModalFooterContainer>
                    </FlagModalContainer>
                </FlagModalCustomDialog>
            )}
        </Media>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isOpen: state.flagModalReducer.isOpen,
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ closeFlagModal }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(FlagModal)
