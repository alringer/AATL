import { device } from 'style/device'
import zIndices from 'style/zIndices'
import styled, { css } from 'styled-components'

export const UserProfileImageDropzoneSection = styled.section`
    width: 100%;
    height: 100%;
    position: relative;
`

export const UserProfileImageDropzoneContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.darkSlateBlue};
    cursor: pointer;
    overflow: hidden;

    ::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: inherit;
        z-index: ${zIndices.userProfileDropzone};
    }

    :hover {
        ::after {
            background-color: rgba(0,0,0,0.3);
        }
    }

    ${props => {
        if (props.id === 'uploading') {
            return css`
                ::after {
                    background-color: rgba(0,0,0,0.3);
                }
            `
        }
    }}
`

export const UserProfileBannerImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const UserProfileBannerCameraImageContainer = styled.div`
    position: absolute;
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%);
    border-radius: 50%;
    
    z-index: ${zIndices.userProfileDropzoneHover};

    :hover {
        background-color: rgba(0,0,0,0.5);
    }

    @media ${device.mobile} {
        padding: 10px;
    }
    @media ${device.tablet} {
        padding: 27px;
    }
`

export const UserProfileBannerLoadingImageContainer = styled.div`
    position: absolute;
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%);
    /* border-radius: 50%; */
    
    z-index: ${zIndices.userProfileDropzoneHover};
`

export const UserProfileBannerCameraImage = styled.img`
    @media ${device.mobile} {
        width: 18px;
        height: 18px;
    }
    @media ${device.tablet} {
        width: auto;
        height: auto;
    }
`