import Image from 'components/Image/Image'
import { PlaceholderContainer, PlaceholderTextBold, PlaceholderTextNormal } from 'components/Search/Search.style'
import * as S from 'constants/StringConstants'
import React from 'react'
import { concatCategories } from 'utilities/helpers/concatStrings'
import { IMockSearchResult } from './SearchModal'
import {
    RecommendButton,
    SearchButton,
    SearchInput,
    SearchModalContentWrapper,
    SearchModalHeaderContainer,
    SearchModalHeaderText,
    SearchModalInputFieldsContainer,
    SearchModalMatchesFound,
    SearchModalRestaurantCardAddress,
    SearchModalRestaurantCardAddressContainer,
    SearchModalRestaurantCardCategories,
    SearchModalRestaurantCardContainer,
    SearchModalRestaurantCardContentContainer,
    SearchModalRestaurantCardDetailsContainer,
    SearchModalRestaurantCardImageContainer,
    SearchModalRestaurantCardInformationsContainer,
    SearchModalRestaurantCardRestaurantName,
    SearchModalRestaurantCardsContainer,
    SearchModalRestaurantCardSpecials,
    SearchModalSearchResultsContainer,
} from './SearchModal.style'

interface ISearchRestaurantProps {
    switchViewToAddPlace: () => void
    place: string
    address: string
    searchResults: IMockSearchResult[]
    handlePlaceChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSearch: () => void
}

const SearchRestaurant: React.FC<ISearchRestaurantProps> = ({
    switchViewToAddPlace,
    place,
    address,
    searchResults,
    handlePlaceChange,
    handleAddressChange,
    handleSearch,
}) => {
    const handleAddPlace = () => {
        switchViewToAddPlace()
    }

    const renderSearchModalRestaurantCard = (restaurant: IMockSearchResult, key: number) => {
        return (
            <SearchModalRestaurantCardContainer>
                <SearchModalRestaurantCardContentContainer>
                    <SearchModalRestaurantCardImageContainer>
                        <Image src={restaurant.imgSrc} alt="restaurant-image" />
                    </SearchModalRestaurantCardImageContainer>
                    <SearchModalRestaurantCardInformationsContainer>
                        <SearchModalRestaurantCardDetailsContainer>
                            <SearchModalRestaurantCardRestaurantName>
                                {restaurant.name}
                            </SearchModalRestaurantCardRestaurantName>
                            <SearchModalRestaurantCardCategories>
                                {concatCategories(restaurant.categories)}
                            </SearchModalRestaurantCardCategories>
                            <SearchModalRestaurantCardSpecials>{restaurant.specials}</SearchModalRestaurantCardSpecials>
                        </SearchModalRestaurantCardDetailsContainer>
                        <SearchModalRestaurantCardAddressContainer>
                            <SearchModalRestaurantCardAddress>{restaurant.address}</SearchModalRestaurantCardAddress>
                        </SearchModalRestaurantCardAddressContainer>
                    </SearchModalRestaurantCardInformationsContainer>
                </SearchModalRestaurantCardContentContainer>
                <RecommendButton>{S.BUTTON_LABELS.Recommend}</RecommendButton>
            </SearchModalRestaurantCardContainer>
        )
    }

    return (
        <div>
            <SearchModalHeaderContainer>
                <SearchModalHeaderText>{S.RESTAURANT_SEARCH.Header}</SearchModalHeaderText>
            </SearchModalHeaderContainer>
            <SearchModalContentWrapper>
                <SearchModalInputFieldsContainer>
                    <SearchInput
                        value={place}
                        onChange={handlePlaceChange}
                        autoFocus={true}
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
                        InputLabelProps={{
                            shrink: false,
                        }}
                        variant="outlined"
                    />
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
                    <SearchButton onClick={handleSearch}>{S.BUTTON_LABELS.Search}</SearchButton>
                </SearchModalInputFieldsContainer>
                {searchResults.length > 0 && (
                    <>
                        <SearchModalSearchResultsContainer>
                            <SearchModalMatchesFound>
                                {searchResults.length} {S.RESTAURANT_SEARCH.Matches}
                            </SearchModalMatchesFound>
                            <SearchModalRestaurantCardsContainer>
                                {searchResults.map((result: IMockSearchResult, index: number) => {
                                    return renderSearchModalRestaurantCard(result, index)
                                })}
                            </SearchModalRestaurantCardsContainer>
                        </SearchModalSearchResultsContainer>
                        {/* <SearchModalSearchFooterContainer>
                            <SearchModalSearchFooterText>{S.RESTAURANT_SEARCH.NotFind}</SearchModalSearchFooterText>
                            <AddANewPlaceButton onClick={handleAddPlace}>
                                {S.BUTTON_LABELS.AddNewPlace}
                            </AddANewPlaceButton>
                        </SearchModalSearchFooterContainer> */}
                    </>
                )}
            </SearchModalContentWrapper>
        </div>
    )
}

export default SearchRestaurant
