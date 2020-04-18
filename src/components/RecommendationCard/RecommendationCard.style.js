import { CustomIconButton } from 'style/Button/IconButton.style'
import styled from 'styled-components'

export const RecommendationCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    border: solid 2px rgba(54, 57, 64, 0.06);
    max-width: 940px;
`

export const RecommendationCardImageContainer = styled.div`
    width: 300px;
    height: 290px;
    
    img {
        object-fit: cover !important;
    }
`

export const RecommendationCardContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex-grow: 1;
    height: 100%;
    padding: 30px;
`

export const RecommendationHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const RecommendationButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`

export const RecommendationIcon = styled(CustomIconButton)`
    width: 48px;
    height: 48px;

    img {
        height: fit-content !important;
    }
`

export const RecommendationContentTopContainer = styled.div`
    width: 100%;
`
export const RecommendationContentMiddleContainer = styled.div`
    width: 100%;
    margin-top: 20px;
`
export const RecommendationContentBottomContainer = styled.div`
    width: 100%;
    margin-top: 30px;
`

export const RecommendationRestaurantNameText = styled.p`
    font-size: 30px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.93;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};
`

export const RecommendationRestaurantAddressText = styled.p`
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.83;
    letter-spacing: 2px;
    color: ${props => props.theme.charcoalGrey};
`

export const RecommendationRestaurantCategoryText = styled.p`
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${props => props.theme.mushroom};
`

export const RecommendationTitleText = styled.p`
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: ${props => props.theme.darkGrey};
`

export const RecommendationSummaryText = styled.p`
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: ${props => props.theme.darkGrey};
`

export const RecommendationAuthorNameText = styled.p`
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};
`

export const RecommendationAuthorTitleText = styled.p`
    opacity: 0.4;
    font-family: Rubik;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${props => props.theme.charcoalGrey};
`