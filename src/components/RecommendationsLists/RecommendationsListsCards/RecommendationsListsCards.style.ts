import { ListContainer, RecommendationCardContainer } from 'sections/CardsList/List.style'
import { device } from 'style/device'
import styled from 'styled-components'

export const RecommendationsListsCardsContainer = styled(ListContainer)`
    @media ${device.laptop} {
        max-width: 690px;
    }
`

export const RecommendationsListsCardsRowContainer = styled(RecommendationCardContainer)`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${device.mobile} {
        margin: 5px 0px;
    }
    @media ${device.tablet} {
        margin: 10px 0px;
    }
    @media ${device.laptop} {
        margin: 20px 0px;
    }
`
