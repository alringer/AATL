import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { ICity } from 'utilities/types/city'
import {
    EmptyMessage,
    ListViewCountriesContainer,
    ListViewCountryContainer,
    ListViewCountryText,
    ListViewCountryTitleContainer,
    ListViewNewText,
    ListViewPageContainer,
    ListViewRegionColumnContainer,
    ListViewRegionContainer,
    ListViewRegionsContainer,
    ListViewRegionText,
    ListViewTitle,
} from './ListView.style'

interface ICitiesListViewProps {
    stateList: ICity[]
    provinceList: ICity[]
}

const CitiesListView: NextPage<ICitiesListViewProps> = ({ stateList, provinceList }) => {
    const renderList = (currentList: ICity[]) => {
        const itemsPerColumn = 20
        const numberOfColumns = Math.ceil(currentList.length / itemsPerColumn)
        let columns = []
        for (let i = 1; i <= numberOfColumns; i++) {
            const startIndex = i > 1 ? i * itemsPerColumn - (1 + itemsPerColumn) : 0
            const endIndex = startIndex + itemsPerColumn
            const slicedList = currentList.slice(startIndex, endIndex)
            columns = [
                ...columns,
                <ListViewRegionColumnContainer key={i}>
                    {slicedList.map((city: ICity) => {
                        return (
                            <ListViewRegionContainer key={city.cityID}>
                                <Link href={`${R.ROUTE_ITEMS.city}/${city.cityID}`}>
                                    <ListViewRegionText>{city.name}</ListViewRegionText>
                                </Link>
                            </ListViewRegionContainer>
                        )
                    })}
                </ListViewRegionColumnContainer>,
            ]
        }
        return <>{columns}</>
    }

    return (
        <ListViewPageContainer>
            <ListViewTitle>{S.CITIES.Title}</ListViewTitle>
            <ListViewCountriesContainer>
                <ListViewCountryContainer>
                    <ListViewCountryTitleContainer>
                        <ListViewCountryText>{S.CITIES.US}</ListViewCountryText>
                    </ListViewCountryTitleContainer>
                    <ListViewRegionsContainer>
                        {stateList && stateList.length > 0 ? (
                            renderList(stateList)
                        ) : (
                            <EmptyMessage>{S.CITIES.EmptyMessage}</EmptyMessage>
                        )}
                    </ListViewRegionsContainer>
                </ListViewCountryContainer>
                <ListViewCountryContainer>
                    <ListViewCountryTitleContainer>
                        <ListViewCountryText>{S.CITIES.Canada}</ListViewCountryText>
                        <ListViewNewText>{S.CITIES.New}</ListViewNewText>
                    </ListViewCountryTitleContainer>
                    <ListViewRegionsContainer>
                        {provinceList && provinceList.length > 0 ? (
                            renderList(provinceList)
                        ) : (
                            <EmptyMessage>{S.CITIES.EmptyMessage}</EmptyMessage>
                        )}
                    </ListViewRegionsContainer>
                </ListViewCountryContainer>
            </ListViewCountriesContainer>
        </ListViewPageContainer>
    )
}

export default CitiesListView
