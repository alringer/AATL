import Tooltip from '@material-ui/core/Tooltip'
import CreateIcon from '@material-ui/icons/Create'
import * as S from 'constants/StringConstants'
import React from 'react'
import { MoreOptionButton } from './CardButton.style'

interface IWriteRecommendationButtonProps {
    handleClick: () => void
}

const WriteRecommendationButton: React.FC<IWriteRecommendationButtonProps> = ({ handleClick }) => {
    return (
        <Tooltip placement="top" title={S.TOOL_TIPS.WriteRecommendation}>
            <MoreOptionButton>
                <CreateIcon />
            </MoreOptionButton>
        </Tooltip>
    )
}

export default WriteRecommendationButton
