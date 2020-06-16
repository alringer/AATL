import Tooltip from '@material-ui/core/Tooltip'
import CallMadeIcon from '@material-ui/icons/CallMade'
import * as S from 'constants/StringConstants'
import React from 'react'
import {
    MobileMoreOptionButton,
    MobileMoreOptionButtonLabel,
    MobileMoreOptionSpan,
    MoreOptionButton,
} from './CardButton.style'

interface IShareButtonProps {
    handleClick: (e: React.MouseEvent<HTMLElement>) => void
    isMobile?: boolean
}

const ShareButton: React.FC<IShareButtonProps> = ({ handleClick, isMobile }) => {
    return isMobile ? (
        <Tooltip placement="top" title={S.TOOL_TIPS.AddToList}>
            <MobileMoreOptionButton onClick={handleClick}>
                <MobileMoreOptionSpan>
                    <CallMadeIcon />
                    <MobileMoreOptionButtonLabel>{S.TOOL_TIPS.Share}</MobileMoreOptionButtonLabel>
                </MobileMoreOptionSpan>
            </MobileMoreOptionButton>
        </Tooltip>
    ) : (
        <Tooltip placement="top" title={S.TOOL_TIPS.ShareRestaurant}>
            <MoreOptionButton onClick={handleClick}>
                <CallMadeIcon />
            </MoreOptionButton>
        </Tooltip>
    )
}

export default ShareButton
