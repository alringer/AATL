// @ts-nocheck
import { createFilterOptions } from '@material-ui/lab/Autocomplete'
import SearchIcon from 'assets/lightSearch.svg'
import Image from 'components/Image/Image'
import { PlaceholderContainer, PlaceholderTextBold, PlaceholderTextNormal } from 'components/Search/Search.style'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { setPreferredLocation } from 'store/location/location_actions'
import { ILocationInformation } from 'store/location/location_types'
import { query } from 'style/device'
import { filterCategories } from 'utilities/helpers/filterCategories'
import useAddressPredictions from 'utilities/hooks/useAddressPredictions'
import { ICategory } from 'utilities/types/category'
import { SortEnum } from 'utilities/types/clientDTOS/SortType'
import {
    CustomAutoComplete,
    LocationIcon,
    SearchAddressButtonContainer,
    SearchButton,
    SearchInput,
    SearchInputFieldsContainer,
    SuggestionConstantOption,
    SuggestionOption,
    SuggestionOptionUseMyLocation,
} from './SearchFull.style'

interface IReduxProps {
    categories: ICategory[]
    preferredLocation: ILocationInformation
    ipLocation: ILocationInformation
    setPreferredLocation: (preferredLocation: ILocationInformation) => void
}
interface ISearchFullProps extends IReduxProps {
    inputPlace: string | null
    inputCategoryID: string | null
    inputAddress: string | null
    inputLat: string | null
    inputLng: string | null
    handleSearch: (
        place?: string,
        categoryID?: string,
        address?: string,
        lat?: string,
        lng?: string,
        sort?: SortEnum,
        page?: string
    ) => void
}

const SearchFull: React.FC<ISearchFullProps> = ({
    inputPlace,
    inputCategoryID,
    inputAddress,
    inputLat,
    inputLng,
    handleSearch,
    preferredLocation,
    ipLocation,
    categories,
    setPreferredLocation,
}) => {
    const [place, setPlace] = React.useState(inputPlace ? inputPlace : '')
    const [highlightedPlace, setHighlightedPlace] = React.useState(inputPlace ? inputPlace : '')
    const [categoryID, setCategoryID] = React.useState(inputCategoryID ? inputCategoryID : '')
    const [address, setAddress] = React.useState(inputAddress ? inputAddress : '')
    const [selectedAddress, setSelectedAddress] = React.useState(null)
    const [currentCategories, setCurrentCategories] = React.useState([])
    const predictions = useAddressPredictions(address)
    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        trim: true,
    })

    const isClient = typeof window === 'object'
    const geocoder = React.useRef()

    React.useEffect(() => {
        if (inputPlace) {
            setPlace(inputPlace)
            setHighlightedPlace(inputPlace)
        }
    }, [inputPlace])
    React.useEffect(() => {
        if (inputCategoryID) {
            setCategoryID(inputCategoryID)
        }
    }, [inputCategoryID])
    React.useEffect(() => {
        if (inputAddress) {
            setAddress(inputAddress)
        }
    }, [inputAddress])

    React.useEffect(() => {
        if (inputLat) {
            setSelectedAddress({ ...selectedAddress, lat: inputLat })
        }
    }, [inputLat])

    React.useEffect(() => {
        if (inputLng) {
            setSelectedAddress({ ...selectedAddress, lng: inputLng })
        }
    }, [inputLng])

    React.useEffect(() => {
        setCurrentCategories(filterCategories(place, categories))
    }, [place, categories])

    React.useEffect(() => {
        if (preferredLocation && !inputAddress && !address) {
            setAddress(
                `${preferredLocation.city ? `${preferredLocation.city}, ` : ''}${
                    preferredLocation.state ? `${preferredLocation.state}, ` : ''
                }${preferredLocation.country ? `${preferredLocation.country}` : ''}`
            )
            setSelectedAddress({
                lat: preferredLocation.lat,
                lng: preferredLocation.lng,
            })
        }
    }, [preferredLocation])

    if (isClient && window && !geocoder.current) {
        geocoder.current = new window.google.maps.Geocoder()
    }

    const handleSelectPlace = (placeID: number) => {
        if (geocoder && geocoder.current) {
            geocoder.current.geocode({ placeId: placeID }, (geocode) => {
                if (geocode && geocode[0]) {
                    setAddress(geocode[0].formatted_address)
                    setSelectedAddress({
                        lat: geocode[0].geometry.location.lat(),
                        lng: geocode[0].geometry.location.lng(),
                    })
                    let city
                    let state
                    let country
                    geocode[0].address_components.map((address_component) => {
                        if (address_component.types.includes('locality')) {
                            city = address_component.long_name
                        } else if (address_component.types.includes('administrative_area_level_1')) {
                            state = address_component.long_name
                        } else if (address_component.types.includes('country')) {
                            country = address_component.short_name
                        }
                    })
                    setPreferredLocation({
                        city: city,
                        state: state,
                        country: country,
                        lat: geocode[0].geometry.location.lat(),
                        lng: geocode[0].geometry.location.lng(),
                    })
                }
            })
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e && e.target) {
            if (e.target.value) {
                setPlace(String(e.target.value))
                setHighlightedPlace(String(e.target.value))
                setCategoryID(null)
            } else if (e.target.value === '') {
                setPlace('')
                setHighlightedPlace('')
                setCategoryID(null)
            }
            e.stopPropagation()
        }
    }

    const handleHighlightChange = (e: React.ChangeEvent, option: any) => {
        // Capture currently highlighted value in the case that the user triggers enter search
        if (option?.longName) {
            setHighlightedPlace(option.longName)
        } else if (option !== '') {
            setHighlightedPlace(option)
        } else {
            setHighlightedPlace('')
        }
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(String(e.target.value))
        if (selectedAddress) {
            setSelectedAddress(null)
        }
        e.stopPropagation()
    }

    const handleUseIPAddress = () => {
        if (ipLocation) {
            setAddress(
                `${ipLocation.city ? `${ipLocation.city}, ` : ''}${ipLocation.state ? `${ipLocation.state}, ` : ''}${
                    ipLocation.country ? `${ipLocation.country}` : ''
                }`
            )
            setSelectedAddress({
                lat: ipLocation.lat,
                lng: ipLocation.lng,
            })
            setPreferredLocation({
                city: ipLocation.city,
                state: ipLocation.state,
                country: ipLocation.country,
                lat: ipLocation.lat,
                lng: ipLocation.lng,
            })
        }
    }

    const handleClickSearch = () => {
        // If selectedAddress does not exist
        if (!selectedAddress) {
            // - Use first option in the autoComplete suggestions
            if (predictions && predictions.length > 0) {
                if (geocoder && geocoder.current) {
                    geocoder.current.geocode({ placeId: predictions[0].place_id }, (geocode) => {
                        if (geocode && geocode[0]) {
                            const geocodeLat = geocode[0].geometry.location.lat()
                            const geocodeLng = geocode[0].geometry.location.lng()
                            setAddress(geocode[0].formatted_address)
                            setSelectedAddress({
                                lat: geocodeLat,
                                lng: geocodeLng,
                            })
                            let city
                            let state
                            let country
                            geocode[0].address_components.map((address_component) => {
                                if (address_component.types.includes('locality')) {
                                    city = address_component.long_name
                                } else if (address_component.types.includes('administrative_area_level_1')) {
                                    state = address_component.long_name
                                } else if (address_component.types.includes('country')) {
                                    country = address_component.short_name
                                }
                            })
                            setPreferredLocation({
                                city: city,
                                state: state,
                                country: country,
                                lat: geocodeLat,
                                lng: geocodeLng,
                            })
                            handleSearch(
                                highlightedPlace,
                                categoryID,
                                geocode[0].formatted_address,
                                geocodeLat,
                                geocodeLng,
                                0
                            )
                        }
                    })
                } else {
                    handleSearch(highlightedPlace, categoryID, address, preferredLocation?.lat, preferredLocation?.lng)
                }
            } else {
                handleSearch(highlightedPlace, categoryID, address, preferredLocation?.lat, preferredLocation?.lng)
            }
        } else {
            // Selected address exists
            handleSearch(highlightedPlace, categoryID, address, selectedAddress?.lat, selectedAddress?.lng)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClickSearch()
        }
    }

    interface IDefaultSearchOption {
        value: string
        label: string
    }
    return (
        <SearchInputFieldsContainer>
            <CustomAutoComplete
                freeSolo
                inputValue={place}
                options={currentCategories}
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.longName)}
                groupBy={(option) => option.tag}
                onChange={(event, value) => {
                    if (value.longName) {
                        setPlace(value.longName)
                        setHighlightedPlace(value.longName)
                        setCategoryID(value.id)
                    } else {
                        setPlace(value)
                        setHighlightedPlace(value)
                        setCategoryID(null)
                    }
                }}
                onInputChange={handleInputChange}
                onHighlightChange={handleHighlightChange}
                disableClearable
                renderOption={(option, state) => {
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
                                    <PlaceholderTextBold>{S.INPUT_PLACEHOLDERS.VenueSearchBold}</PlaceholderTextBold>{' '}
                                    &nbsp;
                                    <PlaceholderTextNormal>
                                        {S.INPUT_PLACEHOLDERS.VenueSearchNormal}
                                    </PlaceholderTextNormal>
                                </PlaceholderContainer>
                            ) : null
                        }
                        InputLabelProps={{ shrink: false }}
                        variant="outlined"
                        onKeyDown={handleKeyDown}
                    />
                )}
            />
            <SearchAddressButtonContainer>
                <CustomAutoComplete
                    freeSolo
                    inputValue={address}
                    options={
                        predictions && predictions.length > 1
                            ? ['Use My Location', ...predictions]
                            : ['Use My Location']
                    }
                    getOptionLabel={(option: any) => (option.description ? option.description : option)}
                    filterOptions={(options, state) => options}
                    onKeyDown={handleKeyDown}
                    onChange={(event, value) => {
                        if (value && value.place_id && value.description) {
                            setAddress(value.description)
                            handleSelectPlace(value.place_id)
                        } else {
                            handleUseIPAddress()
                        }
                    }}
                    disableClearable
                    renderOption={(option, state) => {
                        if (option === 'Use My Location') {
                            return (
                                <SuggestionOptionUseMyLocation id="suggestion">
                                    <LocationIcon />
                                    Current Location
                                </SuggestionOptionUseMyLocation>
                            )
                        } else {
                            return <SuggestionOption id="suggestion">{option.description}</SuggestionOption>
                        }
                    }}
                    renderInput={(params) => (
                        <SearchInput
                            {...params}
                            onChange={handleAddressChange}
                            label={
                                address === '' ? (
                                    <PlaceholderContainer>
                                        <PlaceholderTextBold>{S.INPUT_PLACEHOLDERS.Near}</PlaceholderTextBold> &nbsp;
                                        <PlaceholderTextNormal>
                                            {S.INPUT_PLACEHOLDERS.CityStateZip}
                                        </PlaceholderTextNormal>
                                    </PlaceholderContainer>
                                ) : null
                            }
                            InputLabelProps={{ shrink: false }}
                            variant="outlined"
                        />
                    )}
                />

                <Media queries={query}>
                    {(matches) => (
                        <>
                            {matches.mobile && (
                                <SearchButton onClick={handleClickSearch}>
                                    <Image src={SearchIcon} alt="search-icon" />
                                </SearchButton>
                            )}
                            {(matches.tablet || matches.laptop) && (
                                <SearchButton onClick={handleClickSearch}>{S.BUTTON_LABELS.Search}</SearchButton>
                            )}
                        </>
                    )}
                </Media>
            </SearchAddressButtonContainer>
        </SearchInputFieldsContainer>
    )
}

const mapStateToProps = (state: StoreState) => ({
    categories: state.categoriesReducer.categories,
    preferredLocation: state.locationReducer.preferredLocation,
    ipLocation: state.locationReducer.ipLocation,
})
const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            setPreferredLocation,
        },
        dispatch
    )
export default reduxConnect(mapStateToProps, mapDispatchToProps)(SearchFull)
