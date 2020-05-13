import ImageDropzone from 'components/ImageDropzone/ImageDropzone'
import * as S from 'constants/StringConstants'
import React from 'react'
import { RecommendationEditorContainer, RecommendationEditorDescriptionTextArea, RecommendationEditorInputContainer, RecommendationEditorInputLabelContainer, RecommendationEditorInputLabelText, RecommendationEditorPublishButton, RecommendationEditorReadOurGuidelines, RecommendationEditorRowContainer, RecommendationEditorTitle, RecommendationEditorTitleTextArea, RecommendationModalReadOurGuidelinesContainer } from './RecommendationModal.style'

interface IRecommendationEditorProps {
    isLoading: boolean
    placeName: string
    handlePublish: (title: string, description: string, file: File) => void
    handleReadOurGuidelines: () => void
}

const RecommendationEditor: React.FC<IRecommendationEditorProps> = ({
    placeName,
    handlePublish,
    isLoading,
    handleReadOurGuidelines,
}) => {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [file, setFile] = React.useState()

    const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(String(e.target.value))
    }
    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(String(e.target.value))
    }

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            acceptedFiles.forEach((file) => {
                const reader = new FileReader()

                reader.onabort = () => console.log('file reading was aborted')
                reader.onerror = () => console.log('file reading has failed')
                reader.onload = () => {
                    // Do whatever you want with the file contents
                    const binaryStr = reader.result
                    // console.log(binaryStr)
                }
                reader.readAsArrayBuffer(file)
            })
            setFile(acceptedFiles[0])
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
                    <ImageDropzone file={file} onDrop={handleDrop} />
                </RecommendationEditorInputContainer>
            </RecommendationEditorRowContainer>
            <RecommendationEditorRowContainer id="recommendation-title">
                <RecommendationEditorInputLabelContainer>
                    <RecommendationEditorInputLabelText>
                        {S.RECOMMENDATION_EDITOR.LabelTitle}
                    </RecommendationEditorInputLabelText>
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
            <RecommendationEditorPublishButton
                onClick={() => handlePublish(title, description, file)}
                disabled={title === '' || description === '' || !file || isLoading}
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

export default RecommendationEditor
