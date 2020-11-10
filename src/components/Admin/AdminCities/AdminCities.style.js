import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { CustomButton } from 'style/Button/Button.style'
import styled from 'styled-components'

export const AdminCitiesContainer = styled.div`
    display: flex;
    flex-direction: column;
`
export const AdminCitiesSearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 663px;

    margin-top: 40px;
`

export const AdminCitiesTableContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 40px;
`

export const AdminCitiesRow = styled.div`
    display: flex;
    flex-direction: row;
    height: 116px;

    padding: 15px 20px;
`

export const AdminCitiesLoadingContainer = styled(AdminCitiesRow)``

export const AdminCitiesTableRow = styled(AdminCitiesRow)`
    box-shadow: inset 0 -1px 0 0 #e9e9e9;
`

export const AdminCitiesTableHeaderRow = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 20px 14px 20px;
`

export const AdminCitiesImageColumn = styled.div`
    width: 140px;

    margin-right: 40px;
`
export const AdminCitiesCityColumn = styled.div`
    width: 130px;

    margin-right: 40px;
`
export const AdminCitiesStateColumn = styled.div`
    width: 130px;

    margin-right: 50px;
`
export const AdminCitiesPlacesColumn = styled.div`
    width: 130px;

    margin-right: 30px;
`
export const AdminCitiesRecommendationsColumn = styled.div`
    display: flex;
    width: 146px;
`

export const AdminCityAnchor = styled.a`
    color: ${(props) => props.theme.darkGrey};
    text-decoration-color: ${(props) => props.theme.darkSlateBlue};
    &:hover {
        text-decoration-color: ${(props) => props.theme.darkSlateBlue};
    }
`

export const AdminCityText = styled.p`
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: ${(props) => props.theme.darkSlateBlue};
`

export const AdminCitiesSearchButton = styled(CustomButton)`
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.darkSlateBlue};

    :hover {
        background-color: ${(props) => props.theme.darkSlateBlue};
    }

    margin-left: 10px;
`

export const AdminCitiesRecommendationsAscendingSortIcon = styled(ArrowUpwardIcon)`
    margin-left: 5px;
    color: ${(props) => props.theme.mushroom};
    cursor: pointer;
`

export const AdminCitiesRecommendationsDescendingSortIcon = styled(ArrowDownwardIcon)`
    margin-left: 5px;
    color: ${(props) => props.theme.mushroom};
    cursor: pointer;
`
