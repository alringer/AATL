import { device, sidePaddings } from 'style/device'
import styled, { css } from 'styled-components'

export const FooterContainer = styled.div`
    /* position: absolute; */
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 75px 250px;
    background-color: rgba(62, 136, 169, 0.2);

    @media ${device.mobile} {
        padding: 40px ${sidePaddings.mobile};
        text-align: center;
    }

    @media ${device.tablet} {
        padding: 40px ${sidePaddings.tablet};
        text-align: left;
    }

    @media ${device.laptop} {
        padding: 75px ${sidePaddings.laptop};
        text-align: left;
    }
`

export const FooterFirstRow = styled.div`
    display: flex;
    justify-content: space-between;

    @media ${device.mobile} {
        flex-direction: column;
        align-items: center;
    }
    @media ${device.tablet} {
        flex-direction: row;
        align-items: flex-start;
    }
    @media ${device.laptop} {
        flex-direction: row;
        align-items: flex-start;
    }
`
export const FooterSecondRow = styled.div`
    display: flex;

    margin-top: 50px;
    @media ${device.mobile} {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    @media ${device.tablet} {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }

    @media ${device.laptop} {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
`

export const FooterLeftColumn = styled.div`
    display: flex;
    flex-direction: column;

    @media ${device.mobile} {
        width: 100%;
        align-items: center;
    }
    @media ${device.tablet} {
        max-width: 400px;
        align-items: flex-start;
    }
    @media ${device.laptop} {
        max-width: 400px;
        align-items: flex-start;
    }
`

export const FooterRightColumn = styled.div`
    display: flex;

    @media ${device.mobile} {
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
    }
    @media ${device.tablet} {
        flex-direction: row;
        align-items: flex-start;
        margin-top: 0px;
    }
    @media ${device.laptop} {
        flex-direction: row;
        align-items: flex-start;
        margin-top: 0px;
    }
`

export const FooterInformationTitle = styled.p`
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: ${(props) => props.theme.darkGrey};

    @media ${device.mobile} {
        font-size: 20px;
    }
    @media ${device.tablet} {
        font-size: 18px;
    }
    @media ${device.laptop} {
        font-size: 18px;
    }

    margin-bottom: 15px;
`
export const FooterInformationBody = styled.p`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${(props) => props.theme.darkGrey};

    @media ${device.mobile} {
        text-align: center;
        margin-bottom: 16px;
        font-size: 11px;
    }
    @media ${device.tablet} {
        text-align: left;
        margin-bottom: 16px;
    }
    @media ${device.laptop} {
        text-align: left;
        margin-bottom: 25px;
        font-size: 16px;
    }
`

export const FooterButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
`

export const FooterLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media ${device.mobile} {
        margin-left: 0;
    }
    @media ${device.tablet} {
        ${(props) => {
            if (props.id === 'marginLeft') {
                return css`
                    margin-left: 120px;
                `
            }
        }}
    }
    @media ${device.laptop} {
        ${(props) => {
            if (props.id === 'marginLeft') {
                return css`
                    margin-left: 120px;
                `
            }
        }}
    }
`

export const FooterLinkRow = styled.div`
    margin-bottom: 10px;
`

export const FooterAnchor = styled.a`
    cursor: pointer;
    text-decoration: none;
    margin-bottom: 10px;

    &:hover {
        text-decoration: underline;
        text-decoration-color: ${(props) => props.theme.darkGrey};
    }
`

export const FooterTermsOfUseAnchor = styled.a`
    color: ${(props) => props.theme.darkGrey};
    cursor: pointer;

    &:hover {
        text-decoration-color: ${(props) => props.theme.darkGrey};
    }
`

export const FooterLinkTitleAnchor = styled(FooterAnchor)`
    margin-bottom: 20px;
`

export const FooterLinkTitle = styled.p`
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: ${(props) => props.theme.darkGrey};
`

export const FooterLinkItem = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${(props) => props.theme.darkGrey};
`

export const FooterTinyText = styled.p`
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.83;
    letter-spacing: normal;
    text-align: right;
    color: ${(props) => props.theme.darkGrey};
`
