import EmptyFork from 'assets/icon-empty-ic-fork-rating.svg'
import FilledFork from 'assets/icon-filled-ic-fork-rating.svg'
import {
    CardPlaceWideForkContainer,
    CardPlaceWideForkMessageText,
    CardPlaceWideForksContainer,
} from 'components/CardRatings/CardRatings.style'
import { default as SVGImage } from 'components/Image/Image'

interface IProps {
    rating: number
    color?: string
}

const CardRatings: React.FC<IProps> = ({ rating, color }) => {
    return (
        <CardPlaceWideForksContainer>
            <CardPlaceWideForkContainer>
                {rating >= 1 ? (
                    <SVGImage src={FilledFork} alt="filled-fork" />
                ) : (
                    <SVGImage src={EmptyFork} alt="empty-fork" />
                )}
            </CardPlaceWideForkContainer>
            <CardPlaceWideForkContainer>
                {rating >= 2 ? (
                    <SVGImage src={FilledFork} alt="filled-fork" />
                ) : (
                    <SVGImage src={EmptyFork} alt="empty-fork" />
                )}
            </CardPlaceWideForkContainer>
            <CardPlaceWideForkContainer>
                {rating >= 3 ? (
                    <SVGImage src={FilledFork} alt="filled-fork" />
                ) : (
                    <SVGImage src={EmptyFork} alt="empty-fork" />
                )}
            </CardPlaceWideForkContainer>
            <CardPlaceWideForkContainer>
                {rating >= 4 ? (
                    <SVGImage src={FilledFork} alt="filled-fork" />
                ) : (
                    <SVGImage src={EmptyFork} alt="empty-fork" />
                )}
            </CardPlaceWideForkContainer>
            <CardPlaceWideForkContainer>
                {rating >= 5 ? (
                    <SVGImage src={FilledFork} alt="filled-fork" />
                ) : (
                    <SVGImage src={EmptyFork} alt="empty-fork" />
                )}
            </CardPlaceWideForkContainer>
            <CardPlaceWideForkMessageText style={color ? { color: 'white' } : {}}>
                {`(${parseFloat(String(rating)).toFixed(1)} AVG)`}
            </CardPlaceWideForkMessageText>
        </CardPlaceWideForksContainer>
    )
}

export default CardRatings
