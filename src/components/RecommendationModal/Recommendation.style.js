import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { CustomButton } from 'style/Button/Button.style'
import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { device } from 'style/device'
import styled, { css } from 'styled-components'

// Shared
export const RecommendationModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${props => props.theme.charcoalGrey};
    background-color: ${props => props.theme.white};
`

export const RecommendationModalHeaderContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;

    @media ${device.mobile} {
        padding: 12px 16px;
        justify-content: space-between;
    }
    @media ${device.tablet} {
        padding: 48px;
        justify-content: flex-end;
    }
    @media ${device.laptop} {
        
    }
`

export const RecommendationModalContentContainer = styled(ContentWrapper)`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 50px;
`

// Recommendation Editor
export const RecommendationEditorContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`
export const RecommendationEditorTitle = styled.p`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.charcoalGrey};

    align-self: center;
    @media ${device.mobile} {
        /* TODO: Change to proper font-size */
        font-size: 36px;
    }
    @media ${device.tablet} {
        font-size: 36px;
    }
    @media ${device.laptop} {
        
    }

    margin-bottom: 52px;
`

export const RecommendationEditorRowContainer = styled.div`
    width: 100%;
    position: relative;

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 24px 0px;

    margin-bottom: 70px;

    ${props => {
        if (props.id === 'recommendation-description') {
            return css`
                margin-bottom: 50px;
            `
        } 
    }}
`

export const RecommendationEditorInputLabelContainer = styled.div`
    /* height: 100%;
    left: -50px;
    position: absolute; */
    width: 50px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 20px;
    align-items: center;
    
    margin-right: 20px;
`

export const RecommendationEditorInputContainer = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    /* Remove min-height once content gets populated, since content will have min-height */
    /* min-height: 100px; */

    border-left: solid 1px ${props => props.theme.pinkishTan};
    padding-left: 20px;
`

export const RecommendationEditorTextField = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    resize: none;
    color: ${props => props.theme.charcoalGrey};
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;

    overflow: hidden;

    :focus {
        outline: none;
    }
`

export const RecommendationEditorTitleTextArea = styled(RecommendationEditorTextField)`
    font-size: 52px;
    font-weight: 500;
    line-height: 1.31;

    ::placeholder {
        opacity: 0.2;
    }
`

export const RecommendationEditorDescriptionTextArea = styled(RecommendationEditorTextField)`
    font-size: 16px;
    font-weight: normal;
    line-height: 1.38;

    ::placeholder {
        opacity: 0.3;
    }
`

export const RecommendationEditorPublishButton = styled(CustomButton)`
    align-self: center;

    color: ${props => props.theme.white};
    background-color: ${props => props.theme.darkSlateBlue};
    :hover {
        background-color: ${props => props.theme.darkSlateBlue};
    }

    :disabled {
        color: ${props => props.theme.white};
        background-color: #e1e1e1;
    }
`

// Recommendation Published
export const RecommendationPublishedContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

export const RecommendationPublishedContentContainer = styled(ContentWrapper)`
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const RecommendationEditorPublishedTitle = styled.p`
    font-size: 36px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.charcoalGrey};

    margin-bottom: 30px;
`
export const RecommendationEditorPublishedPreviewTitle = styled.p`
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    text-align: center;
    color: rgba(54, 57, 64, 0.4);

    margin-bottom: 20px;
`
export const RecommendationEditorPublishedBody = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.charcoalGrey};

    margin-bottom: 20px;
`

export const RecommendationEditorCopyRecommendationButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction:row;
    justify-content: center;
    align-items: center;
`

export const RecommendationEditorCopyRecommendationButton = styled(CustomButton)`
    align-self: center;

    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.dustyOrange};
    :hover {
        background-color: ${(props) => props.theme.dustyOrange};
    }

    margin-top: 20px;
`
