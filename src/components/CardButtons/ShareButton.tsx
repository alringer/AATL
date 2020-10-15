import Tooltip from '@material-ui/core/Tooltip'
import CallMadeIcon from '@material-ui/icons/CallMade'
import * as S from 'constants/StringConstants'
import React from 'react'
import {
    MobileMoreOptionButton,
    MobileMoreOptionButtonLabel,
    MobileMoreOptionSpan,
    MoreOptionButton
} from './CardButton.style'

interface IShareButtonProps {
    handleClick: (e: React.MouseEvent<HTMLElement>) => void
    isMobile?: boolean
    isRestaurant?: boolean
}

const ShareButton: React.FC<IShareButtonProps> = ({ handleClick, isMobile, isRestaurant }) => {
    return isMobile ? (
        <Tooltip placement="top" title={isRestaurant ? S.TOOL_TIPS.ShareRestaurant : S.TOOL_TIPS.ShareRecommendation}>
            <MobileMoreOptionButton onClick={handleClick}>
                <MobileMoreOptionSpan>
                    <CallMadeIcon />
                    <MobileMoreOptionButtonLabel>{S.TOOL_TIPS.Share}</MobileMoreOptionButtonLabel>
                </MobileMoreOptionSpan>
            </MobileMoreOptionButton>
        </Tooltip>
    ) : (
        <Tooltip placement="top" title={isRestaurant ? S.TOOL_TIPS.ShareRestaurant : S.TOOL_TIPS.ShareRecommendation}>
            <MoreOptionButton onClick={handleClick}>
                <CallMadeIcon />
            </MoreOptionButton>
        </Tooltip>
    )
}

export default ShareButton
