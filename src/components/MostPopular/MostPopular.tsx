import InfiniteCarousel from 'components/InfiniteCarousel/InfiniteCarousel'
import * as S from 'constants/StringConstants'
import React from 'react'
import { IParentRegion } from 'utilities/types/parentRegion'
import {
    MostPopularContainer,
    MostPopularHeaderContainer,
    MostPopularHeaderSubTitleText,
    MostPopularHeaderTitleText,
    ViewMoreButton,
} from './MostPopular.style'

interface IMostPopularProps {
    cityInformation: IParentRegion | null
}

const MostPopular: React.FC<IMostPopularProps> = ({ cityInformation }) => {
    return (
        cityInformation?.mostPopularVenues?.length > 0 && (
            <MostPopularContainer>
                <MostPopularHeaderContainer>
                    <MostPopularHeaderTitleText>
                        {S.MOST_POPULAR.Title} {cityInformation?.city}
                    </MostPopularHeaderTitleText>
                    <MostPopularHeaderSubTitleText>
                        {S.MOST_POPULAR.SubTitle} {cityInformation?.city}
                    </MostPopularHeaderSubTitleText>
                </MostPopularHeaderContainer>
                <InfiniteCarousel places={cityInformation?.mostPopularVenues} />
                {/* TODO: View more button should scroll down to Local Places with Trending Places selected as the filter */}
                <ViewMoreButton>{S.BUTTON_LABELS.ViewMore}</ViewMoreButton>
            </MostPopularContainer>
        )
    )
}

export default MostPopular
