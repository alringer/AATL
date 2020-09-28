import styled from 'styled-components'

export const FeatureListsTitle = styled.p`
    margin-top: 40px;

    font-size: 26px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.65;
    letter-spacing: normal;
    color: ${(props) => props.theme.charcoalGrey};
`

export const AdminRecommendationListsContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const AdminRecommendationListsTableContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 15px;
`

export const AdminRecommendationListsTableRow = styled.div`
    display: flex;
    flex-direction: row;
    height: 126px;

    box-shadow: inset 0 -1px 0 0 #e9e9e9, inset 0 1px 0 0 #e9e9e9;
    border: solid 2px var(--mushroom);
    background-color: #fbf9f7;

    padding: 15px 20px;
`

export const AdminRecommendationListsTableHeaderRow = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 20px 15px 20px;
`

export const AdminRecommendationListsImageColumn = styled.div`
    width: 156px;

    margin-right: 40px;
`
export const AdminRecommendationListsTitleColumn = styled.div`
    display: flex;
    width: 170px;

    margin-right: 40px;
`
export const AdminRecommendationListsSubTitleColumn = styled.div`
    display: flex;
    width: 220px;

    margin-right: 40px;
`
export const AdminRecommendationListsRecommendationsColumn = styled.div`
    width: 160px;

    margin-right: 95px;
`
export const AdminRecommendationListsActionsColumn = styled.div`
    display: flex;
    width: 112px;

    margin-right: 40px;
`

export const AdminRecommendationListsClickableText = styled.a`
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    text-decoration: underline;
    cursor: pointer;
    color: ${(props) => props.theme.darkSlateBlue};
    text-decoration-color: ${(props) => props.theme.darkSlateBlue} !important;
    :hover {
        text-decoration: underline;
        text-decoration-color: ${(props) => props.theme.darkSlateBlue} !important;
    }
`

export const AdminRecommendationListsActionClickableText = styled.p`
    font-size: 14px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    /* text-decoration: underline; */
    cursor: pointer;
    color: ${(props) => props.theme.mushroom};
`