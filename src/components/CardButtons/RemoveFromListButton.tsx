import Tooltip from '@material-ui/core/Tooltip'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import * as S from 'constants/StringConstants'
import React from 'react'
import {
    MobileMoreOptionButton,
    MobileMoreOptionButtonLabel,
    MobileMoreOptionSpan,
    MoreOptionButton,
} from './CardButton.style'

interface IRemoveFromListButtonProps {
    handleClick: (e: React.MouseEvent<HTMLElement>) => void
    isMobile?: boolean
}

const RemoveFromListButton: React.FC<IRemoveFromListButtonProps> = ({ handleClick, isMobile }) => {
    return isMobile ? (
        <Tooltip placement="top" title={S.TOOL_TIPS.RemoveFromList}>
            <MobileMoreOptionButton onClick={handleClick}>
                <MobileMoreOptionSpan>
                    <RemoveCircleOutlineIcon />
                    <MobileMoreOptionButtonLabel>{S.TOOL_TIPS.RemoveFromList}</MobileMoreOptionButtonLabel>
                </MobileMoreOptionSpan>
            </MobileMoreOptionButton>
        </Tooltip>
    ) : (
        <Tooltip placement="top" title={S.TOOL_TIPS.RemoveFromList}>
            <MoreOptionButton onClick={handleClick}>
                <RemoveCircleOutlineIcon />
            </MoreOptionButton>
        </Tooltip>
    )
}

export default RemoveFromListButton
