import zIndices from 'style/zIndices'
import styled from 'styled-components'

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
    border-radius: 50%;
    border: solid 4px ${props => props.theme.white};
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
    padding: 27px;
    border-radius: 50%;
    
    z-index: ${zIndices.userProfileDropzoneHover};

    :hover {
        background-color: rgba(0,0,0,0.5);
    }
`

export const UserProfileBannerCameraImage = styled.img``