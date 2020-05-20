import Tooltip from '@material-ui/core/Tooltip'
import CallMadeIcon from '@material-ui/icons/CallMade'
import * as S from 'constants/StringConstants'
import React from 'react'
import { MoreOptionButton } from './CardButton.style'

interface IShareButtonProps {
    handleClick: () => void
}

const ShareButton: React.FC<IShareButtonProps> = ({ handleClick }) => {
    return (
        <Tooltip placement="top" title={S.TOOL_TIPS.ShareRestaurant}>
            <MoreOptionButton onClick={handleClick}>
                <CallMadeIcon />
            </MoreOptionButton>
        </Tooltip>
    )
}

export default ShareButton
