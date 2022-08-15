import { AxiosResponse } from 'axios'
import ImageDropzone from 'components/ImageDropzone/ImageDropzone'
import { PlaceholderContainer, PlaceholderTextBold, PlaceholderTextNormal } from 'components/Search/Search.style'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import axios, { RECOMMENDATION_LIST_METAS, UPLOAD_BLOB } from 'config/AxiosConfig'
import * as D from 'constants/ImageDimensionConstants'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { useSnackbar } from 'notistack'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store/index'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'
import {
    CancelButton,
    ListModalFooterContainer,
    ListModalFooterRightContainer,
    ListModalHeaderContainer,
    ListModalHeaderText,
    ListModalInput,
    ListModalInputRowContainer,
    ListModalMainAreaContainer,
    ListModalMainContentContainer,
    ListModalTitleText,
    SubmitButton,
} from './ListModal.style'

interface IReduxProps {
    currentRecommendationList: IRecommendationListMeta | null
    onSuccess: () => void
}
interface IEditRecommendationListProps extends IReduxProps, IWithAuthInjectedProps {
    closeModal: () => void
}

const EditRecommendationList: React.FC<IEditRecommendationListProps> = ({
    getTokenConfig,
    closeModal,
    currentRecommendationList,
    onSuccess,
}) => {
    const InputEnum = {
        title: 'title',
        subTitle: 'subTitle',
        description: 'description',
    }

    const { enqueueSnackbar } = useSnackbar()

    const [inputTitle, setInputTitle] = React.useState(
        currentRecommendationList && currentRecommendationList.title ? currentRecommendationList.title : ''
    )
    const [inputSubTitle, setInputSubTitle] = React.useState(
        currentRecommendationList && currentRecommendationList.subtitle ? currentRecommendationList.subtitle : ''
    )
    const [inputDescription, setInputDescription] = React.useState(
        currentRecommendationList && currentRecommendationList.summary ? currentRecommendationList.summary : ''
    )
    const [isLoading, setLoading] = React.useState(false)
    // Image Dropzone States
    const [file, setFile] = React.useState(null)
    const [inputImageCDNURL, setInputImageCDNURL] = React.useState<string | null>(
        currentRecommendationList && currentRecommendationList.imageCDNUrl ? currentRecommendationList.imageCDNUrl : ''
    )
    const [isUploadingImage, setUploadingImage] = React.useState<boolean>(false)
    const [isImageDimensionImproper, setImageDimensionImproper] = React.useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === InputEnum.title) {
            if (e.target.value) {
                setInputTitle(e.target.value)
            } else {
                setInputTitle('')
            }
        } else if (e.target.id === InputEnum.subTitle) {
            if (e.target.value) {
                setInputSubTitle(e.target.value)
            } else {
                setInputSubTitle('')
            }
        } else if (e.target.id === InputEnum.description) {
            if (e.target.value) {
                setInputDescription(e.target.value)
            } else {
                setInputDescription('')
            }
        }
    }

    const handleDrag = () => {
        setImageDimensionImproper(false)
    }

    const handleDrop = (acceptedFiles) => {
        setFile(undefined)
        setInputImageCDNURL(undefined)
        if (acceptedFiles && acceptedFiles.length > 0) {
            acceptedFiles.forEach((file) => {
                const image = new Image()
                image.addEventListener('load', () => {
                    // only select images within width/height limits
                    if (image.width >= D.WIDTH_LIMIT && image.height >= D.HEIGHT_LIMIT) {
                        setImageDimensionImproper(false)
                        const formData = new FormData()
                        formData.append('file', file)
                        const token = getTokenConfig()
                        const config = token
                            ? {
                                  headers: {
                                      'content-type': 'multipart/form-data',
                                      Authorization: token,
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
                                setInputImageCDNURL(res.data.url)
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

    const handleCancel = () => {
        closeModal()
    }
    const handleUpdate = () => {
        if (
            inputTitle &&
            inputSubTitle &&
            inputDescription &&
            inputImageCDNURL &&
            currentRecommendationList &&
            currentRecommendationList.id !== undefined &&
            currentRecommendationList.id !== null
        ) {
            const token = getTokenConfig()
            const config = {
                headers: {
                    Authorization: token,
                },
            }
            setLoading(true)
            const newRecommendationListMetaPayload = {
                id: currentRecommendationList.id,
                title: inputTitle,
                subtitle: inputSubTitle,
                summary: inputDescription,
                imageCDNUrl: inputImageCDNURL,
            }
            axios
                .put(RECOMMENDATION_LIST_METAS, newRecommendationListMetaPayload, config)
                .then((res) => {
                    enqueueSnackbar('', {
                        content: (
                            <div>
                                <Snackbar
                                    type={B.EDITED_LIST.Type}
                                    title={B.EDITED_LIST.Title}
                                    message={<SnackbarMessageBody>{B.EDITED_LIST.Body}</SnackbarMessageBody>}
                                />
                            </div>
                        ),
                    })
                    onSuccess()
                    handleCancel()
                })
                .catch((err) => console.log())
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    return (
        <>
            <ListModalHeaderContainer>
                <ListModalHeaderText>{S.LIST_MODAL.EditRecommendationList.Header}</ListModalHeaderText>
            </ListModalHeaderContainer>
            <ListModalMainAreaContainer>
                <ListModalTitleText>{S.LIST_MODAL.EditRecommendationList.Title}</ListModalTitleText>
                <ListModalMainContentContainer>
                    <ListModalInputRowContainer>
                        <ImageDropzone
                            file={file}
                            preview={inputImageCDNURL}
                            handleDrop={handleDrop}
                            handleDrag={handleDrag}
                            isUploadingImage={isUploadingImage}
                            isImageDimensionImproper={isImageDimensionImproper}
                            tooltipMessage={S.IMAGE_DROPZONE.ToolTipRecommendationList}
                        />
                    </ListModalInputRowContainer>
                    <ListModalInputRowContainer>
                        <ListModalInput
                            id={InputEnum.title}
                            value={inputTitle}
                            onChange={handleChange}
                            variant="outlined"
                            label={
                                inputTitle === '' ? (
                                    <PlaceholderContainer>
                                        <PlaceholderTextBold>{S.INPUT_PLACEHOLDERS.Title}</PlaceholderTextBold>
                                    </PlaceholderContainer>
                                ) : null
                            }
                            InputLabelProps={{ shrink: false }}
                        />
                    </ListModalInputRowContainer>
                    <ListModalInputRowContainer>
                        <ListModalInput
                            id={InputEnum.subTitle}
                            value={inputSubTitle}
                            placeholder="Subtitle"
                            onChange={handleChange}
                            variant="outlined"
                            label={
                                inputSubTitle === '' ? (
                                    <PlaceholderContainer>
                                        <PlaceholderTextBold>{S.INPUT_PLACEHOLDERS.SubTitle}</PlaceholderTextBold>
                                    </PlaceholderContainer>
                                ) : null
                            }
                            InputLabelProps={{ shrink: false }}
                        />
                    </ListModalInputRowContainer>
                    <ListModalInputRowContainer>
                        <ListModalInput
                            id={InputEnum.description}
                            value={inputDescription}
                            placeholder="Description"
                            onChange={handleChange}
                            variant="outlined"
                            label={
                                inputDescription === '' ? (
                                    <PlaceholderContainer>
                                        <PlaceholderTextBold>{S.INPUT_PLACEHOLDERS.Description}</PlaceholderTextBold>{' '}
                                        &nbsp;
                                        <PlaceholderTextNormal>{S.INPUT_PLACEHOLDERS.Optional}</PlaceholderTextNormal>
                                    </PlaceholderContainer>
                                ) : null
                            }
                            InputLabelProps={{ shrink: false }}
                        />
                    </ListModalInputRowContainer>
                    {/* <ListModalInputRowContainer>
                        <ListModalMessage>{S.LIST_MODAL.EditRecommendationList.Message}</ListModalMessage>
                    </ListModalInputRowContainer> */}
                </ListModalMainContentContainer>
            </ListModalMainAreaContainer>
            <ListModalFooterContainer>
                <ListModalFooterRightContainer>
                    <CancelButton onClick={handleCancel}>{S.BUTTON_LABELS.Cancel}</CancelButton>
                    <SubmitButton onClick={handleUpdate} disabled={!inputTitle || isLoading}>
                        {S.BUTTON_LABELS.Update}
                    </SubmitButton>
                </ListModalFooterRightContainer>
            </ListModalFooterContainer>
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    currentRecommendationList: state.listModalReducer.recommendationList,
    onSuccess: state.listModalReducer.onSuccess,
})
export default reduxConnect(mapStateToProps)(withAuth(EditRecommendationList))
