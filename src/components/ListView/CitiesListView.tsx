import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { IParentRegion } from 'utilities/types/parentRegion'
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
    stateList: IParentRegion[]
    provinceList: IParentRegion[]
}

const CitiesListView: NextPage<ICitiesListViewProps> = ({ stateList, provinceList }) => {
    const renderList = (currentList: IParentRegion[]) => {
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
                    {slicedList.map((city: IParentRegion) => {
                        return (
                            <ListViewRegionContainer key={city.id}>
                                <Link
                                    href={`${R.ROUTE_ITEMS.city}/${city.id}`}
                                    as={`${R.ROUTE_ITEMS.city}/${city.id}`}
                                    passHref={true}
                                    prefetch={false}
                                >
                                    <ListViewRegionText>
                                        {city.alternateName ? city.alternateName : city.city}
                                    </ListViewRegionText>
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
