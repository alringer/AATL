import Tooltip from '@material-ui/core/Tooltip'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
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

const AddToListButton: React.FC<IAddToListButtonProps> = ({ handleClick, isMobile }) => {
    return isMobile ? (
        <Tooltip placement="top" title={S.TOOL_TIPS.AddToList}>
            <MobileMoreOptionButton onClick={handleClick}>
                <MobileMoreOptionSpan>
                    <PlaylistAddIcon />
                    <MobileMoreOptionButtonLabel>{S.TOOL_TIPS.AddToList}</MobileMoreOptionButtonLabel>
                </MobileMoreOptionSpan>
            </MobileMoreOptionButton>
        </Tooltip>
    ) : (
        <Tooltip placement="top" title={S.TOOL_TIPS.AddToList}>
            <MoreOptionButton onClick={handleClick}>
                <PlaylistAddIcon />
            </MoreOptionButton>
        </Tooltip>
    )
}

export default AddToListButton
