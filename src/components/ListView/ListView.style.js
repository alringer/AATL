import { TextLink } from 'style/Button/TextLink.style'
import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { device } from 'style/device'
import styled from 'styled-components'

const marginRight = '40px';
const hiddenContainerMargin = '40px';
const hiddenColumnMargin = '20px';

export const ListViewPageContainer = styled(ContentWrapper)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;

    @media ${device.mobile} {
        padding: 30px 0 80px;
    }
    @media ${device.tablet} {
        padding: 40px 0 140px;
    }
`
export const ListViewCountriesContainer = styled.div`
    margin-top: -${hiddenContainerMargin};

    @media ${device.mobile} {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
    @media ${device.tablet} {
        flex-direction: row;
        flex-wrap: wrap;
    }
`

export const ListViewCountryContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    
    margin-right: ${marginRight};
    margin-top: ${hiddenContainerMargin};
`

export const ListViewCountryTitleContainer = styled.div`
    display: flex;
    align-items: center;
`

export const ListViewRegionsContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    
    padding-top: 20px;
    margin-top: -${hiddenColumnMargin};
`

export const ListViewRegionColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 140px;

    margin-top: ${hiddenColumnMargin}; 
`
export const ListViewRegionContainer = styled.li`
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
`


// Texts
export const ListViewTitle = styled.p`
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};

    margin-bottom: 30px;

    @media ${device.mobile} {
        text-align: center;
        font-size: 20px;
        align-self: center;
    }
    @media ${device.tablet} {
        text-align: left;
        font-size: 24px;
        align-self: flex-start;
    }
`

export const ListViewCountryText = styled.p`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: ${props => props.theme.darkGrey};
`

export const ListViewRegionText = styled(TextLink)`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.7;
    letter-spacing: normal;
    color: ${props => props.theme.darkGrey};

`
export const ListViewNewText = styled.p`
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${props => props.theme.mushroom};
    
    margin-left: 5px;
`

export const EmptyMessage = styled.p`
    margin-top: 20px;
`