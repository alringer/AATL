import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { size } from 'style/device'
import useWindowSize from 'utilities/hooks/useWindowSize'
import { ICategory } from 'utilities/types/category'
import {
    EmptyMessage,
    ListViewCountriesContainer,
    ListViewCountryContainer,
    ListViewCountryText,
    ListViewCountryTitleContainer,
    ListViewPageContainer,
    ListViewRegionColumnContainer,
    ListViewRegionContainer,
    ListViewRegionsContainer,
    ListViewRegionText,
    ListViewTitle,
} from './ListView.style'

interface ICategoriesListViewProps {
    categoryList: ICategory[]
}

const CategoriesListView: NextPage<ICategoriesListViewProps> = ({ categoryList }) => {
    const windowSize = useWindowSize()
    const renderList = (currentList: ICategory[]) => {
        const numberOfColumns =
            windowSize.width > Number(size.laptop) ? 6 : windowSize.width > Number(size.tablet) ? 4 : 2
        const itemsPerColumn = Math.ceil(currentList.length / numberOfColumns)

        let columns = []
        for (let i = 1; i <= numberOfColumns; i++) {
            const startIndex = i > 1 ? i * itemsPerColumn - (1 + itemsPerColumn) : 0
            const endIndex = startIndex + itemsPerColumn
            const slicedList = currentList.slice(startIndex, endIndex)
            columns = [
                ...columns,
                <ListViewRegionColumnContainer key={i}>
                    {slicedList.map((category: ICategory) => {
                        return (
                            <ListViewRegionContainer key={category.id}>
                                {/* TODO: Send the user to the search page with the proper query parameters in the url */}
                                <Link
                                    href={`${R.ROUTE_ITEMS.search}?place=${category.longName}`}
                                    passHref={true}
                                    prefetch={false}
                                >
                                    <ListViewRegionText>{category.longName}</ListViewRegionText>
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
            <ListViewTitle>{S.FOOD_AND_DRINK.Title}</ListViewTitle>
            <ListViewCountriesContainer>
                <ListViewCountryContainer>
                    <ListViewCountryTitleContainer>
                        <ListViewCountryText>{S.FOOD_AND_DRINK.Categories}</ListViewCountryText>
                    </ListViewCountryTitleContainer>
                    <ListViewRegionsContainer>
                        {categoryList && categoryList.length > 0 ? (
                            renderList(categoryList)
                        ) : (
                            <EmptyMessage>{S.FOOD_AND_DRINK.EmptyMessage}</EmptyMessage>
                        )}
                    </ListViewRegionsContainer>
                </ListViewCountryContainer>
            </ListViewCountriesContainer>
        </ListViewPageContainer>
    )
}

export default CategoriesListView
