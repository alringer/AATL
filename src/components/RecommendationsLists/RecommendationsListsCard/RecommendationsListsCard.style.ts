import { CardAnchor, CardContainer } from 'style/Card/Card.style'
import { device } from 'style/device'
import styled, { css } from 'styled-components'

export const RecommendationsListsCardContainer = styled(CardContainer)`
    /* WideCardContainer */
    display: flex;
    width: 100%;
    border: solid 2px rgba(242, 243, 243, 1);

    @media ${device.mobile} {
        flex-direction: column;
        height: 100%;
        justify-content: flex-start;
        align-items: center;
    }

    @media ${device.tablet} {
        flex-direction: row;
        min-height: 220px;
        height: 220px;
        justify-content: flex-start;
        align-items: flex-start;
        background-clip: content-box;

        ${(props) => {
            if (props.id === 'toggled') {
                return css`
                    background-color: ${(props) => props.theme.darkSlateBlue};
                `
            }
        }}
    }

    ${(props) => {
        if (props.id === 'toggled') {
            return css`
                height: auto !important;
            `
        }
    }}
`

export const RecommendationsListsCardIconContainer = styled.div`
    margin-left: 6px;
`

export const RecommendationsListsCardHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

export const RecommendationsListsCardImageContainer = styled.div`
    /* WideCardImageContainer */

    position: relative;
    @media ${device.mobile} {
        height: 160px;
        width: 100%;
    }

    @media ${device.tablet} {
        height: 220px;
        width: 220px;
    }

    @media ${device.laptop} {
    }
`
export const RecommendationsListsCardContentContainer = styled.div`
    /* WideCardContentContainer */
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;

    @media ${device.mobile} {
        justify-content: flex-start;
        align-items: flex-start;
        padding: 8px 16px 20px;
    }

    @media ${device.tablet} {
        justify-content: flex-start;
        align-items: flex-start;
        padding: 30px;
        min-height: 220px;
    }
`

export const RecommendationsListsCardTitle = styled.p`
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    color: ${(props) => props.theme.charcoalGrey};
`
export const RecommendationsListsCardSubTitle = styled.p`
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: ${(props) => props.theme.darkGrey};

    margin-top: 10px;
`
export const RecommendationsListsCardContent = styled.p`
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: ${(props) => props.theme.darkGrey};

    margin-top: 10px;
`
export const RecommendationsListsCardBottomContainer = styled.div`
    display: flex;

    @media ${device.mobile} {
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        margin-top: 20px;
    }

    @media ${device.tablet} {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
    }

    @media ${device.laptop} {
    }
`
export const RecommendationsListsCardExtraInfo = styled.p`
    opacity: 0.4;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: 2.33px;
    color: ${(props) => props.theme.charcoalGrey};

    @media ${device.mobile} {
        font-size: 12px;
    }

    @media ${device.tablet} {
        font-size: 14px;
        margin-right: 10px;
    }

    @media ${device.laptop} {
        font-size: 14px;
        margin-right: 20px;
    }
`

export const RecommendationsListsCardAnchor = styled(CardAnchor)`
    width: 100%;
    text-decoration: none;
`
