import { InputAdornment } from '@material-ui/core'
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
import { filterCategories } from 'utilities/helpers/filterCategories'
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
    handleCloseSearch: () => void
}

const HeaderSearch: React.FC<IHeaderSearchProps> = ({ categories, handleCloseSearch }) => {
    const router = useRouter()
    const [place, setPlace] = React.useState<string>('')
    const [categoryID, setCategoryID] = React.useState('')
    const [currentCategories, setCurrentCategories] = React.useState([])

    React.useEffect(() => {
        setCurrentCategories(filterCategories(place, categories))
    }, [place, categories])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleSearch = (keyword: string, inputCategoryID: string) => {
        const paramsArray: ParamType[] = [
            { label: 'place', value: keyword ? encodeURIComponent(keyword) : keyword },
            { label: 'categoryID', value: inputCategoryID },
        ]
        const paramsURL = buildURLWithParams(paramsArray)
        let url = `/search` + `${paramsURL ? '?' + paramsURL : ''}`
        router.push(url)
    }

    const handleTextFieldKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'Enter':
                handleSearch(place, categoryID)
                break
            case 'Escape':
                handleCloseSearch()
                break
        }
    }

    const handleBlur = () => {
        handleCloseSearch()
    }

    const HeaderSearchTablet = () => (
        <HeaderSearchTabletContainer onBlur={handleBlur}>
            <CustomAutoComplete
                freeSolo
                openOnFocus
                inputValue={place}
                options={currentCategories}
                getOptionLabel={(option: any) => (typeof option === 'string' ? option : option.longName)}
                groupBy={(option: any) => option.tag}
                onChange={(event, value) => {
                    if (value.longName) {
                        setPlace(value.longName)
                        setCategoryID(value.id)
                        handleSearch(value.longName, value.id)
                    } else {
                        setPlace(value)
                        setCategoryID(null)
                        handleSearch(value, '')
                    }
                }}
                onInputChange={handleInputChange}
                blurOnSelect
                style={{ width: '100%' }}
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
                    <CustomTextField
                        {...params}
                        style={{ width: '100%', height: 'inherit' }}
                        variant="outlined"
                        autoFocus={true}
                        placeholder={`${S.INPUT_PLACEHOLDERS.VenueSearchBold} ${S.INPUT_PLACEHOLDERS.VenueSearchNormal}`}
                        InputLabelProps={{
                            ...params.InputLabelProps,
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
                        onKeyDown={handleTextFieldKeyDown}
                    />
                )}
            />
        </HeaderSearchTabletContainer>
    )

    const HeaderSearchDesktop = () => (
        <div style={{ display: 'flex' }} onBlur={handleBlur}>
            <HeaderSearchContainer>
                <CustomAutoComplete
                    freeSolo
                    openOnFocus
                    inputValue={place}
                    options={currentCategories}
                    getOptionLabel={(option: any) => (typeof option === 'string' ? option : option.longName)}
                    groupBy={(option: any) => option.tag}
                    onChange={(event, value) => {
                        if (value.longName) {
                            setPlace(value.longName)
                            setCategoryID(value.id)
                            handleSearch(value.longName, value.id)
                        } else {
                            setPlace(value)
                            setCategoryID(null)
                            handleSearch(value, '')
                        }
                    }}
                    onInputChange={handleInputChange}
                    blurOnSelect
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
                            InputLabelProps={{ ...params.InputLabelProps, shrink: false }}
                            variant="outlined"
                            onKeyDown={handleTextFieldKeyDown}
                        />
                    )}
                />
            </HeaderSearchContainer>
            <SearchButton onMouseDown={() => handleSearch(place, categoryID)}>{S.BUTTON_LABELS.Search}</SearchButton>
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
