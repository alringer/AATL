import * as S from 'constants/StringConstants'
import React from 'react'
import {
    LocalPlacesContainer,
    LocalPlacesHeaderContainer,
    LocalPlacesHeaderSubTitleText,
    LocalPlacesHeaderTitleText,
} from './LocalPlaces.style'

interface ILocalPlacesProps {
    cityName: string
}

const LocalPlaces: React.FC<ILocalPlacesProps> = ({ cityName }) => {
    return (
        <LocalPlacesContainer>
            <LocalPlacesHeaderContainer>
                <LocalPlacesHeaderTitleText>{S.LOCAL_PLACES.Title}</LocalPlacesHeaderTitleText>
                <LocalPlacesHeaderSubTitleText>
                    {S.LOCAL_PLACES.SubTitle} {cityName}
                </LocalPlacesHeaderSubTitleText>
            </LocalPlacesHeaderContainer>
        </LocalPlacesContainer>
    )
}

export default LocalPlaces
