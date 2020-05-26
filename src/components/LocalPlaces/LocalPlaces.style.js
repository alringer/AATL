import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { SectionContainer, SectionHeaderContainer, SectionHeaderSubTitleText, SectionHeaderTitleText } from 'style/Section/Section.style'
import styled, { css } from 'styled-components'

// General
export const LocalPlacesContainer = styled(SectionContainer)``

// Header
export const LocalPlacesHeaderContainer = styled(SectionHeaderContainer)``

export const LocalPlacesHeaderTitleText = styled(SectionHeaderTitleText)``

export const LocalPlacesHeaderSubTitleText = styled(SectionHeaderSubTitleText)``

export const LocalPlacesTabsContainer = styled(ContentWrapper)`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    padding: 0px 5px;
`
export const LocalPlacesTab = styled.a`
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: 2.67px;
    color: ${(props) => props.theme.mushroom};

    opacity: 0.4;
    :hover {
        cursor: pointer;
        opacity: 1.0;
    }

    ${props => {
        if (props.id === 'active') {
            return css`
                opacity: 1;
            `
        }
    }}
`