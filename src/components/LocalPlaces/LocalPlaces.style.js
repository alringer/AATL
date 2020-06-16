import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { device } from 'style/device'
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

    @media ${device.mobile} {
        margin-bottom: 52px;
        overflow-x: auto;
    }

    @media ${device.tablet} {
        margin-bottom: 0;
    }
`
export const LocalPlacesTab = styled.a`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: 2.67px;
    color: ${(props) => props.theme.mushroom};
    text-align: center;

    @media ${device.mobile} {
        font-size: 12px;
        margin-right: 30px;
    }

    @media ${device.tablet} {
        font-size: 16px;
        margin-right: 0;
    }

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