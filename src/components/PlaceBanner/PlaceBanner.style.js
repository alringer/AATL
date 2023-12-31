import { CustomButton } from 'style/Button/Button.style'
import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { device } from 'style/device'
import { ImageContainer } from 'style/ImageContainer/ImageContainer'
import zIndices from 'style/zIndices'
import styled from 'styled-components'

export const PlaceBannerContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    @media ${device.mobile} {
        flex-direction: column;
        padding: 0;
    }
    @media ${device.tablet} {
        flex-direction: row;
        padding: 67px 0px;
    }
    @media ${device.laptop} {
        flex-direction: row;
        padding: 67px 0px;
    }
`

export const PlaceBannerImageContainer = styled(ImageContainer)`

    ::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.25);
    }

    @media ${device.mobile} {
        position: relative;
        width: 100%;
        height: 240px;
    }
    @media ${device.tablet} {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        height: auto;
    }
    @media ${device.laptop} {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        height: auto;
    }
`

export const PlaceBannerContentContainer = styled(ContentWrapper)`
    position: relative;
    display: flex;
    width: 100%;
    z-index: ${zIndices.restaurantPlaceBannerImage};
`

export const PlaceBannerTextsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    @media ${device.mobile} {
        width: 100%;
        background-color: white;
        color: ${props => props.theme.charcoalGrey};
        padding: 24px 16px;
    }
    @media ${device.tablet} {
        /* width: 441px; */
        width: 100%;
        background-color: transparent;
        color: white;
        padding: 0;
    }
    @media ${device.laptop} {
        /* width: 460px; */
        width: 100%;
        background-color: transparent;
        color: white;
        padding: 0;
    }
`

// Texts
export const PlaceBannerPlaceCategory = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
`
export const PlaceBannerPlaceName = styled.p`
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.08;
    letter-spacing: normal;

    @media ${device.mobile} {
        font-size: 32px;
        text-shadow: none;
    }
    @media ${device.tablet} {
        font-size: 32px;
        text-shadow: 0 2px 4px ${props => props.theme.charcoalGrey};
    }
    @media ${device.laptop} {
        font-size: 40px;
        text-shadow: 0 2px 4px ${props => props.theme.charcoalGrey};
    }
`
export const PlaceBannerCityState = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;

    margin-top: 10px;
`

export const PlaceBannerAddressSpan = styled.span`
    display: flex;
    
    margin-top: 23px;
`

export const PlaceBannerAddressOne = styled.p`
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;

    @media ${device.mobile} {
        text-shadow: none;
    }
    @media ${device.tablet} {
        text-shadow: 0 2px 4px rgba(54, 57, 64, 0.12);
    }
    @media ${device.laptop} {
        text-shadow: 0 2px 4px rgba(54, 57, 64, 0.12);
    }
`

export const PlaceBannerAddressCityStateZip = styled(PlaceBannerAddressOne)`
    font-weight: normal;
`

export const PlaceBannerRecommendSpan = styled.span`
    display: flex;
    margin-top: 12px;
`

export const PlaceBannerRecommendRating = styled.p`
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;

    @media ${device.mobile} {
        text-shadow: none;
    }
    @media ${device.tablet} {
        text-shadow: 0 2px 4px rgba(54, 57, 64, 0.12);
    }
    @media ${device.laptop} {
        text-shadow: 0 2px 4px rgba(54, 57, 64, 0.12);
    }
`
export const PlaceBannerRecommendNumber = styled(PlaceBannerRecommendRating)`
    font-weight: normal;
`
export const PlaceBannerDescription = styled.p`
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;

    @media ${device.mobile} {
        text-shadow: none;
    }
    @media ${device.tablet} {
        text-shadow: 0 2px 4px rgba(54, 57, 64, 0.12);
    }
    @media ${device.laptop} {
        text-shadow: 0 2px 4px rgba(54, 57, 64, 0.12);
    }

    margin-top: 25px;
`

export const PlaceBannerContactInformationSpan = styled.span`
    display: flex;

    margin-top: 12px;
`

export const PlaceBannerVisitWebsite = styled.p`
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: ${props => props.theme.white};
`
export const PlaceBannerPhoneNumber = styled.p`
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: ${props => props.theme.white};
`

export const PlaceBannerButtonsContainer = styled.div`
    display: flex;
    width: 100%;

    @media ${device.mobile} {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    @media ${device.tablet} {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    @media ${device.laptop} {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    margin-top: 15px;
`

export const PlaceBannerButtonsTopContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    
    @media ${device.mobile} {
        justify-content: space-between;
        width: 100%;
    }
    @media ${device.tablet} {
        justify-content: flex-start;
        width: auto;
    }
`

export const PlaceBannerButtonsBottomContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
    @media ${device.mobile} {
        justify-content: space-between;
        margin-top: 10px;
        width: 100%;
    }
    @media ${device.tablet} {
        justify-content: flex-start;
        margin-top: 0;
        width: auto;
    }
`

export const FindATableButton = styled(CustomButton)`
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.dustyRed};
    :hover {
        background-color: ${props => props.theme.dustyRed};
    }

    @media ${device.mobile} {
        margin-right: 0;
        width: 140px;
    }
    @media ${device.tablet} {
        width: auto;
        margin-right: 8px;
    }
`

export const RecommendButton = styled(CustomButton)`
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.dustyOrange};
    :hover {
        background-color: ${props => props.theme.dustyOrange};
    }

    @media ${device.mobile} {
        margin-right: 0;
        width: 140px;
    }
    @media ${device.tablet} {
        width: auto;
        margin-right: 8px;
    }
`

export const AddToListButton = styled(CustomButton)`
    color: ${(props) => props.theme.darkSlateBlue};
    background-color: ${(props) => props.theme.white};
    :hover {
        background-color: ${(props) => props.theme.white};
    }


    @media ${device.mobile} {
        border-color: ${(props) => props.theme.darkSlateBlue};
        margin-right: 0;
        width: 140px;
    }
    @media ${device.tablet} {
        width: auto;
        border-color: transparent;
        margin-right: 8px;
    }
`

export const ShareButton = styled(CustomButton)`
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.darkSlateBlue};
    :hover {
        background-color: ${(props) => props.theme.darkSlateBlue};
    }

    @media ${device.mobile} {
        margin-right: 0;
        width: 140px;
    }
    @media ${device.tablet} {
        width: auto;
        margin-right: 8px;
    }
`

export const ShareIconButton = styled(CustomButton)`
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.darkSlateBlue};
    :hover {
        background-color: ${(props) => props.theme.darkSlateBlue};
    }

    @media ${device.mobile} {
        margin-right: 0;
    }
    @media ${device.tablet} {
        margin-right: 8px;
    }
`

// export const ShareButton = styled(CustomButton)`
//     color: ${props => props.theme.white};
//     background-color: ${props => props.theme.darkSlateBlue};
//     /* border-color: ${props => props.theme.white}; */
//     :hover {
//         background-color: ${props => props.theme.darkSlateBlue};
//     }

//     img {
//         width: 20px !important;
//         height: 20px !important;
//         margin-right: 5px;
//     }
// `

// export const ShareIconButton = styled(IconButton)`
//     background-color: ${props => props.theme.darkSlateBlue};
// `

// export const ShareIconButton = styled(IconButton)`
//     position: absolute;
//     top: 5px;
//     right: 5px;
//     z-index: ${zIndices.restaurantMobileShareIcon};
// `

export const PlaceBannerAnchor = styled.a`
    cursor: pointer;
    text-decoration: none;
    text-decoration-color: ${props => props.theme.white} !important;
    :hover {
        text-decoration: underline;
    }
`