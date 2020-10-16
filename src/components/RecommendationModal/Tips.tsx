import RemoveIcon from '@material-ui/icons/Remove'
import LightBulbIcon from 'assets/lightbulb.svg'
import Image from 'components/Image/Image'
import * as S from 'constants/StringConstants'
import React from 'react'
import useComponentVisible from 'utilities/hooks/useComponentVisible'
import {
    RecommendationModalTipsButton,
    TipsCloseButton,
    TipsContainer,
    TipsDescription,
    TipsHeaderContainer,
    TipsHR,
    TipsMoreButton,
    TipsTitle,
    TipsToggledContainer
} from './RecommendationModal.style'

interface ITipsProps {}

const Tips: React.FC<ITipsProps> = () => {
    const [isTipToggled, setTipToggled] = React.useState(false)
    // Tips
    const tips = S.RECOMMENDATION_TIPS.Tips
    const [currentTipIndex, setCurrentTipIndex] = React.useState(0)
    const [currentTip, setCurrentTip] = React.useState<string>(tips[0])

    const tipRef = useComponentVisible(false)

    const handleMoreTips = () => {
        const newTipsIndex = currentTipIndex + 1
        if (newTipsIndex === tips.length) {
            setCurrentTipIndex(0)
            setCurrentTip(tips[0])
        } else {
            setCurrentTipIndex(newTipsIndex)
            setCurrentTip(tips[newTipsIndex])
        }
    }

    const handleViewTip = () => {
        tipRef.setIsComponentVisible(true)
        setTipToggled(true)
    }

    const handleCloseTip = () => {
        tipRef.setIsComponentVisible(false)
        setTipToggled(false)
    }

    return (
        <TipsContainer tabIndex={1}>
            {isTipToggled && tipRef.isComponentVisible ? (
                <TipsToggledContainer ref={tipRef.ref}>
                    <TipsHeaderContainer>
                        <TipsCloseButton onClick={handleCloseTip}>
                            <RemoveIcon />
                        </TipsCloseButton>
                    </TipsHeaderContainer>
                    <TipsTitle>{S.RECOMMENDATION_TIPS.Title}</TipsTitle>
                    <TipsHR />
                    <TipsDescription>{currentTip}</TipsDescription>
                    <TipsMoreButton onClick={handleMoreTips}>{S.BUTTON_LABELS.MoreTips}</TipsMoreButton>
                </TipsToggledContainer>
            ) : (
                <RecommendationModalTipsButton onClick={handleViewTip}>
                    <Image src={LightBulbIcon} alt="tips" />
                </RecommendationModalTipsButton>
            )}
        </TipsContainer>
    )
}

export default Tips
