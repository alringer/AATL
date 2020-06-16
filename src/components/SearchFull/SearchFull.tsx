import SearchIcon from 'assets/lightSearch.svg'
import Image from 'components/Image/Image'
import { PlaceholderContainer, PlaceholderTextBold, PlaceholderTextNormal } from 'components/Search/Search.style'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { query } from 'style/device'
import { SearchAddressButtonContainer, SearchButton, SearchInput, SearchInputFieldsContainer } from './SearchFull.style'

interface ISearchFullProps {
    inputPlace: string
    inputAddress: string // TODO: Take in a location object
    handleSearch: (place: string, address: string) => void
}

const SearchFull: React.FC<ISearchFullProps> = ({ inputPlace, inputAddress, handleSearch }) => {
    const [place, setPlace] = React.useState(inputPlace)
    const [address, setAddress] = React.useState(inputAddress)

    React.useEffect(() => {
        setPlace(inputPlace)
        setAddress(inputAddress)
    }, [inputPlace, inputAddress])

    const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlace(String(e.target.value))
    }
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(String(e.target.value))
    }

    return (
        <SearchInputFieldsContainer>
            <SearchInput
                value={place}
                onChange={handlePlaceChange}
                autoFocus={true}
                label={
                    place === '' ? (
                        <PlaceholderContainer>
                            <PlaceholderTextBold>{S.INPUT_PLACEHOLDERS.VenueSearchBold}</PlaceholderTextBold> &nbsp;
                            <PlaceholderTextNormal>{S.INPUT_PLACEHOLDERS.VenueSearchNormal}</PlaceholderTextNormal>
                        </PlaceholderContainer>
                    ) : null
                }
                InputLabelProps={{
                    shrink: false,
                }}
                variant="outlined"
            />
            <SearchAddressButtonContainer>
                <SearchInput
                    value={address}
                    onChange={handleAddressChange}
                    autoFocus={true}
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
                <Media queries={query}>
                    {(matches) => (
                        <>
                            {matches.mobile && (
                                <SearchButton onClick={() => handleSearch(place, address)}>
                                    <Image src={SearchIcon} alt="search-icon" />
                                </SearchButton>
                            )}
                            {(matches.tablet || matches.laptop) && (
                                <SearchButton onClick={() => handleSearch(place, address)}>
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

export default SearchFull
