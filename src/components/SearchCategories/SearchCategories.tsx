import {
    SearchWorkBenchCategoriesContainer,
    SearchWorkBenchCategoriesText,
} from 'components/SearchCategories/SearchCategories.style'
import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import Link from 'next/link'
import React from 'react'
import { ICategory } from 'utilities/types/category'
import { SortEnum } from 'utilities/types/clientDTOS/SortType'

interface ISearchCategoriesProps {
    handleLFBSearch: (
        place?: string,
        categoryID?: string,
        address?: string,
        lat?: string,
        lng?: string,
        sort?: SortEnum
    ) => void
    topCategories: ICategory[]
}

const SearchCategories: React.FC<ISearchCategoriesProps> = ({ handleLFBSearch, topCategories }) => {
    return (
        <SearchWorkBenchCategoriesContainer>
            <Link href={R.ROUTE_ITEMS.foodAndDrink} passHref={true} prefetch={false}>
                <SearchWorkBenchCategoriesText id="bold">{S.SEARCH_PAGE.FoodAndDrink}</SearchWorkBenchCategoriesText>
            </Link>
            {topCategories.map((category: ICategory, index: number) => {
                return (
                    <SearchWorkBenchCategoriesText
                        onClick={() => handleLFBSearch(category.longName, String(category.id))}
                        key={index}
                    >
                        {category.longName}
                    </SearchWorkBenchCategoriesText>
                )
            })}
            <Link href={R.ROUTE_ITEMS.foodAndDrink} passHref={true} prefetch={false}>
                <SearchWorkBenchCategoriesText>{S.SEARCH_PAGE.SeeAllCategories}</SearchWorkBenchCategoriesText>
            </Link>
        </SearchWorkBenchCategoriesContainer>
    )
}

export default SearchCategories
