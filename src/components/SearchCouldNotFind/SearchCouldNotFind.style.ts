import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import styled, { css } from 'styled-components'

export const SearchCouldNotFindContainer = styled.div`
    width: 100%;
    display: flex;

    @media ${device.mobile} {
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        padding: 10 15px;
        p {
            text-align: center;
        }
    }
    @media ${device.tablet} {
        margin-top: 30px;
        padding: 20px 80px;
        border: solid 2px rgba(54, 57, 64, 0.06);
    }
    @media ${device.laptop} {
        flex-direction: row;
        margin-top: 40px;
        padding: 0;
        border: none;
        align-items: flex-start;

        p {
            text-align: left;
        }
    }

    ${(props) => {
        if (props.id === 'full-width') {
            return css`
                text-align: left !important;
                align-items: center !important;
                padding: 20px 80px !important;
                border: solid 2px rgba(54, 57, 64, 0.06) !important;

                margin-top: 30px !important;
            `
        }
    }}
`

interface IMarginProps {
    giveMargin?: number
}

export const SearchCouldNotFindColumn = styled.div<IMarginProps>`
    display: flex;
    flex-direction: column;

    @media ${device.mobile} {
        align-items: center;

        ${(props) => {
            if (props.giveMargin === 1) {
                return css`
                    margin-top: 20px;
                `
            }
        }}
    }
    @media ${device.tablet} {
    }
    @media ${device.laptop} {
        align-items: flex-start;

        ${(props) => {
            if (props.giveMargin === 1) {
                return css`
                    margin-left: 40px;
                `
            }
        }}
    }
`

export const SearchCouldNotFindImage = styled.img`
    object-fit: cover;

    @media ${device.mobile} {
        display: none;
    }
    @media ${device.tablet} {
        display: block;
        width: 100px;
        height: 100px;
    }
    @media ${device.laptop} {
        width: auto;
        height: auto;
    }
`

export const SearchCouldNotFindTitle = styled.p`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    color: ${(props) => props.theme.charcoalGrey};

    @media ${device.mobile} {
        font-size: 16px;
    }
    @media ${device.tablet} {
        font-size: 16px;
    }
    @media ${device.laptop} {
        font-size: 20px;
    }
`
export const SearchCouldNotFindDescription = styled.p`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${(props) => props.theme.charcoalGrey};

    margin-top: 8px;

    @media ${device.mobile} {
        font-size: 14px;
    }
    @media ${device.tablet} {
        font-size: 14px;
    }
    @media ${device.laptop} {
        font-size: 16px;
    }
`
export const SearchCouldNotFindButton = styled(CustomButton)`
    color: ${(props) => props.theme.pinkishTan};
    background-color: ${(props) => props.theme.white};
    border-color: ${(props) => props.theme.darkGreyOpaque};
    padding: 13px 18px !important;
    white-space: nowrap;

    :hover {
        border-color: ${(props) => props.theme.darkGreyOpaque};
        background-color: ${(props) => props.theme.white};
    }

    margin-top: 20px;
`
