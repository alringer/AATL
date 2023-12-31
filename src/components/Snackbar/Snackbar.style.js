import SnackbarImageBackground from 'assets/snackbarImageBackground.svg'
import { SNACKBAR_TYPES } from 'constants/SnackbarConstants'
import { TextLink } from 'style/Button/TextLink.style'
import { device } from 'style/device'
import zIndices from 'style/zIndices'
import styled, { css } from 'styled-components'

export const SnackbarContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    height: 100%;
    padding: 26px 20px;
    border-radius: 5px;
    box-shadow: 0 6px 24px 0 rgba(30, 31, 34, 0.5), 0 2px 4px 0 rgba(30, 31, 34, 0.24);
    border: solid 2px rgba(54, 57, 64, 0.06);
    z-index: ${zIndices.snackBar};

    ${(props) => {
        if (props.id === SNACKBAR_TYPES.Complete) {
            return css`
                background-color: ${props.theme.darkSlateBlue};

                ${SnackbarMessageLink} {
                    color: ${props.theme.dustyOrange};
                }
            `
        } else if (props.id === SNACKBAR_TYPES.Achievement) {
            return css`
                background-color: ${props.theme.dustyOrange};

                ${SnackbarMessageLink} {
                    color: ${props.theme.darkSlateBlue};
                }
            `
        } else if (props.id === SNACKBAR_TYPES.Error) {
            return css`
                background-color: ${props.theme.dustyRed};

                ${SnackbarMessageLink} {
                    color: ${props.theme.darkSlateBlue};
                }
            `
        }
    }}
`

export const SnackbarImageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 10px;
    margin-right: 15px;
    background-color: white;
    border-radius: 50%;
    background-image: url(${SnackbarImageBackground});
    background-size: cover;
`

export const SnackbarMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    max-width: 290px;
`

export const SnackbarMessageTitle = styled.div`
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: ${props => props.theme.white};

    @media ${device.mobile} {
        font-size: 14px;
    }
    @media ${device.tablet} {
        font-size: 18px;
    }
    @media ${device.laptop} {
        font-size: 18px;
    }
`

export const SnackbarMessageBody = styled.div`
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: ${props => props.theme.white};
    margin-top: 5px;

    @media ${device.mobile} {
        font-size: 12px;
    }
    @media ${device.tablet} {
        font-size: 14px;
    }
    @media ${device.laptop} {
        font-size: 14px;
    }
`

export const SnackbarMessageLink = styled(TextLink)`
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    margin-top: 3px;

    @media ${device.mobile} {
        font-size: 12px;
    }
    @media ${device.tablet} {
        font-size: 14px;
    }
    @media ${device.laptop} {
        font-size: 14px;
    }
`

export const SnackbarOrangeMessage = styled.p`
    display: inline;
    color: ${props => props.theme.dustyOrange};
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;

    @media ${device.mobile} {
        font-size: 12px;
    }
    @media ${device.tablet} {
        font-size: 14px;
    }
    @media ${device.laptop} {
        font-size: 14px;
    }
`