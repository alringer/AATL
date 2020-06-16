import { FormControl, MenuItem, Select } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import CardPlaceWide, { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import SearchCategories from 'components/SearchCategories/SearchCategories'
import SearchCouldNotFind from 'components/SearchCouldNotFind/SearchCouldNotFind'
import SearchFull from 'components/SearchFull/SearchFull'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { query } from 'style/device'
import { IPlace } from 'utilities/types/place'
import {
    PaginationContainer,
    SearchWorkBenchContainer,
    SearchWorkBenchContentContainer,
    SearchWorkBenchInputsContainer,
    SearchWorkBenchLookupContainer,
    SearchWorkBenchNavigationContainer,
    SearchWorkBenchPaginationFilterContainer,
    SearchWorkBenchPaginationFilterText,
    SearchWorkBenchPlaceCardContainer,
    SearchWorkBenchSubTitle,
    SearchWorkBenchTitle,
} from './SearchWorkBench.style'

interface ISearchWorkBenchProps {
    inputPlace: string
    inputAddress: string
    searchResults: IPlace[]
    handleSearch: (place?: string, address?: string) => void
    openSearchModal: () => void
}

const useStyles = makeStyles(() =>
    createStyles({
        formControl: {
            minWidth: 120,
        },
        selectEmpty: {},
        select: {
            fontFamily: 'Rubik',
            fontSize: '12px',
            fontWeight: 500,
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: '1.67',
            letterSpacing: '2px',
            // color: var(--charcoal-grey),
        },
        root: {
            marginTop: '30px',
        },
    })
)

const options = ['MOST RECOMMENDED', 'RECENTLY RECOMMENDED', 'TRENDING', 'NEWEST']
enum SearchResultsFilterEnum {
    MostRecommended = 'MOST RECOMMENDED',
    RecentlyRecommended = 'RECENTLY RECOMMENDED',
    Trending = 'TRENDING',
    Newest = 'NEWEST',
}

const SearchWorkBench: React.FC<ISearchWorkBenchProps> = ({
    inputPlace,
    inputAddress,
    handleSearch,
    searchResults,
    openSearchModal,
}) => {
    const classes = useStyles()
    const [filter, setFilter] = React.useState<SearchResultsFilterEnum>(SearchResultsFilterEnum.MostRecommended)

    const handleChangeFilter = (event: React.ChangeEvent<{ value: SearchResultsFilterEnum }>) => {
        setFilter(event.target.value)
    }

    return (
        <SearchWorkBenchContainer>
            <SearchWorkBenchTitle>{inputPlace}</SearchWorkBenchTitle>
            <SearchWorkBenchSubTitle>{`${S.SEARCH_PAGE.WeHave} ${searchResults.length} ${S.SEARCH_PAGE.RecordsFor} ${inputPlace}`}</SearchWorkBenchSubTitle>
            <SearchWorkBenchContentContainer>
                <SearchWorkBenchLookupContainer>
                    <SearchWorkBenchInputsContainer>
                        <SearchFull inputPlace={inputPlace} inputAddress={inputAddress} handleSearch={handleSearch} />
                    </SearchWorkBenchInputsContainer>
                    <SearchWorkBenchPaginationFilterContainer>
                        <SearchWorkBenchPaginationFilterText>SORT BY </SearchWorkBenchPaginationFilterText>
                        <FormControl className={classes.formControl}>
                            <Select
                                className={classes.select}
                                value={filter}
                                onChange={handleChangeFilter}
                                disableUnderline
                            >
                                {options.map((option: string) => {
                                    return <MenuItem value={option}>{option}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </SearchWorkBenchPaginationFilterContainer>
                    {searchResults.map((searchResult: IPlace, index: number) => {
                        return (
                            <SearchWorkBenchPlaceCardContainer key={index}>
                                <CardPlaceWide {...searchResult} type={CardPlaceWideEnum.Search} />
                            </SearchWorkBenchPlaceCardContainer>
                        )
                    })}
                    <PaginationContainer>
                        <Pagination className={classes.root} count={1} variant="outlined" shape="rounded" />
                    </PaginationContainer>
                </SearchWorkBenchLookupContainer>
                <SearchWorkBenchNavigationContainer>
                    <Media queries={query}>
                        {(matches) => <>{matches.laptop && <SearchCategories handleSearch={handleSearch} />}</>}
                    </Media>
                    <SearchCouldNotFind openSearchModal={openSearchModal} />
                </SearchWorkBenchNavigationContainer>
            </SearchWorkBenchContentContainer>
        </SearchWorkBenchContainer>
    )
}

export default SearchWorkBench
