import SearchIcon from 'assets/lightSearch.svg'
import Image from 'components/Image/Image'
import { PlaceholderContainer, PlaceholderTextBold, PlaceholderTextNormal } from 'components/Search/Search.style'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'
import { query } from 'style/device'
import useAddressPredictions from 'utilities/hooks/useAddressPredictions'
import { ICategory } from 'utilities/types/category'
import {
    CustomAutoComplete,
    SearchAddressButtonContainer,
    SearchButton,
    SearchInput,
    SearchInputFieldsContainer
} from './SearchFull.style'

interface IReduxProps {
    categories: ICategory[]
}
interface ISearchFullProps extends IReduxProps {
    inputPlace: string
    inputAddress: string // TODO: Take in a location object
    handleSearch: (place: string, address: any) => void
}

const SearchFull: React.FC<ISearchFullProps> = ({ inputPlace, inputAddress, handleSearch, categories }) => {
    const [place, setPlace] = React.useState(inputPlace)
    const [address, setAddress] = React.useState(inputAddress)
    const [selectedAddress, setSelectedAddress] = React.useState()
    const predictions = useAddressPredictions(address)

    const isClient = typeof window === 'object'
    const geocoder = React.useRef()

    if (isClient && window && !geocoder.current) {
        geocoder.current = new window.google.maps.Geocoder()
    }

    const handleSelectPlace = (placeID: number) => {
        if (geocoder && geocoder.current) {
            geocoder.current.geocode({ placeId: placeID }, (geocode) => {
                if (geocode && geocode[0]) {
                    setSelectedAddress(geocode[0])
                    console.log(geocode[0])
                }
            })
        }
    }

    const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlace(String(e.target.value))
    }
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (String(e.target.value) === '') {
            setAddress(String(e.target.value))
            setSelectedAddress(null)
        } else {
            setAddress(String(e.target.value))
        }
    }

    return (
        <SearchInputFieldsContainer>
            <CustomAutoComplete
                freeSolo
                options={categories ? categories : []}
                getOptionLabel={(option: ICategory) => option.longName}
                onChange={(event, value) => {
                    handlePlaceChange(value)
                }}
                disableClearable
                renderInput={(params) => (
                    <SearchInput
                        {...params}
                        onChange={handlePlaceChange}
                        label={
                            !place ? (
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
                    options={predictions ? predictions : []}
                    getOptionLabel={(option: any) => (option.description ? option.description : '')}
                    onChange={(event, value) => {
                        if (!value) {
                            setAddress('')
                            handleSelectPlace(null)
                        } else if (value && value.place_id) {
                            setAddress(value.formatted_address)
                            handleSelectPlace(value.place_id)
                        }
                    }}
                    disableClearable
                    renderInput={(params) => (
                        <SearchInput
                            {...params}
                            onChange={handleAddressChange}
                            label={
                                address === '' ? (
                                    <PlaceholderContainer>
                                        <PlaceholderTextBold>{S.INPUT_PLACEHOLDERS.Near}</PlaceholderTextBold> &nbsp;
                                        <PlaceholderTextNormal>{S.INPUT_PLACEHOLDERS.Address}</PlaceholderTextNormal>
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
                                <SearchButton onClick={() => handleSearch(place, selectedAddress)}>
                                    <Image src={SearchIcon} alt="search-icon" />
                                </SearchButton>
                            )}
                            {(matches.tablet || matches.laptop) && (
                                <SearchButton onClick={() => handleSearch(place, selectedAddress)}>
                                    {S.BUTTON_LABELS.Search}
                                </SearchButton>
                            )}
                        </>
                    )}
                </Media>
            </SearchAddressButtonContainer>
        </SearchInputFieldsContainer>
    )
}

const mapStateToProps = (state: StoreState) => ({
    categories: state.categoriesReducer.categories
})
export default reduxConnect(mapStateToProps)(SearchFull)
