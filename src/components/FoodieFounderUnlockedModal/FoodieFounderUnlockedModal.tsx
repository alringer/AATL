import UnlockedFoodie from 'assets/foodie-badge-shining.svg'
import {
    FoodieFounderModalBadge,
    FoodieFounderModalCustomDialog,
    FoodieFounderModalMessage,
    FoodieFounderModalOkCool,
    FoodieFounderModalSubtitle,
    FoodieFounderModalTitle,
} from 'components/FoodieFounderUnlockedModal/FoodieFounderUnlockedModal.style'
import * as S from 'constants/StringConstants'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { closeFoodieFounderUnlockedModal } from 'store/foodieFounderUnlockedModal/foodieFounderUnlocked_actions'
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
        <FoodieFounderModalCustomDialog open={isOpen}>
            <FoodieFounderModalTitle>{S.FOODIE_MODAL.Title}</FoodieFounderModalTitle>
            <FoodieFounderModalBadge src={UnlockedFoodie} alt="Founder Foodie Badge" />
            <FoodieFounderModalSubtitle>{S.FOODIE_MODAL.Subtitle}</FoodieFounderModalSubtitle>
            <FoodieFounderModalMessage>{S.FOODIE_MODAL.Message}</FoodieFounderModalMessage>
            <FoodieFounderModalOkCool onClick={closeModal}>{S.FOODIE_MODAL.OkCool}</FoodieFounderModalOkCool>
        </FoodieFounderModalCustomDialog>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isOpen: state.foodieFounderUnlockedReducer.isOpen,
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ closeFoodieFounderUnlockedModal }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(FoodieFounderUnlockedModal))
