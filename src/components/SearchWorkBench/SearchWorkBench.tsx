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
import { ICategory } from 'utilities/types/category'
import { SortEnum, SortOption, sortOptions } from 'utilities/types/clientDTOS/SortType'
import { IVenue } from 'utilities/types/venue'
import {
    NoSearchResultsContainer,
    NoSearchResultsSubTitle,
    NoSearchResultsTitle,
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
    inputPlace: string | null
    inputCategoryID: string | null
    inputAddress: string | null
    inputLat: string | null
    inputLng: string | null
    inputSort: string | null
    inputPageCount: number
    inputPage: number | null
    inputTotal: number
    searchResults: IVenue[]
    topCategories: ICategory[]
    handleSearch: (
        place?: string,
        categoryID?: string,
        address?: string,
        lat?: string,
        lng?: string,
        sort?: SortEnum,
        page?: string
    ) => void
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
        },
        root: {
            marginTop: '30px',
        },
    })
)

const SearchWorkBench: React.FC<ISearchWorkBenchProps> = ({
    inputPlace,
    inputCategoryID,
    inputAddress,
    inputLat,
    inputLng,
    inputSort,
    handleSearch,
    searchResults,
    topCategories,
    openSearchModal,
    inputPageCount,
    inputPage,
    inputTotal,
}) => {
    const classes = useStyles()
    const [filter, setFilter] = React.useState<SortEnum>(SortEnum.MostRecommended)

    React.useEffect(() => {
        const newFilter = inputSort
            ? inputSort === SortEnum.MostRecommended
                ? SortEnum.MostRecommended
                : inputSort === SortEnum.RecentlyRecommended
                ? SortEnum.RecentlyRecommended
                : inputSort === SortEnum.Newest
                ? SortEnum.Newest
                : inputSort === SortEnum.Trending
                ? SortEnum.Trending
                : SortEnum.MostRecommended
            : SortEnum.MostRecommended
        setFilter(newFilter)
    }, [inputSort])

    const handleChangeFilter = (event: React.ChangeEvent<{ value: SortEnum }>) => {
        setFilter(event.target.value)
        handleSearch(inputPlace, inputCategoryID, inputAddress, inputLat, inputLng, event.target.value)
    }

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        handleSearch(inputPlace, inputCategoryID, inputAddress, inputLat, inputLng, filter, String(value - 1))
    }

    return (
        <SearchWorkBenchContainer>
            <SearchWorkBenchTitle>{`${inputPlace ? inputPlace : 'Places'} ${
                inputAddress ? `${S.SEARCH_PAGE.NearBy} ${inputAddress}` : ''
            }`}</SearchWorkBenchTitle>
            <SearchWorkBenchSubTitle>
                {S.SEARCH_PAGE.WeHave} <b>{inputTotal}</b>{' '}
                {inputPlace
                    ? searchResults.length > 1
                        ? S.SEARCH_PAGE.RecordsFor
                        : S.SEARCH_PAGE.RecordFor
                    : 'places'}{' '}
                <b>{inputPlace ? inputPlace : null}</b>
            </SearchWorkBenchSubTitle>
            <SearchWorkBenchContentContainer>
                <SearchWorkBenchLookupContainer>
                    <SearchWorkBenchInputsContainer>
                        <SearchFull
                            inputPlace={inputPlace}
                            inputCategoryID={inputCategoryID}
                            inputAddress={inputAddress}
                            inputLat={inputLat}
                            inputLng={inputLng}
                            handleSearch={handleSearch}
                        />
                    </SearchWorkBenchInputsContainer>

                    {searchResults && searchResults.length > 0 && (
                        <SearchWorkBenchPaginationFilterContainer id={searchResults.length > 0 ? 'active' : 'inactive'}>
                            <SearchWorkBenchPaginationFilterText>SORT BY </SearchWorkBenchPaginationFilterText>
                            <FormControl className={classes.formControl}>
                                <Select
                                    className={classes.select}
                                    value={filter}
                                    onChange={handleChangeFilter}
                                    disabled={!(searchResults.length > 0)}
                                    disableUnderline
                                >
                                    {sortOptions.map((option: SortOption) => {
                                        return (
                                            <MenuItem value={option.value} key={option.label}>
                                                {option.label}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </SearchWorkBenchPaginationFilterContainer>
                    )}
                    {searchResults && searchResults.length > 0 && inputPageCount >= 1 ? (
                        <>
                            {searchResults.map((searchResult: IVenue, index: number) => {
                                return (
                                    <SearchWorkBenchPlaceCardContainer key={index}>
                                        <CardPlaceWide place={searchResult} type={CardPlaceWideEnum.Search} />
                                    </SearchWorkBenchPlaceCardContainer>
                                )
                            })}
                            <PaginationContainer>
                                <Pagination
                                    className={classes.root}
                                    count={inputPageCount}
                                    page={inputPage}
                                    variant="outlined"
                                    shape="rounded"
                                    onChange={handlePagination}
                                />
                            </PaginationContainer>
                        </>
                    ) : (
                        <NoSearchResultsContainer>
                            <NoSearchResultsTitle>{S.SEARCH_PAGE.NoResultsTitle}</NoSearchResultsTitle>
                            <NoSearchResultsSubTitle>{S.SEARCH_PAGE.NoResultsSubTitle}</NoSearchResultsSubTitle>
                            <Media queries={query}>
                                {(matches) => (
                                    <>
                                        {matches.laptop && (
                                            <SearchCouldNotFind openSearchModal={openSearchModal} fullWidth={true} />
                                        )}
                                        {(matches.mobile || matches.tablet) && (
                                            <SearchCouldNotFind openSearchModal={openSearchModal} fullWidth={false} />
                                        )}
                                    </>
                                )}
                            </Media>
                        </NoSearchResultsContainer>
                    )}
                </SearchWorkBenchLookupContainer>
                <SearchWorkBenchNavigationContainer>
                    <Media queries={query}>
                        {(matches) => (
                            <>
                                {matches.laptop && (
                                    <SearchCategories handleSearch={handleSearch} topCategories={topCategories} />
                                )}
                            </>
                        )}
                    </Media>
                    <Media queries={query}>
                        {(matches) => (
                            <>
                                {searchResults && searchResults.length > 0 && (
                                    <SearchCouldNotFind openSearchModal={openSearchModal} />
                                )}
                            </>
                        )}
                    </Media>
                </SearchWorkBenchNavigationContainer>
            </SearchWorkBenchContentContainer>
        </SearchWorkBenchContainer>
    )
}

export default SearchWorkBench
