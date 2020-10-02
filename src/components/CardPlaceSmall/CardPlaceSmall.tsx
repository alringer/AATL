import { Tooltip } from '@material-ui/core'
import AddedSVG from 'assets/added.svg'
import AuthoredSVG from 'assets/authored.svg'
import Image from 'components/Image/Image'
import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { WideHeaderTooltipIconsContainer } from 'style/Card/Card.style'
import { chopStringSmallPlaceDescription } from 'utilities/helpers/chopString'
import { concatCategories } from 'utilities/helpers/concatStrings'
import { ICategory } from 'utilities/types/category'
import { IVenue } from 'utilities/types/venue'
import {
    SmallPlaceCardAnchor,
    SmallPlaceCardCategory,
    SmallPlaceCardContainer,
    SmallPlaceCardContentContainer,
    SmallPlaceCardDescription,
    SmallPlaceCardDescriptionContainer,
    SmallPlaceCardImageContainer,
    SmallPlaceCardPlaceName,
} from './CardPlaceSmall.style'
interface ICardPlaceSmallProps {
    place: IVenue
}

const CardPlaceSmall: React.FC<ICardPlaceSmallProps> = ({ place }) => {
    const router = useRouter()
    const handleView = () => {
        router.push(
            `${R.ROUTE_ITEMS.restaurant}/${place.id}`,
            // `${R.ROUTE_ITEMS.admin}/${R.ROUTE_ITEMS.adminCities}`,
            undefined
        )
    }
    const handleLike = (e: React.MouseEvent<HTMLElement>) => {
        // TODO: Call API to like the place
        e.stopPropagation()
        console.log('Place heart clicked. place ID: ', place.id)
    }

    const handleMore = (e: React.MouseEvent<HTMLElement>) => {
        // TODO: Display more options
        e.stopPropagation()
        console.log('Place ellipses clicked. place ID: ', place.id)
    }

    React.useEffect(() => {
        console.log('Place in small card: ', place)
    }, [place])

    return place ? (
        <Link href={`${R.ROUTE_ITEMS.restaurant}/${place.id}`} prefetch={false} passHref={true}>
            <SmallPlaceCardAnchor>
                <SmallPlaceCardContainer>
                    <SmallPlaceCardImageContainer>
                        <Image src={place.imageCDNUrl} alt="place-image" />
                        {/* <ImageButtonsContainer>
                    <CardIcon onClick={handleMore}>
                        <Image src={GrayEllipsesSVG} alt="ellipses-icon" />
                    </CardIcon>
                    <CardIcon onClick={handleLike}>
                        <Image src={GrayHeartSVG} alt="heart-icon" />
                    </CardIcon>
                </ImageButtonsContainer> */}
                    </SmallPlaceCardImageContainer>
                    <SmallPlaceCardContentContainer>
                        <SmallPlaceCardPlaceName>{place ? place.name : null}</SmallPlaceCardPlaceName>
                        <WideHeaderTooltipIconsContainer>
                            <Tooltip title={S.TOOL_TIPS.Recommended} placement="top">
                                <img src={AuthoredSVG} />
                            </Tooltip>
                            <Tooltip title={S.TOOL_TIPS.Added} placement="top">
                                <img src={AddedSVG} alt="added-icon" />
                            </Tooltip>
                        </WideHeaderTooltipIconsContainer>
                        {place && place.categories && (
                            <SmallPlaceCardCategory>
                                {concatCategories(place.categories.map((category: ICategory) => category.longName))}
                            </SmallPlaceCardCategory>
                        )}
                        <SmallPlaceCardDescriptionContainer>
                            <SmallPlaceCardDescription>
                                {place && place.latestRecommendation && place.latestRecommendation.content
                                    ? `"${chopStringSmallPlaceDescription(place.latestRecommendation.content)}"`
                                    : null}
                            </SmallPlaceCardDescription>
                        </SmallPlaceCardDescriptionContainer>
                    </SmallPlaceCardContentContainer>
                </SmallPlaceCardContainer>
            </SmallPlaceCardAnchor>
        </Link>
    ) : null
}

export default CardPlaceSmall
