import * as S from 'constants/StringConstants'
import React from 'react'
import CardPlaceSmallList from 'sections/CardsList/CardPlaceSmallList'
import { IVenue } from 'utilities/types/venue'

interface IMostRecommendedProps {
    venues: IVenue[]
}

const MostRecommended: React.FC<IMostRecommendedProps> = ({ venues }) => {
    return (
        <>
            {venues && venues.length > 0 ? (
                <CardPlaceSmallList
                    title={S.HOME_PAGE.MostRecommendedTitle}
                    subTitle={S.HOME_PAGE.MostRecommendedSubTitle}
                    places={venues ? venues : null}
                    category={
                        venues && venues[0] && venues[0].categories && venues[0].categories[0]
                            ? venues[0].categories[0]
                            : null
                    }
                />
            ) : null}
        </>
    )
}

export default MostRecommended
