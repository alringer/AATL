import Tooltip from '@material-ui/core/Tooltip'
import FlagIcon from '@material-ui/icons/Flag'
import * as S from 'constants/StringConstants'
import React from 'react'
import { MoreOptionButton } from './CardButton.style'

interface IAddToListButtonProps {
    handleClick: () => void
}

const FlagButton: React.FC<IAddToListButtonProps> = ({ handleClick }) => {
    return (
        <Tooltip placement="top" title={S.TOOL_TIPS.Flag}>
            <MoreOptionButton>
                <FlagIcon />
            </MoreOptionButton>
        </Tooltip>
    )
}

export default FlagButton
