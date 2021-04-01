import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { CustomButton } from 'style/Button/Button.style'
import { CustomIconButton } from 'style/Button/IconButton.style'
import styled, { css } from 'styled-components'

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

type HeaderProp = {
    isHeader?: boolean,
}

export const AdminCitiesColumn = styled.div<HeaderProp>`
    display: flex;
    ${props => {
        if (props.isHeader === true) {
            return css`
                align-items: center;
            `
        }
    }}
`

export const AdminCitiesImageColumn = styled(AdminCitiesColumn)`
    width: 140px;

    margin-right: 40px;
`
export const AdminCitiesCityColumn = styled(AdminCitiesColumn)`
    width: 130px;

    margin-right: 40px;
`
export const AdminCitiesStateColumn = styled(AdminCitiesColumn)`
    width: 130px;

    margin-right: 50px;
`
export const AdminCitiesPlacesColumn = styled(AdminCitiesColumn)`
    width: 130px;

    margin-right: 30px;
`
export const AdminCitiesRecommendationsColumn = styled(AdminCitiesColumn)`
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

export const AdminCitiesRecommendationsSortButton = styled(CustomIconButton)`
    margin-left: 5px;
`

export const AdminCitiesRecommendationsAscendingSortIcon = styled(ArrowUpwardIcon)`
    color: ${(props) => props.theme.mushroom};
`

export const AdminCitiesRecommendationsDescendingSortIcon = styled(ArrowDownwardIcon)`
    color: ${(props) => props.theme.mushroom};
`
