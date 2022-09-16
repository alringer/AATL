import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import MuiEditIcon from '@material-ui/icons/Edit'
import ProfileBannerBG from 'assets/profileHeroBG.png'
import { CustomButton } from 'style/Button/Button.style'
import { CustomIconButton } from 'style/Button/IconButton.style'
import { device } from 'style/device'
import styled, { css } from 'styled-components'

export const UserProfileBannerContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    background-image: url(${ProfileBannerBG});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    @media ${device.mobile} {
        padding: 29px 24px;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    @media ${device.tablet} {
        padding: 102px 24px 78px;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
    }
    @media ${device.laptop} {
        padding: 120px 250px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
`

export const UserProfileMainInformationContainer = styled.div`
    display: flex;

    @media ${device.mobile} {
        flex-direction: row;
        width: 100%;
    }
    @media ${device.tablet} {
        flex-direction: row;
        width: auto;
    }
`

export const UserProfileImageContainer = styled.div`
    display: flex;
    border-radius: 50%;
    border: solid 4px ${(props) => props.theme.white};
    overflow: hidden;

    @media ${device.mobile} {
        width: 70px;
        height: 70px;
        margin-right: 16px;
    }
    @media ${device.tablet} {
        width: 255px;
        height: 255px;
        margin-right: 0;
    }
    @media ${device.laptop} {
        width: 360px;
        height: 360px;
    }
`

export const UserProfileContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;

    @media ${device.mobile} {
        margin-left: 0;
    }
    @media ${device.tablet} {
        margin-left: 24px;
    }
    @media ${device.laptop} {
        margin-left: 40px;
    }
`

export const UserProfileContentHeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

// Shared Input
export const UserProfileTextInput = styled(TextareaAutosize)`
    background-color: rgba(0, 0, 0, 0.5);
    border-color: transparent;
    border-radius: 5px;
    width: 100%;
`

// User Profile Name
const UserProfileNameCSS = css`
    text-shadow: 0 2px 0 rgba(54, 57, 64, 0.12);
    font-size: 36px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${(props) => props.theme.white};

    @media ${device.mobile} {
        font-size: 16px;
    }
    @media ${device.tablet} {
        font-size: 36px;
    }
`
export const UserProfileNameContainer = styled.div`
    display: flex;
`
export const UserProfileName = styled.p`
    ${UserProfileNameCSS}
`
export const UserProfileNameInput = styled(UserProfileTextInput)`
    ${UserProfileNameCSS}
`

// User Profile Title
const UserProfileTitleCSS = css`
    text-shadow: 0 2px 0 rgba(54, 57, 64, 0.12);
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
    color: ${(props) => props.theme.white};

    @media ${device.mobile} {
        font-size: 12px;
    }
    @media ${device.tablet} {
        font-size: 18px;
    }
`
export const UserProfileTitleContainer = styled.div`
    display: flex;
`
export const UserProfileTitle = styled.p`
    ${UserProfileTitleCSS}
`
export const UserProfileTitleInput = styled(UserProfileTextInput)`
    ${UserProfileTitleCSS}
`

// User Profile Description
const UserProfileDescriptionCSS = css`
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: ${(props) => props.theme.white};
`
export const UserProfileDescriptionContainer = styled.div`
    display: flex;
    width: 100%;
    @media ${device.mobile} {
        margin-top: 24px;
    }
    @media ${device.tablet} {
        margin-top: 16px;
    }
`
export const UserProfileDescription = styled.p`
    ${UserProfileDescriptionCSS}
`
export const UserProfileDescriptionInput = styled(UserProfileTextInput)`
    ${UserProfileDescriptionCSS}
`

// User Recommendations
export const UserProfileNumberOfRecommendations = styled.p`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${(props) => props.theme.white};

    margin-top: 20px;

    @media ${device.mobile} {
        font-size: 14px;
    }
    @media ${device.tablet} {
        font-size: 16px;
    }
`

// User Instagram
type IUserProfileInstagramContainer = {
    disabled: boolean
}
export const UserProfileInstagramContainer = styled.a<IUserProfileInstagramContainer>`
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;

    margin-top: 20px;

    ${(props) => {
        if (props.disabled) {
            return css`
                pointer-events: none;
            `
        }
    }}
`
export const UserProfileInstagramIconImg = styled.img`
    margin-right: 8px;
`

export const UserProfileInstagram = styled.p`
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${(props) => props.theme.white};
`

//
export const UserProfileContentBodyContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`

// Buttons
export const UserProfileBannerEditButton = styled(CustomButton)`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    color: ${(props) => props.theme.white};
    background-color: transparent;
    border-color: ${(props) => props.theme.white};
    :hover {
        background-color: transparent;
        border-color: ${(props) => props.theme.white};
    }

    @media ${device.mobile} {
        width: 48px;
        height: 48px;
        right: 40px;
        top: 40px;
    }
    @media ${device.tablet} {
        width: auto;
        height: auto;
        right: 24px;
        top: 24px;
    }
    @media ${device.laptop} {
        right: 40px;
        top: 40px;
    }
`

export const UserProfileBannerPencilButton = styled(CustomIconButton)`
    min-width: 32px !important;
    width: 32px;
    height: 32px;
    padding: 4px;

    span {
        width: fit-content;
    }

    color: ${(props) => props.theme.white};
    background-color: transparent;
    border-color: ${(props) => props.theme.white};
    :hover {
        background-color: transparent;
        border-color: ${(props) => props.theme.white};
    }
`

export const UserProfileBannerEditIcon = styled(MuiEditIcon)`
    width: 18px;
    height: 18px;
    color: white;
`
