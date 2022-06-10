import EmptyFork from 'assets/icon-empty-ic-fork-rating.svg'
import FilledFork from 'assets/icon-filled-ic-fork-rating.svg'
import { AxiosResponse } from 'axios'
import SVGImage from 'components/Image/Image'
import ImageDropzone from 'components/ImageDropzone/ImageDropzone'
import axios, { UPLOAD_BLOB } from 'config/AxiosConfig'
import * as D from 'constants/ImageDimensionConstants'
import * as S from 'constants/StringConstants'
import React from 'react'
import authStore from 'store/authentication/authentication_reducer'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import {
    CurrentTextLength,
    MaxTextLength,
    RecommendationEditorContainer,
    RecommendationEditorDescriptionTextArea,
    RecommendationEditorForkContainer,
    RecommendationEditorInputContainer,
    RecommendationEditorInputLabelContainer,
    RecommendationEditorInputLabelText,
    RecommendationEditorPublishButton,
    RecommendationEditorReadOurGuidelines,
    RecommendationEditorRowContainer,
    RecommendationEditorTitle,
    RecommendationEditorTitleTextArea,
    RecommendationModalReadOurGuidelinesContainer,
} from './RecommendationModal.style'

interface IRecommendationEditorProps extends IWithAuthInjectedProps {
    isLoading: boolean
    placeName: string
    handlePublish: (title: string, description: string, temporaryImageKey: string) => void
    handleReadOurGuidelines: () => void
}

const RecommendationEditor: React.FC<IRecommendationEditorProps> = ({
    placeName,
    handlePublish,
    isLoading,
    handleReadOurGuidelines,
    getTokenConfig,
}) => {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [rating, setRating] = React.useState(3)
    const [previewRating, setPreviewRating] = React.useState(null)
    const [file, setFile] = React.useState()
    const [temporaryImageKey, setTemporaryImageKey] = React.useState()
    const [imagePreviewURL, setImagePreviewURL] = React.useState()
    const [isUploadingImage, setUploadingImage] = React.useState(false)
    const [isImageDimensionImproper, setImageDimensionImproper] = React.useState(false)

    const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= 150) {
            setTitle(String(e.target.value))
        }
    }
    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(String(e.target.value))
    }

    const handleDrag = () => {
        setImageDimensionImproper(false)
    }

    const handleDrop = (acceptedFiles) => {
        setFile(undefined)
        setTemporaryImageKey(undefined)
        setImagePreviewURL(undefined)
        if (acceptedFiles && acceptedFiles.length > 0) {
            acceptedFiles.forEach((file) => {
                const image = new Image()
                image.addEventListener('load', () => {
                    // only select images within width/height limits
                    if (image.width >= D.WIDTH_LIMIT && image.height >= D.HEIGHT_LIMIT) {
                        setImageDimensionImproper(false)
                        const formData = new FormData()
                        formData.append('file', file)
                        const config =
                            authStore.getState().keycloak && authStore.getState().keycloak.token
                                ? {
                                      headers: {
                                          'content-type': 'multipart/form-data',
                                          Authorization: getTokenConfig(),
                                      },
                                  }
                                : {
                                      headers: {
                                          'content-type': 'multipart/form-data',
                                      },
                                  }
                        setUploadingImage(true)
                        axios
                            .post(UPLOAD_BLOB, formData, config)
                            .then((res: AxiosResponse<any>) => {
                                setTemporaryImageKey(res.data.key)
                                setImagePreviewURL(res.data.url)
                            })
                            .catch((err) => console.log(err))
                            .finally(() => {
                                setUploadingImage(false)
                            })
                        const reader = new FileReader()

                        reader.onabort = () => console.log('file reading was aborted')
                        reader.onerror = () => console.log('file reading has failed')
                        reader.onload = () => {
                            // Do whatever you want with the file contents
                            const binaryStr = reader.result
                        }
                        reader.readAsArrayBuffer(file)
                    } else {
                        // Set Image error
                        setImageDimensionImproper(true)
                    }
                })
                image.src = URL.createObjectURL(file)
            })
            setFile(acceptedFiles[0])
        }
    }

    const handleHoverFork = (forkID: number) => {
        if (forkID === 5) {
            setPreviewRating(5)
        } else if (forkID === 4) {
            setPreviewRating(4)
        } else {
            setPreviewRating(3)
        }
    }

    const handleMouseLeave = () => {
        setPreviewRating(null)
    }
    const handleClickFork = (forkID: number) => {
        if (forkID === 5) {
            setRating(5)
        } else if (forkID === 4) {
            setRating(4)
        } else {
            setRating(3)
        }
    }

    return (
        <RecommendationEditorContainer>
            <RecommendationEditorTitle>
                {S.RECOMMENDATION_EDITOR.Title} {placeName}
            </RecommendationEditorTitle>
            <RecommendationEditorRowContainer id="recommendation-image">
                <RecommendationEditorInputLabelContainer>
                    <RecommendationEditorInputLabelText>
                        {S.RECOMMENDATION_EDITOR.LabelImage}
                    </RecommendationEditorInputLabelText>
                </RecommendationEditorInputLabelContainer>
                <RecommendationEditorInputContainer>
                    <ImageDropzone
                        file={file}
                        preview={imagePreviewURL}
                        handleDrop={handleDrop}
                        handleDrag={handleDrag}
                        isUploadingImage={isUploadingImage}
                        isImageDimensionImproper={isImageDimensionImproper}
                        tooltipMessage={S.IMAGE_DROPZONE.ToolTipRecommendation}
                    />
                </RecommendationEditorInputContainer>
            </RecommendationEditorRowContainer>
            <RecommendationEditorRowContainer id="recommendation-title">
                <RecommendationEditorInputLabelContainer>
                    <RecommendationEditorInputLabelText>
                        {S.RECOMMENDATION_EDITOR.LabelTitle}
                    </RecommendationEditorInputLabelText>
                    <div style={{ display: 'flex' }}>
                        <CurrentTextLength id={title.length < 150 ? '' : 'capped'}>{title.length}</CurrentTextLength>
                        <MaxTextLength>{S.RECOMMENDATION_EDITOR.MaxLength}</MaxTextLength>
                    </div>
                </RecommendationEditorInputLabelContainer>
                <RecommendationEditorInputContainer>
                    <RecommendationEditorTitleTextArea
                        value={title}
                        onChange={handleChangeTitle}
                        placeholder={S.RECOMMENDATION_EDITOR.PlaceholderTitle}
                        wrap="soft"
                    />
                </RecommendationEditorInputContainer>
            </RecommendationEditorRowContainer>
            <RecommendationEditorRowContainer id="recommendation-description">
                <RecommendationEditorInputLabelContainer>
                    <RecommendationEditorInputLabelText>
                        {S.RECOMMENDATION_EDITOR.LabelDescription}
                    </RecommendationEditorInputLabelText>
                </RecommendationEditorInputLabelContainer>
                <RecommendationEditorInputContainer>
                    <RecommendationEditorDescriptionTextArea
                        value={description}
                        onChange={handleChangeDescription}
                        placeholder={S.RECOMMENDATION_EDITOR.PlaceholderDescription}
                        wrap="soft"
                    />
                </RecommendationEditorInputContainer>
            </RecommendationEditorRowContainer>
            <RecommendationEditorRowContainer id="recommendation-rating">
                <RecommendationEditorInputLabelContainer>
                    <RecommendationEditorInputLabelText>
                        {S.RECOMMENDATION_EDITOR.LabelRating}
                    </RecommendationEditorInputLabelText>
                </RecommendationEditorInputLabelContainer>
                <RecommendationEditorInputContainer>
                    <RecommendationEditorForkContainer
                        id="fork-1"
                        onMouseEnter={() => handleHoverFork(1)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClickFork(1)}
                    >
                        {(previewRating && previewRating <= 3) || rating <= 3 ? (
                            <SVGImage src={FilledFork} alt="filled-fork" />
                        ) : (
                            <SVGImage src={EmptyFork} alt="filled-fork" />
                        )}
                    </RecommendationEditorForkContainer>
                    <RecommendationEditorForkContainer
                        id="fork-2"
                        onMouseEnter={() => handleHoverFork(2)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClickFork(2)}
                    >
                        {(previewRating && previewRating <= 3) || rating <= 3 ? (
                            <SVGImage src={FilledFork} alt="filled-fork" />
                        ) : (
                            <SVGImage src={EmptyFork} alt="filled-fork" />
                        )}
                    </RecommendationEditorForkContainer>
                    <RecommendationEditorForkContainer
                        id="fork-3"
                        onMouseEnter={() => handleHoverFork(3)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClickFork(3)}
                    >
                        {(previewRating && previewRating <= 3) || rating <= 3 ? (
                            <SVGImage src={FilledFork} alt="filled-fork" />
                        ) : (
                            <SVGImage src={EmptyFork} alt="filled-fork" />
                        )}
                    </RecommendationEditorForkContainer>
                    <RecommendationEditorForkContainer
                        id="fork-4"
                        onMouseEnter={() => handleHoverFork(4)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClickFork(4)}
                    >
                        {(previewRating && previewRating <= 4) || rating <= 4 ? (
                            <SVGImage src={FilledFork} alt="filled-fork" />
                        ) : (
                            <SVGImage src={EmptyFork} alt="filled-fork" />
                        )}
                    </RecommendationEditorForkContainer>
                    <RecommendationEditorForkContainer
                        id="fork-5"
                        onMouseEnter={() => handleHoverFork(5)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClickFork(5)}
                    >
                        {(previewRating && previewRating <= 5) || rating <= 5 ? (
                            <SVGImage src={FilledFork} alt="filled-fork" />
                        ) : (
                            <SVGImage src={EmptyFork} alt="filled-fork" />
                        )}
                    </RecommendationEditorForkContainer>
                </RecommendationEditorInputContainer>
            </RecommendationEditorRowContainer>
            <RecommendationEditorPublishButton
                onClick={() => handlePublish(title, description, temporaryImageKey, rating)}
                disabled={title === '' || description === '' || !file || isLoading || !temporaryImageKey}
            >
                {S.BUTTON_LABELS.PublishRecommendation}
            </RecommendationEditorPublishButton>
            <RecommendationModalReadOurGuidelinesContainer>
                <RecommendationEditorReadOurGuidelines onClick={handleReadOurGuidelines}>
                    {S.BUTTON_LABELS.ReadOurGuidelines}
                </RecommendationEditorReadOurGuidelines>
            </RecommendationModalReadOurGuidelinesContainer>
        </RecommendationEditorContainer>
    )
}

export default withAuth(RecommendationEditor)
