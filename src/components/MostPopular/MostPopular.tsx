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
    handleClickViewMore: () => void
}

const MostPopular: React.FC<IMostPopularProps> = ({ cityInformation, handleClickViewMore }) => {
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
                <ViewMoreButton onClick={handleClickViewMore}>{S.BUTTON_LABELS.ViewMore}</ViewMoreButton>
            </MostPopularContainer>
        )
    )
}

export default MostPopular
