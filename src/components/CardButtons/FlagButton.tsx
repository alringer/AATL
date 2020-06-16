import Tooltip from '@material-ui/core/Tooltip'
import FlagIcon from '@material-ui/icons/Flag'
import * as S from 'constants/StringConstants'
import React from 'react'
import {
    MobileMoreOptionButton,
    MobileMoreOptionButtonLabel,
    MobileMoreOptionSpan,
    MoreOptionButton,
} from './CardButton.style'

interface IAddToListButtonProps {
    handleClick: (e: React.MouseEvent<HTMLElement>) => void
    isMobile?: boolean
}

const FlagButton: React.FC<IAddToListButtonProps> = ({ handleClick, isMobile }) => {
    return isMobile ? (
        <Tooltip placement="top" title={S.TOOL_TIPS.AddToList}>
            <MobileMoreOptionButton onClick={handleClick}>
                <MobileMoreOptionSpan>
                    <FlagIcon />
                    <MobileMoreOptionButtonLabel>{S.TOOL_TIPS.Flag}</MobileMoreOptionButtonLabel>
                </MobileMoreOptionSpan>
            </MobileMoreOptionButton>
        </Tooltip>
    ) : (
        <Tooltip placement="top" title={S.TOOL_TIPS.Flag}>
            <MoreOptionButton>
                <FlagIcon />
            </MoreOptionButton>
        </Tooltip>
    )
}

export default FlagButton
