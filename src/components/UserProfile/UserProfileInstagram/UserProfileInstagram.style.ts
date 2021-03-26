import { CustomButton } from 'style/Button/Button.style'
import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { device } from 'style/device'
import styled, { css } from 'styled-components'

export const UserProfileInstagramContainer = styled(ContentWrapper)`
    display: flex;
    flex-direction: column;

    width: 100%;

    @media ${device.tablet} {
        margin-top: 70px;
    }

    @media ${device.laptop} {
        margin-top: 200px;
    }
`

export const UserProfileInstagramTitlesContainer = styled.div`
    display: flex;

    width: 100%;

    @media ${device.tablet} {
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    @media ${device.laptop} {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    margin-bottom: 40px;
`

export const UserProfileInstagramTitle = styled.p`
    font-size: 36px;
    font-weight: 500;
    line-height: 43px;
    color: ${(props) => props.theme.charcoalGrey};

    @media ${device.tablet} {
        margin-bottom: 8px;
    }

    @media ${device.laptop} {
        margin-bottom: 0;
    }
`

export const UserProfileInstagramSubTitle = styled.p`
    font-size: 16px;
    line-height: 22px;
    color: ${(props) => props.theme.charcoalGrey};

    @media ${device.tablet} {
        text-align: center;
    }

    @media ${device.laptop} {
        text-align: right;
    }
`

export const UserProfileInstagramPhotosContainer = styled.div`
    display: flex;
    width: 100%;

    @media ${device.tablet} {
        height: 460px;
    }

    @media ${device.laptop} {
        height: 460px;
    }
`

export const UserProfileInstagramEmptyContainer = styled.div`
    display: flex;
    width: 100%;

    @media ${device.tablet} {
        height: 220px;
    }

    @media ${device.laptop} {
        height: 220px;
    }
`

export const UserProfileInstagramPhoto = styled.img`
    height: 100%;
    flex: 1;
    object-fit: cover;
`

interface UrlProp {
    readonly url?: string
}
export const UserProfileInstagramPhotosColumn = styled.div<UrlProp>`
    position: relative;

    display: flex;
    flex-direction: column;
    height: 100%;

    flex: 1;

    ${(props) => {
        if (props.url) {
            return css`
                background: url(${props.url});
                ::before {
                    position: absolute;
                    content: '';
                    top: 0;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    background-color: rgba(0, 0, 0, 0.25);
                }
            `
        }
    }}
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`

export const UserProfileInstagramPhotosRow = styled.div`
    display: flex;
    flex-direction: row;

    flex: 1;
`

export const UserProfileInstagramPhotoLarge = styled.div<UrlProp>`
    position: relative;

    display: flex;
    flex-direction: row;

    flex: 1;

    ${(props) => {
        if (props.url) {
            return css`
                background: url(${props.url});
                ::before {
                    position: absolute;
                    content: '';
                    top: 0;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    background-color: rgba(0, 0, 0, 0.25);
                }
            `
        }
    }}

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`

export const UserProfileInstagramPhotoSmall = styled(UserProfileInstagramPhotoLarge)`
    flex: 2;
`

export const UserProfilePhotoCaption = styled.div`
    position: absolute;
    width: 100%;

    display: flex;
    flex-direction: column;

    padding-left: 20px;
    padding-right: 20px;

    bottom: 20px;
`

export const UserProfilePhotoTitle = styled.p`
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    color: ${(props) => props.theme.white};

    margin-bottom: 5px;
`
export const UserProfilePhotoDate = styled.p`
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: ${(props) => props.theme.white};
`

export const HRSpacer = styled.div`
    width: 10px;
`

export const VRSpacer = styled.div`
    height: 10px;
`

export const UserProfileInstagramFooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    margin-top: 20px;
`
export const InstagramBroughtToYou = styled.p`
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: ${(props) => props.theme.charcoalGrey};
`

export const InstagramItalic = styled.span`
    font-style: 'italic';
`

export const ViewMoreButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
`

export const ViewMoreButton = styled(CustomButton)`
    color: ${(props) => props.theme.mushroom};
    background-color: ${(props) => props.theme.white};
    border-color: ${(props) => props.theme.darkGreyOpaque};

    :hover {
        background-color: ${(props) => props.theme.white};
        border-color: ${(props) => props.theme.darkGreyOpaque};
    }
`

export const UserProfileInstagramEmpty = styled(UserProfileInstagramPhotosColumn)`
    height: 220px;
    background-color: ${(props) => props.theme.darkSlateBlue};
`

export const UserProfileInstagramEmptyTwo = styled(UserProfileInstagramEmpty)`
    flex: 2;
    background-color: #d9e8ee;
`

export const UserProfileInstagramEmptyThree = styled(UserProfileInstagramEmpty)`
    flex: 1;
    background-color: #e8e8e8;
`
