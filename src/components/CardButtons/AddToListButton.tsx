import Tooltip from '@material-ui/core/Tooltip'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import * as S from 'constants/StringConstants'
import React from 'react'
import { MoreOptionButton } from './CardButton.style'

interface IAddToListButtonProps {
    handleClick: () => void
}

const AddToListButton: React.FC<IAddToListButtonProps> = ({ handleClick }) => {
    return (
        <Tooltip placement="top" title={S.TOOL_TIPS.AddToList}>
            <MoreOptionButton onClick={handleClick}>
                <PlaylistAddIcon />
            </MoreOptionButton>
        </Tooltip>
    )
}

export default AddToListButton
