import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { device } from 'style/device'
import styled, { css } from 'styled-components'

export const SearchWorkBenchContainer = styled(ContentWrapper)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    @media ${device.mobile} {
        padding: 30px 0;
    }
    @media ${device.tablet} {
        padding: 50px 0;
    }
    @media ${device.laptop} {
        padding: 100px 0;
    }
`

export const SearchWorkBenchContentContainer = styled.div`
    display: flex;

    @media ${device.mobile} {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        margin-top: 20px;
    }
    @media ${device.tablet} {
        margin-top: 30px;
    }
    @media ${device.laptop} {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
`

export const SearchWorkBenchLookupContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media ${device.mobile} {
        width: 320px;
    }
    @media ${device.tablet} {
        width: 690px;
    }
`

export const SearchWorkBenchYelpHeaderContainer = styled.div`
    display: flex;
    align-items: center;

    @media ${device.mobile} {
        padding: 10px 0;
        margin-top: 10px;
        flex-direction: column-reverse;
        justify-content: flex-start;
    }
    @media ${device.tablet} {
        padding: 10px 0;
        margin-top: 38px;
        flex-direction: row;
        justify-content: space-between;
    }
`

export const SearchWorkBenchYelpHeaderText = styled.div`
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;

    color: #363940;

    @media ${device.mobile} {
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        margin-top: 15px;
    }
    @media ${device.tablet} {
        font-size: 20px;
        line-height: 24px;
        text-align: left;
        margin-top: 0px;
    }
    @media ${device.laptop} {
        font-size: 20px;
        line-height: 24px;
    }
`

export const SearchWorkBenchYelpImage = styled.img`
    object-fit: cover;
`

export const PaginationContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`

export const SearchWorkBenchInputsContainer = styled.div`
    width: 100%;
`

export const SearchWorkBenchPlaceCardContainer = styled.div`
    margin-bottom: 30px;
`

export const SearchWorkBenchNavigationContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media ${device.mobile} {
        width: 100%;
        margin-top: 20px;
    }
    @media ${device.tablet} {
        margin-top: 30px;
    }
    @media ${device.laptop} {
        width: 200px;
        margin-top: 0;
        margin-left: 20px;
    }
`

export const SearchWorkBenchPaginationFilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    @media ${device.mobile} {
        margin-top: 20px;
        justify-content: center;
    }
    @media ${device.tablet} {
        margin-top: 26px;
        justify-content: flex-start;
    }

    ${(props) => {
        if (props.id === 'inactive') {
            return css`
                /* cursor: not-allowed !important; */
                opacity: 0.5;
            `
        }
    }}
`

export const SearchWorkBenchYelpResultsContainer = styled.div`
    @media ${device.mobile} {
        margin-top: 20px;
    }
    @media ${device.tablet} {
        margin-top: 26px;
    }
`

export const SearchWorkBenchPaginationFilterText = styled.p`
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${(props) => props.theme.charcoalGrey};
    margin-right: 10px;
`

// Texts
export const SearchWorkBenchTitle = styled.p`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: normal;
    color: ${(props) => props.theme.darkGrey};

    @media ${device.mobile} {
        font-size: 20px;
    }
    @media ${device.tablet} {
        font-size: 36px;
    }
`
export const SearchWorkBenchSubTitle = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${(props) => props.theme.darkGrey};
    text-overflow: wrap;

    margin-top: 20px;
`

export const NoSearchResultsContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 20px;
`
export const NoSearchResultsTitle = styled.p`
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    color: ${(props) => props.theme.charcoalGrey};

    margin-bottom: 10px;
`
export const NoSearchResultsSubTitle = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${(props) => props.theme.charcoalGrey};
`
