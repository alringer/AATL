import MuiCallMadeIcon from '@material-ui/icons/CallMade'
import MuiDeleteForeverIcon from '@material-ui/icons/DeleteForever'
import MuiEditIcon from '@material-ui/icons/Edit'
import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { device } from 'style/device'
import styled, { css } from 'styled-components'

export const DeleteForeverIcon = styled(MuiDeleteForeverIcon)`
    color: ${props => props.theme.darkSlateBlue};
`
export const EditIcon = styled(MuiEditIcon)`
    color: ${props => props.theme.darkSlateBlue};
`
export const CallMadeIcon = styled(MuiCallMadeIcon)`
    color: ${props => props.theme.darkSlateBlue};
`

export const UserProfileListsContainer = styled(ContentWrapper)`
    display: flex;
    width: 100%;

    @media ${device.mobile} {
        flex-direction: column;
        margin-top: 24px;
    }
    @media ${device.tablet} {
        flex-direction: column;
        margin-top: 24px;
    }
    @media ${device.laptop} {
        flex-direction: row;
        margin-top: 100px;
    }
`

// Navigation
export const UserProfileListsNavigationContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media ${device.mobile} {
        width: 100%;
        margin-right: 0;
    }
    @media ${device.tablet} {
        width: 100%;
        margin-right: 0;
    }
    @media ${device.laptop} {
        width: 220px;
        margin-right: 30px;
    }
`

export const UserProfileListsNavigationTitle = styled.p`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    color: ${props => props.theme.charcoalGrey};

    @media ${device.mobile} {
        font-size: 22px;
    }
    @media ${device.tablet} {
        font-size: 22px;
    }
    @media ${device.laptop} {
        font-size: 24px;
    }
`

export const UserProfileListsNavigationParentListContainer = styled.div`
    margin-top: 20px;
`
export const UserProfileListsNavigationMyListContainer = styled(UserProfileListsNavigationParentListContainer)`
    padding-bottom: 20px;
    border-bottom: solid 1px rgba(30, 31, 34, 0.1);

    @media ${device.mobile} {
        margin-top: 24px;
    }
    @media ${device.tablet} {
        margin-top: 24px;
    }
    @media ${device.laptop} {
        margin-top: 30px;
    }
`

export const UserProfileListsNavigationParentListTitle = styled.p`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    color: ${props => props.theme.charcoalGrey};

    @media ${device.mobile} {
        font-size: 10px;
        line-height: 2;
        letter-spacing: 1.67px;
    }
    @media ${device.tablet} {
        font-size: 10px;
        line-height: 2;
        letter-spacing: 1.67px;
    }
    @media ${device.laptop} {
        font-size: 12px;
        line-height: 1.67;
        letter-spacing: 2px;
    }

    ${props => {
        if (props.id === 'active') {
            return css`
                color: ${(props) => props.theme.mushroom};
            `
        }
    }}
`
export const UserProfileListsNavigationChildListTitle = styled.p`
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${props => props.theme.charcoalGrey};

    @media ${device.mobile} {
        font-size: 10px;
        font-weight: 500;
    }
    @media ${device.tablet} {
        font-size: 10px;
        font-weight: 500;
    }
    @media ${device.laptop} {
        font-size: 12px;
        font-weight: normal;
    }

    ${props => {
        if (props.id === 'active') {
            return css`
                color: ${(props) => props.theme.mushroom};
            `
        }
    }}
`

// Main View
export const UserProfileListsMainViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
    width: 100%;

    @media ${device.mobile} {
        margin-top: 30px;
        align-items: center;
    }
    @media ${device.tablet} {
        margin-top: 30px;
        margin-bottom: 20px;
    }
    @media ${device.laptop} {
        margin-top: 0;
        margin-bottom: 0;
        align-items: flex-start;
    }
`

export const UserProfileListsMainViewHeaderContainer = styled.div`
    display: flex;

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
    }
`

export const UserProfileListsMainViewHeaderTextContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media ${device.mobile} {
        align-items: center;
    }
    @media ${device.tablet} {
        align-items: center;
    }
    @media ${device.laptop} {
        align-items: flex-start;
    }
`

export const UserProfileListsMainViewControlsContainer = styled.div`
    display: flex;
    flex-direction: row;
`
export const UserProfileListsMainViewListTitle = styled.p`
    font-size: 36px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: normal;
    color: ${props => props.theme.darkSlateBlue};

    @media ${device.mobile} {
        font-size: 22px;
        text-align: center;
    }
    @media ${device.tablet} {
        font-size: 36px;
    }
    @media ${device.laptop} {
        font-size: 36px;
        text-align: left;
    }
`
export const UserProfileListsMainViewListDescription = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${props => props.theme.darkGrey};

    @media ${device.mobile} {
        font-size: 14px;
        text-align: center;
    }
    @media ${device.tablet} {
        font-size: 16px;
    }
    @media ${device.laptop} {
        font-size: 16px;
        text-align: left;
    }

    margin-top: 10px;
    margin-bottom: 10px;
`