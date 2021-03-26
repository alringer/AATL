import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { device } from 'style/device'
import {
    SectionContainer,
    SectionHeaderContainer,
    SectionHeaderSubTitleText,
    SectionHeaderTitleText,
} from 'style/Section/Section.style'
import styled, { css } from 'styled-components'

// General
export const LocalPlacesContainer = styled(SectionContainer)`
    margin-top: 0;
    margin-bottom: 0;
    @media ${device.mobile} {
        margin-top: 50px;
        margin-bottom: 50px;
    }
    @media ${device.tablet} {
        margin-top: 0;
        margin-bottom: 0;
    }
    @media ${device.laptop} {
        margin-top: 0;
        margin-bottom: 0;
    }
`

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
        border-bottom: solid 2px rgba(54, 57, 64, 0.06);
        padding-bottom: 22px;
        overflow-x: auto;
    }
    @media ${device.tablet} {
        border-bottom: none;
        padding-bottom: 0;
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
        opacity: 1;
    }

    ${(props) => {
        if (props.id === 'active') {
            return css`
                opacity: 1;
            `
        }
    }}
`

export const LocalPlacesContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    @media ${device.mobile} {
        margin-top: 30px;
        margin-bottom: 15px;
    }
    @media ${device.tablet} {
        margin-top: 20px;
        margin-bottom: 30px;
    }
    @media ${device.laptop} {
        margin-top: 20px;
        margin-bottom: 30px;
    }
`
