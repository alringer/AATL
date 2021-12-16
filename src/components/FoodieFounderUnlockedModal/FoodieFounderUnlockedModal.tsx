import UnlockedFoodie from 'assets/foodie-badge-shining.svg'
import {
    FoodieFounderModalBadge,
    FoodieFounderModalContainer,
    FoodieFounderModalCustomDialog,
    FoodieFounderModalMessage,
    FoodieFounderModalOkCool,
    FoodieFounderModalSubtitle,
    FoodieFounderModalTitle,
    FoodieFounderText,
} from 'components/FoodieFounderUnlockedModal/FoodieFounderUnlockedModal.style'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { closeFoodieFounderUnlockedModal } from 'store/foodieFounderUnlockedModal/foodieFounderUnlocked_actions'
import { query } from 'style/device'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'

interface IFoodieFounderUnlockedModalProps extends IReduxProps, IWithAuthInjectedProps {}
interface IReduxProps {
    isOpen: boolean
    closeFoodieFounderUnlockedModal: () => void
}
const FoodieFounderUnlockedModal: React.FC<IFoodieFounderUnlockedModalProps> = ({
    isOpen,
    closeFoodieFounderUnlockedModal,
}) => {
    const closeModal = () => {
        closeFoodieFounderUnlockedModal()
    }

    return (
        <Media queries={query} defaultMatches={{ mobile: true }}>
            {(matches) => (
                <FoodieFounderModalCustomDialog
                    open={isOpen}
                    fullScreen={matches.laptop || matches.tablet ? false : true}
                    maxWidth="lg"
                >
                    <FoodieFounderModalContainer>
                        <FoodieFounderModalTitle>{S.FOODIE_MODAL.Title}</FoodieFounderModalTitle>
                        <FoodieFounderModalBadge src={UnlockedFoodie} alt="Founder Foodie Badge" />
                        <FoodieFounderModalSubtitle>
                            {S.FOODIE_MODAL.Subtitle1}
                            <FoodieFounderText>{S.FOODIE_MODAL.Subtitle2}</FoodieFounderText>
                            {S.FOODIE_MODAL.Subtitle3}
                        </FoodieFounderModalSubtitle>
                        <FoodieFounderModalMessage>{S.FOODIE_MODAL.Message}</FoodieFounderModalMessage>
                        <FoodieFounderModalOkCool onClick={closeModal}>
                            {S.FOODIE_MODAL.OkCool}
                        </FoodieFounderModalOkCool>
                    </FoodieFounderModalContainer>
                </FoodieFounderModalCustomDialog>
            )}
        </Media>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isOpen: state.foodieFounderUnlockedModalReducer.isOpen,
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ closeFoodieFounderUnlockedModal }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(FoodieFounderUnlockedModal))
