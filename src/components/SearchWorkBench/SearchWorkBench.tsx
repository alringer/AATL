import { CircularProgress, FormControl, MenuItem, Select } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import CardPlaceWide, { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import CardPlaceYelp from 'components/CardPlaceYelp/CardPlaceYelp'
import SearchCategories from 'components/SearchCategories/SearchCategories'
import SearchCouldNotFind from 'components/SearchCouldNotFind/SearchCouldNotFind'
import SearchFull from 'components/SearchFull/SearchFull'
import { SearchModalLoadingIconContainer } from 'components/SearchModal/SearchModal.style'
import { IYelpRestaurant } from 'components/SearchModal/SearchRestaurant'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { query } from 'style/device'
import { ICategory } from 'utilities/types/category'
import { SortEnum, SortOption, sortOptions } from 'utilities/types/clientDTOS/SortType'
import { IVenue } from 'utilities/types/venue'
import {
    NoSearchResultsContainer,
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
    SearchWorkBenchYelpHeaderContainer,
    SearchWorkBenchYelpHeaderText,
    SearchWorkBenchYelpResultsContainer,
} from './SearchWorkBench.style'

type SearchLFB = (
    place?: string,
    categoryID?: string,
    address?: string,
    lat?: string,
    lng?: string,
    sort?: SortEnum,
    page?: string
) => void
type SearchYelp = (
    place?: string,
    address?: string,
    lat?: string,
    lng?: string,
    offset?: string,
    limit?: string
) => void

interface ISearchWorkBenchProps {
    inputPlace: string | null
    inputAddress: string | null
    inputLat: string | null
    inputLng: string | null
    // LFB Parameters
    searchResults: IVenue[]
    inputCategoryID: string | null
    inputSort: string | null
    inputPageCount: number
    inputPage: number | null
    inputTotal: number
    // Yelp Parameters
    searchYelpResults: IYelpRestaurant[]
    currentYelpPageCount: number | undefined
    currentYelpPage: number | undefined
    currentYelpTotal: number | undefined
    currentYelpOffset: number | undefined
    currentYelpLimit: number | undefined
    topCategories: ICategory[]
    isRobust: boolean
    isLFBLoading: boolean
    isYelpLoading: boolean
    handleLFBSearch: SearchLFB
    handleYelpSearch: SearchYelp
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
    currentYelpOffset,
    currentYelpPageCount,
    currentYelpPage,
    currentYelpTotal,
    currentYelpLimit,
    handleLFBSearch,
    handleYelpSearch,
    searchResults,
    searchYelpResults,
    topCategories,
    openSearchModal,
    inputPageCount,
    inputPage,
    inputTotal,
    isLFBLoading,
    isYelpLoading,
    isRobust,
}) => {
    const classes = useStyles()
    const [filter, setFilter] = React.useState<SortEnum>(SortEnum.BestRated)

    React.useEffect(() => {
        const newFilter = inputSort
            ? inputSort === SortEnum.BestRated
                ? SortEnum.BestRated
                : inputSort === SortEnum.MostRecommended
                ? SortEnum.MostRecommended
                : inputSort === SortEnum.RecentlyRecommended
                ? SortEnum.RecentlyRecommended
                : inputSort === SortEnum.Newest
                ? SortEnum.Newest
                : inputSort === SortEnum.Trending
                ? SortEnum.Trending
                : SortEnum.BestRated
            : SortEnum.BestRated
        setFilter(newFilter)
    }, [inputSort])

    const handleChangeFilter = (event: React.ChangeEvent<{ value: SortEnum }>) => {
        setFilter(event.target.value)
        handleLFBSearch(inputPlace, inputCategoryID, inputAddress, inputLat, inputLng, event.target.value)
    }

    const handleLFBPagination = (event: React.ChangeEvent<unknown>, value: number) => {
        handleLFBSearch(inputPlace, inputCategoryID, inputAddress, inputLat, inputLng, filter, String(value - 1))
    }

    const handleYelpPagination = (event: React.ChangeEvent<unknown>, value: number) => {
        handleYelpSearch(
            inputPlace,
            inputAddress,
            inputLat,
            inputLng,
            String((value - 1) * currentYelpLimit),
            String(currentYelpLimit)
        )
    }

    return (
        <SearchWorkBenchContainer>
            <SearchWorkBenchTitle>{`${inputPlace ? inputPlace : 'Places'} ${
                inputAddress ? `${S.SEARCH_PAGE.NearBy} ${inputAddress}` : ''
            }`}</SearchWorkBenchTitle>
            <SearchWorkBenchSubTitle>
                {!isLFBLoading && (
                    <>
                        {S.SEARCH_PAGE.WeHave} <b>{inputTotal}</b>{' '}
                        {inputPlace
                            ? searchResults.length > 1
                                ? S.SEARCH_PAGE.RecordsFor
                                : S.SEARCH_PAGE.RecordFor
                            : 'places'}{' '}
                        <b>{inputPlace ? inputPlace : null}</b>
                    </>
                )}
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
                            handleSearch={handleLFBSearch}
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
                    {isLFBLoading ? (
                        <NoSearchResultsContainer>
                            <SearchModalLoadingIconContainer>
                                <CircularProgress />
                            </SearchModalLoadingIconContainer>
                        </NoSearchResultsContainer>
                    ) : searchResults && searchResults.length > 0 && inputPageCount >= 1 ? (
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
                                    onChange={handleLFBPagination}
                                />
                            </PaginationContainer>
                        </>
                    ) : (
                        <NoSearchResultsContainer>
                            <Media queries={query}>
                                {(matches) => (
                                    <>
                                        <SearchCouldNotFind
                                            openSearchModal={openSearchModal}
                                            fullWidth={matches.mobile || matches.tablet ? false : true}
                                        />
                                    </>
                                )}
                            </Media>
                        </NoSearchResultsContainer>
                    )}
                    {isYelpLoading ? (
                        <NoSearchResultsContainer>
                            <SearchModalLoadingIconContainer>
                                <CircularProgress />
                            </SearchModalLoadingIconContainer>
                        </NoSearchResultsContainer>
                    ) : searchYelpResults && searchYelpResults.length > 0 && currentYelpPageCount >= 1 ? (
                        <>
                            <SearchWorkBenchYelpHeaderContainer>
                                <SearchWorkBenchYelpHeaderText>
                                    {S.RESTAURANT_SEARCH.YelpHeader}
                                </SearchWorkBenchYelpHeaderText>
                            </SearchWorkBenchYelpHeaderContainer>
                            <SearchWorkBenchYelpResultsContainer>
                                {searchYelpResults.map((searchYelpResult: IYelpRestaurant, index: number) => {
                                    return (
                                        <SearchWorkBenchPlaceCardContainer key={index}>
                                            <CardPlaceYelp place={searchYelpResult} type={CardPlaceWideEnum.Search} />
                                        </SearchWorkBenchPlaceCardContainer>
                                    )
                                })}
                                <PaginationContainer>
                                    <Pagination
                                        className={classes.root}
                                        count={currentYelpPageCount}
                                        page={currentYelpPage}
                                        variant="outlined"
                                        shape="rounded"
                                        onChange={handleYelpPagination}
                                    />
                                </PaginationContainer>
                            </SearchWorkBenchYelpResultsContainer>
                        </>
                    ) : null}
                </SearchWorkBenchLookupContainer>
                <SearchWorkBenchNavigationContainer>
                    <Media queries={query}>
                        {(matches) => (
                            <>
                                {matches.laptop && (
                                    <SearchCategories handleLFBSearch={handleLFBSearch} topCategories={topCategories} />
                                )}
                            </>
                        )}
                    </Media>
                    <Media queries={query}>
                        {(matches) => (
                            <>
                                {searchResults && searchResults.length > 0 && (
                                    <SearchCouldNotFind openSearchModal={openSearchModal} isSide={true} />
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
