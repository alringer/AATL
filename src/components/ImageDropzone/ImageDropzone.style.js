import zIndices from 'style/zIndices'
import styled from 'styled-components'

const verticalPadding = '20px'
const horizontalPadding = '15px'

export const ImageDropzoneSection = styled.section`
    width: 100%;
    position: relative;
`

export const ImageDropzoneContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 132px;
    padding: ${verticalPadding} ${horizontalPadding};
    cursor: pointer;

    border-radius: 4px;
    border: solid 2px ${(props) => props.theme.white};
    color: ${(props) => props.theme.white};

    position: relative;
    z-index: ${zIndices.recommendationEditorContainer};
`

export const ImageDropzoneBackgroundContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    z-index: ${zIndices.recommendationEditorBackground};

    ::after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        content: '';
        background-color: rgba(0,0,0,0.21);
        z-index: ${zIndices.recommendationEditorBackgroundOverlay};
    }
`

export const ImageDropzoneBackgroundImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const ImageDropzoneIconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 57px;
    height: 57px;
    z-index: inherit;
    border-radius: 50%;
    padding: 5px;

    transition: ${props => props.theme.transition};
    color: ${props => props.theme.white};
    border: none;
    :hover {
        color: ${props => props.theme.mushroom};
        border: 2px dotted ${props => props.theme.white};
    }

    svg {
        width: 42px;
        height: 42px;
    }
`

export const ImageDropzoneFileInformationContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;

    position: absolute;
    bottom: ${verticalPadding};
    left: ${horizontalPadding};
    z-index: inherit;
`

export const ImageDropzoneFileInformationColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10px;
`

export const ImageDropzoneFileInformationText = styled.p`
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.2;
    letter-spacing: normal;
    color: ${(props) => props.theme.white};
`

export const ImageDropzoneFileErrorText = styled.p`
    color: red;
`