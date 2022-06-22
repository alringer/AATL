import { Tooltip } from '@material-ui/core'
import Grow from '@material-ui/core/Grow'
import AddedSVG from 'assets/added.svg'
import AuthoredSVG from 'assets/authored.svg'
import CardRatings from 'components/CardRatings/CardRatings'
import Image from 'components/Image/Image'
import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import Link from 'next/link'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'
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

interface IReduxProps {
    venuesInList: number[]
    venuesRecommended: number[]
}

interface ICardPlaceSmallProps extends IReduxProps {
    place: IVenue
}

const CardPlaceSmall: React.FC<ICardPlaceSmallProps> = ({ place, venuesInList, venuesRecommended }) => {
    return place ? (
        <Grow in={true}>
            <Link href={`${R.ROUTE_ITEMS.restaurant}/${place.id}`} prefetch={false} passHref={true}>
                <SmallPlaceCardAnchor>
                    <SmallPlaceCardContainer>
                        <SmallPlaceCardImageContainer>
                            <Image src={place.imageCDNUrl} alt="place-image" />
                        </SmallPlaceCardImageContainer>
                        <SmallPlaceCardContentContainer>
                            <SmallPlaceCardPlaceName>{place ? place.name : null}</SmallPlaceCardPlaceName>
                            <WideHeaderTooltipIconsContainer>
                                {place?.id && venuesRecommended && venuesRecommended.includes(Number(place.id)) && (
                                    <Tooltip title={S.TOOL_TIPS.Recommended} placement="top">
                                        <img src={AuthoredSVG} />
                                    </Tooltip>
                                )}
                                {place?.id && venuesInList && venuesInList.includes(Number(place.id)) && (
                                    <Tooltip title={S.TOOL_TIPS.Added} placement="top">
                                        <img src={AddedSVG} alt="added-icon" />
                                    </Tooltip>
                                )}
                            </WideHeaderTooltipIconsContainer>
                            <CardRatings rating={place.averageRating} uniqueID={place.id} />
                            {place?.categories && (
                                <SmallPlaceCardCategory>
                                    {concatCategories(place.categories.map((category: ICategory) => category.longName))}
                                </SmallPlaceCardCategory>
                            )}
                            <SmallPlaceCardDescriptionContainer>
                                <SmallPlaceCardDescription>
                                    {place?.latestRecommendation?.content
                                        ? `"${chopStringSmallPlaceDescription(place.latestRecommendation.content)}"`
                                        : null}
                                </SmallPlaceCardDescription>
                            </SmallPlaceCardDescriptionContainer>
                        </SmallPlaceCardContentContainer>
                    </SmallPlaceCardContainer>
                </SmallPlaceCardAnchor>
            </Link>
        </Grow>
    ) : null
}

const mapStateToProps = (state: StoreState) => ({
    venuesInList: state.userReducer.venuesListsVenueIDs,
    venuesRecommended: state.userReducer.venuesRecommendedVenueIDs,
})

export default reduxConnect(mapStateToProps)(CardPlaceSmall)
