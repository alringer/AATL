import { InputAdornment } from '@material-ui/core'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'
import CloseSVG from 'assets/close.svg'
import SearchSVG from 'assets/darkSearch.svg'
import Image from 'components/Image/Image'
import {
    CustomAutoComplete,
    SearchInput,
    SuggestionConstantOption,
    SuggestionOption,
} from 'components/SearchFull/SearchFull.style'
import * as S from 'constants/StringConstants'
import { useRouter } from 'next/router'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'
import { CustomIconButton } from 'style/Button/IconButton.style'
import { query } from 'style/device'
import { CustomTextField } from 'style/TextField/TextField.style'
import buildURLWithParams from 'utilities/helpers/buildURLWithParams'
import { ICategory } from 'utilities/types/category'
import { ParamType } from 'utilities/types/clientDTOS/ParamType'
import {
    HeaderSearchContainer,
    HeaderSearchTabletContainer,
    PlaceholderContainer,
    PlaceholderTextBold,
    PlaceholderTextNormal,
    SearchButton,
} from './Search.style'

interface IReduxProps {
    categories: ICategory[]
}

interface IHeaderSearchProps extends IReduxProps {
    searchRef: any
    searchSecondaryRef: any
    handleCloseSearch: () => void
}

const HeaderSearch: React.FC<IHeaderSearchProps> = ({
    searchRef,
    searchSecondaryRef,
    categories,
    handleCloseSearch,
}) => {
    const router = useRouter()
    const [place, setPlace] = React.useState<string>('')
    const [categoryID, setCategoryID] = React.useState('')
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
    })

    React.useEffect(() => {
        console.log('Place: ', place)
    }, [place])

    const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e && e.target) {
            if (e.target.value) {
                setPlace(String(e.target.value))
                setCategoryID(null)
            } else if (e.target.value === '') {
                setPlace('')
                setCategoryID(null)
            }
            e.stopPropagation()
        }
    }

    const handleSearch = (keyword: string) => {
        const paramsArray: ParamType[] = [
            { label: 'place', value: keyword ? encodeURIComponent(keyword) : keyword },
            { label: 'categoryID', value: categoryID },
        ]
        const paramsURL = buildURLWithParams(paramsArray)
        let url = `/search` + `${paramsURL ? '?' + paramsURL : ''}`
        router.push(url)
    }

    const handleTextFieldKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'Enter':
                handleSearch(place)
                break
            case 'Escape':
                handleCloseSearch()
                break
        }
    }

    const HeaderSearchTablet = () => (
        <HeaderSearchTabletContainer ref={searchRef}>
            <CustomAutoComplete
                freeSolo
                openOnFocus
                blurOnSelect={true}
                inputValue={place}
                onInputChange={handlePlaceChange}
                ListboxComponent={(props) => {
                    return <ul {...props} ref={searchSecondaryRef}></ul>
                }}
                options={
                    place === ''
                        ? []
                        : categories && place
                        ? [
                              `${place}`,
                              ...categories.map((category) => {
                                  return {
                                      ...category,
                                      tag: 'CATEGORIES',
                                  }
                              }),
                          ]
                        : !categories && place
                        ? [`${place}`]
                        : categories && !place
                        ? [
                              ...categories.map((category) => {
                                  return {
                                      ...category,
                                      tag: 'CATEGORIES',
                                  }
                              }),
                          ]
                        : []
                }
                filterOptions={filterOptions}
                getOptionLabel={(option: any) => (typeof option === 'string' ? option : option.longName)}
                style={{ width: '100%' }}
                onChange={(event, value) => {
                    if (value.longName) {
                        setPlace(value.longName)
                        setCategoryID(value.id)
                    } else {
                        setPlace(value)
                        setCategoryID(null)
                    }
                }}
                disableClearable
                renderOption={(option: any, state) => {
                    console.log('Option Rendered')
                    if (option.longName) {
                        return <SuggestionOption id="suggestion">{option.longName}</SuggestionOption>
                    } else {
                        return (
                            <SuggestionConstantOption id="suggestion">
                                Search restaurants with "{option}"
                            </SuggestionConstantOption>
                        )
                    }
                }}
                renderInput={(params) => (
                    <CustomTextField
                        {...params}
                        style={{ width: '100%', height: 'inherit' }}
                        variant="outlined"
                        autoFocus={true}
                        placeholder={`${S.INPUT_PLACEHOLDERS.VenueSearchBold} ${S.INPUT_PLACEHOLDERS.VenueSearchNormal}`}
                        onKeyDown={handleTextFieldKeyDown}
                        InputLabelProps={{
                            shrink: false,
                        }}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <div style={{ width: '30px', height: '30px' }}>
                                        <Image src={SearchSVG} alt="logo" />
                                    </div>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <CustomIconButton onClick={handleCloseSearch}>
                                        <Image src={CloseSVG} alt="close-icon" />
                                    </CustomIconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />
        </HeaderSearchTabletContainer>
    )

    const HeaderSearchDesktop = () => (
        <div ref={searchRef} style={{ display: 'flex' }}>
            <HeaderSearchContainer>
                <CustomAutoComplete
                    freeSolo
                    openOnFocus
                    blurOnSelect={true}
                    inputValue={place}
                    onInputChange={handlePlaceChange}
                    ListboxComponent={(props) => {
                        return <ul {...props} ref={searchSecondaryRef}></ul>
                    }}
                    options={
                        place === ''
                            ? []
                            : categories && place
                            ? [
                                  `${place}`,
                                  ...categories.map((category) => {
                                      return {
                                          ...category,
                                          tag: 'CATEGORIES',
                                      }
                                  }),
                              ]
                            : !categories && place
                            ? [`${place}`]
                            : categories && !place
                            ? [
                                  ...categories.map((category) => {
                                      return {
                                          ...category,
                                          tag: 'CATEGORIES',
                                      }
                                  }),
                              ]
                            : []
                    }
                    filterOptions={filterOptions}
                    getOptionLabel={(option: any) => (typeof option === 'string' ? option : option.longName)}
                    onChange={(event, value) => {
                        if (value.longName) {
                            setPlace(value.longName)
                            setCategoryID(value.id)
                        } else {
                            setPlace(value)
                            setCategoryID(null)
                        }
                    }}
                    disableClearable
                    renderOption={(option: any, state) => {
                        if (option.longName) {
                            return <SuggestionOption id="suggestion">{option.longName}</SuggestionOption>
                        } else {
                            return (
                                <SuggestionConstantOption id="suggestion">
                                    Search restaurants with "{option}"
                                </SuggestionConstantOption>
                            )
                        }
                    }}
                    renderInput={(params) => (
                        <SearchInput
                            {...params}
                            autoFocus
                            label={
                                place === '' ? (
                                    <PlaceholderContainer>
                                        <PlaceholderTextBold>
                                            {S.INPUT_PLACEHOLDERS.VenueSearchBold}
                                        </PlaceholderTextBold>{' '}
                                        &nbsp;
                                        <PlaceholderTextNormal>
                                            {S.INPUT_PLACEHOLDERS.VenueSearchNormal}
                                        </PlaceholderTextNormal>
                                    </PlaceholderContainer>
                                ) : null
                            }
                            InputLabelProps={{ shrink: false }}
                            variant="outlined"
                            onKeyDown={handleTextFieldKeyDown}
                        />
                    )}
                />
            </HeaderSearchContainer>
            <SearchButton onClick={() => handleSearch(place)}>{S.BUTTON_LABELS.Search}</SearchButton>
        </div>
    )

    return (
        <>
            <Media queries={query}>
                {(matches) => (
                    <>
                        {(matches.mobile || matches.tablet) && <HeaderSearchTablet />}
                        {matches.laptop && <HeaderSearchDesktop />}
                    </>
                )}
            </Media>
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    categories: state.categoriesReducer.categories,
})

export default reduxConnect(mapStateToProps)(HeaderSearch)
