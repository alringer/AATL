import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import CloseIcon from '@material-ui/icons/Close'
import { CustomButton } from 'style/Button/Button.style'
import { CustomIconButton } from 'style/Button/IconButton.style'
import { TextLink } from 'style/Button/TextLink.style'
import { ContentWrapper } from 'style/ContentWrapper/ContentWrapper'
import { device } from 'style/device'
import zIndices from 'style/zIndices'
import styled, { css } from 'styled-components'

export const mobileFixedYPadding = '12px'
export const mobileFixedXPadding = '16px'
export const paddingRight = '50px'

// Header
export const RecommendationModalHeaderContainer = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-end;
    z-index: ${zIndices.recommendationEditorHeader};

    @media ${device.mobile} {
        padding: ${mobileFixedYPadding} ${mobileFixedXPadding};
    }
    @media ${device.tablet} {
        padding: 24px;
    }
    @media ${device.laptop} {
    }
`

export const RecommendationModalHeaderButton = styled(CustomButton)`
    padding: 12px;
    border-radius: 50%;

    ::after {
        border-radius: 50%;
    }
`

export const RecommendationModalCloseButton = styled(RecommendationModalHeaderButton)`
    background-color: rgba(24, 26, 34, 0.96);
    backdrop-filter: blur(10px);

    :hover {
        background-color: rgba(24, 26, 34, 0.96);
        backdrop-filter: blur(10px);
    }

    margin-bottom: 20px;
`
export const RecommendationModalTipsButton = styled(RecommendationModalHeaderButton)`
    background-color: ${(props) => props.theme.mushroom};
    backdrop-filter: blur(10px);

    :hover {
        background-color: ${(props) => props.theme.mushroom};
        backdrop-filter: blur(10px);
    }
`

// Shared
export const RecommendationModalContainer = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    color: ${(props) => props.theme.charcoalGrey};
    background-color: ${(props) => props.theme.white};

    padding: 0 20px 24px;
`

export const RecommendationModalContentContainer = styled(ContentWrapper)`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
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
    color: ${(props) => props.theme.charcoalGrey};

    align-self: center;
    @media ${device.mobile} {
        font-size: 24px;
    }
    @media ${device.tablet} {
        font-size: 36px;
    }

    margin-bottom: 52px;
`

export const RecommendationEditorRowContainer = styled.div`
    width: 100%;
    position: relative;
    display: flex;

    margin-bottom: 70px;

    ${(props) => {
        if (props.id === 'recommendation-description') {
            return css`
                margin-bottom: 50px;
            `
        }
    }}

    @media ${device.mobile} {
        flex-direction: column;
        padding: 5px 0 5px 8px;
        align-items: flex-start;
        border-left: solid 1px ${(props) => props.theme.pinkishTan};
    }
    @media ${device.tablet} {
        flex-direction: column;
        padding: 12px 0 12px 20px;
        align-items: flex-start;
        border-left: solid 1px ${(props) => props.theme.pinkishTan};
    }
    @media ${device.laptop} {
        flex-direction: row;
        padding: 24px 0px;
        align-items: center;
        border-left: none;
    }
`

export const RecommendationEditorInputLabelContainer = styled.div`
    display: flex;
    align-items: center;

    @media ${device.mobile} {
        flex-direction: row;
        width: 100%;
        margin-right: 0;
        padding-right: 0;
        margin-bottom: 10px;
        align-items: flex-start;
        justify-content: space-between;
    }
    @media ${device.tablet} {
    }
    @media ${device.laptop} {
        width: 50px;
        flex-direction: column;
        margin-right: 20px;
        padding-right: 20px;
        margin-bottom: 0;
        align-items: flex-end;
    }
`

export const RecommendationEditorInputLabelText = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: right;
    color: ${(props) => props.theme.charcoalGrey};
`

export const CurrentTextLength = styled(RecommendationEditorInputLabelText)`
    color: ${(props) => props.theme.darkGreyOpaque};
    ${(props) => {
        if (props.id === 'capped') {
            return css`
                color: ${(props) => props.theme.mushroom};
            `
        }
    }}
`
export const MaxTextLength = styled(RecommendationEditorInputLabelText)`
    color: ${(props) => props.theme.mushroom};
`

export const RecommendationEditorInputContainer = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    width: 100%;

    @media ${device.tablet} {
        border-left: none;
        padding-left: 0;
        padding-top: 0;
        padding-bottom: 0;
    }
    @media ${device.laptop} {
        border-left: solid 1px ${(props) => props.theme.pinkishTan};
        padding-left: 20px;
        padding-top: 12px;
        padding-bottom: 12px;
    }
`

export const RecommendationEditorImageDeleteButton = styled(CustomIconButton)`
    position: absolute;
    top: 0;
    right: 0;

    border-radius: 50%;
    border-color: ${(props) => props.theme.mushroom};
    color: ${(props) => props.theme.mushroom};

    padding: 5px;

    && {
        min-width: 0;

        ::after {
            border-radius: 50%;
        }
    }
`

export const RecommendationEditorImageDeleteCloseIcon = styled(CloseIcon)`
    color: ${(props) => props.theme.mushroom};
    width: 12px;
    height: 12px;
`

export const RecommendationEditorTextField = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    resize: none;
    color: ${(props) => props.theme.charcoalGrey};
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;

    overflow: hidden;

    :focus {
        outline: none;
    }
`

export const RecommendationEditorTitleTextArea = styled(RecommendationEditorTextField)`
    font-weight: 500;
    line-height: 1.31;

    ::placeholder {
        opacity: 0.2;
    }

    @media ${device.mobile} {
        font-size: 14px;
    }
    @media ${device.tablet} {
        font-size: 42px;
    }
    @media ${device.laptop} {
        font-size: 52px;
    }
`

export const RecommendationEditorDescriptionTextArea = styled(RecommendationEditorTextField)`
    font-weight: normal;
    line-height: 1.38;

    ::placeholder {
        opacity: 0.3;
    }

    @media ${device.mobile} {
        font-size: 14px;
    }
    @media ${device.tablet} {
        font-size: 16px;
    }
`

export const RecommendationEditorPublishButton = styled(CustomButton)`
    align-self: center;

    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.darkSlateBlue};
    :hover {
        background-color: ${(props) => props.theme.darkSlateBlue};
    }

    @media ${device.mobile} {
        margin-bottom: 14px;
    }
    @media ${device.tablet} {
    }
    @media ${device.laptop} {
        margin-bottom: 100px;
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
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: normal;
    text-align: center;
    color: ${(props) => props.theme.charcoalGrey};

    @media ${device.mobile} {
        font-size: 24px;
    }
    @media ${device.tablet} {
        font-size: 36px;
    }

    margin-bottom: 30px;
`
export const RecommendationEditorPublishedPreviewTitle = styled.p`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    text-align: center;
    color: rgba(54, 57, 64, 0.4);

    margin-bottom: 20px;

    @media ${device.mobile} {
        font-size: 16px;
    }
    @media ${device.tablet} {
        font-size: 18px;
    }
`
export const RecommendationEditorPublishedBody = styled.p`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: center;
    color: ${(props) => props.theme.charcoalGrey};

    margin-bottom: 20px;

    @media ${device.mobile} {
        font-size: 14px;
    }
    @media ${device.tablet} {
        font-size: 16px;
    }
`

export const RecommendationEditorCopyRecommendationButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
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

// Read our guidelines
export const RecommendationModalReadOurGuidelinesContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    @media ${device.mobile} {
        position: relative;
        justify-content: center;
    }
    @media ${device.laptop} {
        position: absolute;
        justify-content: flex-end;
        bottom: 20px;
        right: ${paddingRight};
        margin-top: 0px;
    }
`

export const RecommendationEditorReadOurGuidelines = styled(TextLink)`
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    text-align: right;
    color: ${(props) => props.theme.mushroom};
`

// Tips
export const TipsContainer = styled.div`
    @media ${device.mobile} {
        position: fixed;
        bottom: ${mobileFixedYPadding};
        right: ${mobileFixedXPadding};
    }
    @media ${device.tablet} {
        position: relative;
        bottom: 0;
        right: 0;
    }
    @media ${device.laptop} {
    }
`

export const TipsToggledContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 280px;

    border-radius: 4px;
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1);
    background-color: #efe6e1;
    padding: 30px;

    /* @media ${device.mobile} {
    }
    @media ${device.tablet} {
    }
    @media ${device.laptop} {} */
`

export const TipsHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 5px;
`

export const TipsHR = styled.hr`
    width: 60px;
    height: 2px;
    color: ${(props) => props.theme.mushroom};

    margin-bottom: 10px;
`

// Tips Text
export const TipsTitle = styled.p`
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    color: ${(props) => props.theme.charcoalGrey};

    margin-bottom: 10px;
`
export const TipsDescription = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${(props) => props.theme.charcoalGrey};

    margin-bottom: 20px;
`
export const TipsMoreButton = styled(CustomButton)`
    color: ${(props) => props.theme.mushroom};
    background-color: ${(props) => props.theme.white};
    border-color: ${(props) => props.theme.darkGreyOpaque};
    :hover {
        border-color: ${(props) => props.theme.darkGreyOpaque};
    }
`

export const TipsCloseButton = styled(CustomIconButton)`
    border-radius: 50%;
    border-color: ${(props) => props.theme.mushroom};
    color: ${(props) => props.theme.mushroom};

    min-width: 0px !important;
    width: 24px;
    height: 24px;
    padding: 0;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    svg {
        transform: translateY(-1px);
    }

    ::after {
        border-radius: 50%;
    }
`

export const RecommendationPublishedButtonAnchor = styled.a`
    text-decoration: none;
`

export const RecommendationEditorForkContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 24px;
    height: 24px;

    margin-right: 10px;

    cursor: pointer;
`

export const RecommendationEditorForkMessageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    margin-left: 10px;
`
export const RecommendationEditorForkMessage = styled.p`
    font-family: 'Rubik', sans-serif;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: #363940;
`
