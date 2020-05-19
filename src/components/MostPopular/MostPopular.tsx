import InfiniteCarousel from 'components/InfiniteCarousel/InfiniteCarousel'
import * as S from 'constants/StringConstants'
import React from 'react'
import { IInfiniteCarouselCard } from 'utilities/types/infiniteCarousel'
import {
    MostPopularContainer,
    MostPopularHeaderContainer,
    MostPopularHeaderSubTitleText,
    MostPopularHeaderTitleText,
    ViewMoreButton,
} from './MostPopular.style'

interface IMostPopularProps {
    places: IInfiniteCarouselCard[]
    cityName: string
}

const MostPopular: React.FC<IMostPopularProps> = ({ cityName, places }) => {
    return (
        <MostPopularContainer>
            <MostPopularHeaderContainer>
                <MostPopularHeaderTitleText>
                    {S.MOST_POPULAR.Title} {cityName}
                </MostPopularHeaderTitleText>
                <MostPopularHeaderSubTitleText>
                    {S.MOST_POPULAR.SubTitle} {cityName}
                </MostPopularHeaderSubTitleText>
            </MostPopularHeaderContainer>
            <InfiniteCarousel places={places} />
            <ViewMoreButton>{S.BUTTON_LABELS.ViewMore}</ViewMoreButton>
        </MostPopularContainer>
    )
}

export default MostPopular
