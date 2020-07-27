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
    inputAddress: string | null
    inputLat: string | null
    inputLng: string | null
    handleSearch: (place?: string, address?: string, lat?: string, lng?: string, sort?: SortEnum) => void
}

const SearchFull: React.FC<ISearchFullProps> = ({
    inputPlace,
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
    const [address, setAddress] = React.useState(inputAddress ? inputAddress : '')
    const [selectedAddress, setSelectedAddress] = React.useState(null)
    const predictions = useAddressPredictions(address)

    const isClient = typeof window === 'object'
    const geocoder = React.useRef()

    React.useEffect(() => {
        console.log('Selected Address: ', selectedAddress)
    }, [selectedAddress])

    React.useEffect(() => {
        if (inputPlace) {
            setPlace(inputPlace)
        }
    }, [inputPlace])
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

    const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e && e.target) {
            if (e.target.value) {
                setPlace(String(e.target.value))
            } else if (e.target.value === '') {
                setPlace('')
            }
        }
        e.stopPropagation()
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
                            handleSearch(place, geocode[0].formatted_address, geocodeLat, geocodeLng)
                        }
                    })
                } else {
                    handleSearch(place, address, preferredLocation.lat, preferredLocation.lng)
                }
            } else {
                handleSearch(place, address, preferredLocation.lat, preferredLocation.lng)
            }
        } else {
            // Selected address exists
            handleSearch(place, address, selectedAddress?.lat, selectedAddress?.lng)
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
                options={
                    place === ''
                        ? []
                        : categories && place
                        ? [`${place}`, ...categories]
                        : !categories && place
                        ? [`${place}`]
                        : categories && !place
                        ? categories
                        : []
                }
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.longName)}
                onChange={(event, value) => {
                    if (value.longName) {
                        setPlace(value.longName)
                    } else {
                        setPlace(value)
                    }
                }}
                onInputChange={handlePlaceChange}
                disableClearable
                renderOption={(option, state) => {
                    if (option.longName) {
                        return <SuggestionOption id="suggestion">{option.longName}</SuggestionOption>
                    } else {
                        return <SuggestionOption id="suggestion">{option}</SuggestionOption>
                    }
                }}
                renderInput={(params) => (
                    <SearchInput
                        {...params}
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
