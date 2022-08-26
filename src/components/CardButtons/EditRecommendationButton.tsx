import Tooltip from '@material-ui/core/Tooltip'
import CreateIcon from '@material-ui/icons/Create'
import * as S from 'constants/StringConstants'
import React from 'react'
import {
    MobileMoreOptionButton,
    MobileMoreOptionButtonLabel,
    MobileMoreOptionSpan,
    MoreOptionButton,
} from './CardButton.style'

interface IEditRecommendationButtonProps {
    handleClick: (e: React.MouseEvent<HTMLElement>) => void
    isMobile?: boolean
}

const EditRecommendationButton: React.FC<IEditRecommendationButtonProps> = ({ handleClick, isMobile }) => {
    return isMobile ? (
        <Tooltip placement="top" title={S.TOOL_TIPS.Edit}>
            <MobileMoreOptionButton onClick={handleClick}>
                <MobileMoreOptionSpan>
                    <CreateIcon />
                    <MobileMoreOptionButtonLabel>{S.TOOL_TIPS.Edit}</MobileMoreOptionButtonLabel>
                </MobileMoreOptionSpan>
            </MobileMoreOptionButton>
        </Tooltip>
    ) : (
        <Tooltip placement="top" title={S.TOOL_TIPS.EditRecommendation}>
            <MoreOptionButton onClick={handleClick}>
                <CreateIcon />
            </MoreOptionButton>
        </Tooltip>
    )
}

export default EditRecommendationButton
