import { Tooltip } from '@material-ui/core'
import {
    CardPlaceWideForkContainer,
    CardPlaceWideForkMessageText,
    CardPlaceWideForksContainer,
} from 'components/CardRatings/CardRatings.style'
import RatingFork from 'components/CardRatings/RatingFork'
import * as S from 'constants/StringConstants'

interface IProps {
    rating: number
    uniqueID: number
    isAvg: boolean
    color?: string
}

const CardRatings: React.FC<IProps> = ({ rating, uniqueID, isAvg, color }) => {
    return (
        <Tooltip
            title={
                rating <= 3
                    ? S.RECOMMENDATION_EDITOR.ThreeForks
                    : rating <= 4
                    ? S.RECOMMENDATION_EDITOR.FourForks
                    : rating >= 5
                    ? S.RECOMMENDATION_EDITOR.FiveForks
                    : S.RECOMMENDATION_EDITOR.ThreeForks
            }
            placement="top-start"
        >
            <CardPlaceWideForksContainer>
                <CardPlaceWideForkContainer>
                    <RatingFork inputOffset={1} forkID={`${1}-${uniqueID}`} />
                </CardPlaceWideForkContainer>
                <CardPlaceWideForkContainer>
                    <RatingFork inputOffset={1} forkID={`${2}-${uniqueID}`} />
                </CardPlaceWideForkContainer>
                <CardPlaceWideForkContainer>
                    <RatingFork inputOffset={1} forkID={`${3}-${uniqueID}`} />
                </CardPlaceWideForkContainer>
                <CardPlaceWideForkContainer>
                    <RatingFork
                        inputOffset={rating >= 4 ? 1 : rating > 3 && rating < 4 ? rating - 3 : 0}
                        forkID={`${4}-${uniqueID}`}
                    />
                </CardPlaceWideForkContainer>
                <CardPlaceWideForkContainer>
                    <RatingFork
                        inputOffset={rating >= 5 ? 1 : rating > 4 && rating < 5 ? rating - 4 : 0}
                        forkID={`${5}-${uniqueID}`}
                    />
                </CardPlaceWideForkContainer>
                <CardPlaceWideForkMessageText style={color ? { color: 'white' } : {}}>
                    {`(${parseFloat(String(rating)).toFixed(1)}${isAvg ? ' AVG' : ''})`}
                </CardPlaceWideForkMessageText>
            </CardPlaceWideForksContainer>
        </Tooltip>
    )
}

export default CardRatings
