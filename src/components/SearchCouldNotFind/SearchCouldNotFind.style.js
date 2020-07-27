import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import styled, { css } from 'styled-components'

export const SearchCouldNotFindContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    @media ${device.mobile} {
        margin-top: 20px;
        padding: 20px 16px;
        text-align: center;
        
        align-items: center;
    }
    @media ${device.tablet} {
        margin-top: 30px;
        padding: 20px 80px;
        border: solid 2px rgba(54, 57, 64, 0.06);
    }
    @media ${device.laptop} {
        margin-top: 40px;
        padding: 0;
        border: none;
        text-align: left;

        align-items: flex-start;
    }

    ${props => {
        if (props.id === 'full-width') {
            return css`
                text-align: center !important;
                align-items: center !important;
                padding: 20px 80px !important;
                border: solid 2px rgba(54, 57, 64, 0.06) !important;

                margin-top: 30px !important;
            `
        }
    }}
`

export const SearchCouldNotFindTitle = styled.p`
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};
`
export const SearchCouldNotFindDescription = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};

    margin-top: 8px;
`
export const SearchCouldNotFindButton = styled(CustomButton)`
    color: ${(props) => props.theme.pinkishTan};
    background-color: ${(props) => props.theme.white};
    border-color: ${props => props.theme.darkGreyOpaque};
    padding: 13px 18px !important;
    white-space: nowrap;

    :hover {
        border-color: ${props => props.theme.darkGreyOpaque};
        background-color: ${(props) => props.theme.white};
    }

    margin-top: 20px;
`

