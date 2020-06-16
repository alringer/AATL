import { SearchWorkBenchCategoriesContainer, SearchWorkBenchCategoriesText } from 'components/SearchCategories/SearchCategories.style'
import * as S from 'constants/StringConstants'
import React from 'react'

const categories = [
    'Food & Drink',
    'Afghan',
    'African',
    'American',
    'Arabian',
    'Barbeque',
    'Basque',
    'Breakfast & Brunch',
    'Buffets',
    'Burgers',
    'Cafes',
    'Caribbean',
    'Chinese',
    'Diners',
    'Fast Food',
    'Fish & Chips',
    'French',
    'Gastropubs',
    'German',
    'Gluten-Free',
    'Greek',
    'Guamanian',
    'Halal',
    'Indian',
    'Italian',
    'Japanese',
    'Korean',
    'Latin American',
    'Mediterranean',
    'Mexican',
    'Pizza',
    'See All Categories',
]

interface ISearchCategoriesProps {
    handleSearch: (place?: string, address?: string) => void
}

const SearchCategories: React.FC<ISearchCategoriesProps> = ({ handleSearch }) => {
    return (
        <SearchWorkBenchCategoriesContainer>
            <SearchWorkBenchCategoriesText id="bold">{S.SEARCH_PAGE.FoodAndDrink}</SearchWorkBenchCategoriesText>
            {categories.map((category: string, index: number) => {
                return (
                    <SearchWorkBenchCategoriesText onClick={() => handleSearch(category)} key={index}>
                        {category}
                    </SearchWorkBenchCategoriesText>
                )
            })}
        </SearchWorkBenchCategoriesContainer>
    )
}

export default SearchCategories
