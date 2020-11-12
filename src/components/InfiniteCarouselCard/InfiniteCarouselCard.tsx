import Image from 'components/Image/Image'
import {
    InfiniteCarouselCardBodyContainer,
    InfiniteCarouselCardCategoryText,
    InfiniteCarouselCardCheckItOutButton,
    InfiniteCarouselCardContainer,
    InfiniteCarouselCardContentContainer,
    InfiniteCarouselCardImageContainer,
    InfiniteCarouselCardPlaceName,
} from 'components/InfiniteCarouselCard/InfiniteCarouselCard.style'
import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import Link from 'next/link'
import React from 'react'
import { concatCategories } from 'utilities/helpers/concatStrings'
import { ICategory } from 'utilities/types/category'
import { IVenue } from 'utilities/types/venue'

interface IInfiniteCarouselCardProps {
    place: IVenue
}

const InfiniteCarouselCard: React.FC<IInfiniteCarouselCardProps> = ({ place }) => {
    return (
        <InfiniteCarouselCardContainer key={place.id}>
            <InfiniteCarouselCardImageContainer>
                <Image src={place.imageCDNUrl} alt="place-image" />
                <InfiniteCarouselCardPlaceName>{place.name}</InfiniteCarouselCardPlaceName>
            </InfiniteCarouselCardImageContainer>
            <InfiniteCarouselCardContentContainer>
                <InfiniteCarouselCardBodyContainer>
                    <InfiniteCarouselCardCategoryText>
                        {concatCategories(place.categories.map((category: ICategory) => category.longName))}
                    </InfiniteCarouselCardCategoryText>
                    <Link href={`${R.ROUTE_ITEMS.restaurant}/${place.id}`} passHref={true} prefetch={false}>
                        <InfiniteCarouselCardCheckItOutButton>
                            {S.BUTTON_LABELS.CheckItOut}
                        </InfiniteCarouselCardCheckItOutButton>
                    </Link>
                </InfiniteCarouselCardBodyContainer>
            </InfiniteCarouselCardContentContainer>
        </InfiniteCarouselCardContainer>
    )
}

export default InfiniteCarouselCard
