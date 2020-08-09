import Dialog from '@material-ui/core/Dialog'
import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import { CustomTextField } from 'style/TextField/TextField.style'
import styled from 'styled-components'

export const CustomDialog = styled(Dialog)`
    @media ${device.tablet} {
        margin: 0;
        .MuiDialog-paper {
            margin: 0;
        }
    }
`

export const SearchModalContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 100vh;

    @media ${device.mobile} {
        width: 100%;
        height: 100%;
    }
    @media ${device.tablet} {
        width: 768px;
        height: auto;
    }
    @media ${device.laptop} {
        width: 780px;
    }
`

// Header
export const SearchModalHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
    width: 100%;
    padding: 20px 30px;
    background-color: ${props => props.theme.darkSlateBlue};
`

export const SearchModalHeaderText = styled.p`
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    color: ${props => props.theme.white};
`

// Search Parameters
export const SearchModalContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const SearchModalInputFieldsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    padding: 30px;
`

export const SearchModalSearchResultsContainer = styled.div`
    padding-left: 30px;
    padding-right: 30px;
`

// Inputs
export const SearchInput = styled(CustomTextField)`
    width: 300px;
    padding: 0;
    margin-right: 15px;
`
export const SearchButton = styled(CustomButton)`
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.dustyOrange};
    :hover {
        background-color: ${(props) => props.theme.dustyOrange};
    }
    margin-left: 10px;

    /* height: 60px; */
`

// Restaurant card
export const SearchModalMatchesFound = styled.p`
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};
`

export const SearchModalNoResultsHeader = styled.p`
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};
`

export const SearchModalRestaurantCardsContainer = styled.div`
    overflow-y: auto;
    padding: 20px 0;

    @media ${device.mobile} {
        max-height: 100%;
    }
    @media ${device.tablet} {
        max-height: 500px;
    }
`

export const SearchModalRestaurantCardContainer = styled.div`
    display: flex;

    margin-bottom: 20px;

    @media ${device.mobile} {
        height: 160px;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
    @media ${device.tablet} {
        height: 110px;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
`
export const SearchModalRestaurantCardContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 100%;
`
export const SearchModalRestaurantCardImageContainer = styled.div`
    min-width: 110px;
    width: 110px;
    height: 110px;
`
export const SearchModalRestaurantCardInformationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    margin-left: 10px;
    height: 100%;
`
export const SearchModalRestaurantCardDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
`
export const SearchModalRestaurantCardAddressContainer = styled.div`
    display: flex;
    flex-direction: row;
`
export const SearchModalRestaurantCardRestaurantName = styled.p`
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: ${props => props.theme.darkGrey};
    overflow-wrap: wrap;
`
export const SearchModalRestaurantCardCategories = styled.p`
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${props => props.theme.charcoalGrey};
    overflow-wrap: wrap;
`
export const SearchModalRestaurantCardSpecials = styled.p`
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${props => props.theme.mushroom};
`
export const SearchModalRestaurantCardAddress = styled.p`
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};
`

export const RecommendButton = styled(CustomButton)`
    min-width: 126px;
    color: ${(props) => props.theme.mushroom};
    background-color: ${(props) => props.theme.white};
    border-color: ${(props) => props.theme.darkGreyOpaque};
    :hover {
        border-color: ${(props) => props.theme.darkGreyOpaque};
    }

    @media ${device.mobile} {
        margin-top: 10px;
        width: 100%;
    }
    @media ${device.tablet} {
        margin-top: 0;
        width: auto;
    }
`

// export const SearchModalRestaurantCard
// export const SearchModalRestaurantCard

// Footer
export const SearchModalSearchFooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border: solid 2px rgba(54, 57, 64, 0.1);

    padding: 21px 30px;
`

export const SearchModalSearchFooterText = styled.div`
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};
`
export const AddANewPlaceButton = styled(CustomButton)`
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.dustyOrange};
    :hover {
        background-color: ${(props) => props.theme.dustyOrange};
    }
    margin-left: 10px;
`

// Add a place
export const AddPlaceContentContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    padding: 30px;
`

export const AddPlaceContentRow = styled.div`
    display: flex;
    
    margin-bottom: 20px;
    width: 100%;
`

export const AddPlaceIntroText = styled.p`
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};
`

export const AddPlaceInput = styled(CustomTextField)``

export const SubmitButton = styled(CustomButton)`
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.dustyOrange};
    :hover {
        background-color: ${(props) => props.theme.dustyOrange};
    }
    margin-left: 10px;
`

export const CancelButton = styled(CustomButton)`
    color: ${(props) => props.theme.mushroom};
    background-color: ${(props) => props.theme.white};
    border-color: ${(props) => props.theme.darkGreyOpaque};
    :hover {
        border-color: ${(props) => props.theme.darkGreyOpaque};
    }
`