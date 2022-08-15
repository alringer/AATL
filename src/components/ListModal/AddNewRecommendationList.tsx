import { AxiosResponse } from 'axios'
import ImageDropzone from 'components/ImageDropzone/ImageDropzone'
import {
    ArrowBackIcon,
    CancelButton,
    ListModalFooterContainer,
    ListModalFooterLeftContainer,
    ListModalFooterRightContainer,
    ListModalHeaderContainer,
    ListModalHeaderText,
    ListModalInput,
    ListModalInputRowContainer,
    ListModalMainAreaContainer,
    ListModalMainContentContainer,
    ListModalNavigationButton,
    ListModalTitleText,
    SubmitButton,
} from 'components/ListModal/ListModal.style'
import { PlaceholderContainer, PlaceholderTextBold } from 'components/Search/Search.style'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody, SnackbarOrangeMessage } from 'components/Snackbar/Snackbar.style'
import axios, {
    RECOMMENDATION_LIST_METAS,
    RECOMMENDATION_LIST_SPOTLIGHTED_RECOMMENDATION,
    UPLOAD_BLOB,
} from 'config/AxiosConfig'
import * as D from 'constants/ImageDimensionConstants'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { KeycloakInstance } from 'keycloak-js'
import { useSnackbar } from 'notistack'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { ListModalViewEnum } from 'store/listModal/listModal_types'
import { fetchUser } from 'store/user/user_actions'
import { query } from 'style/device'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'

interface IReduxProps {
    recommendationID: number | null
    fetchUser: (keycloak: KeycloakInstance) => void
}
interface IAddToRecommendationListProps extends IReduxProps, IWithAuthInjectedProps {
    closeModal: () => void
    switchView: (newListModalView: ListModalViewEnum) => void
    recommendationTitle: string
}

const AddToRecommendationList: React.FC<IAddToRecommendationListProps> = ({
    closeModal,
    switchView,
    getTokenConfig,
    recommendationID,
    keycloak,
    fetchUser,
    recommendationTitle,
}) => {
    const InputEnum = {
        title: 'title',
        subTitle: 'subTitle',
        description: 'description',
    }

    const [titleInput, setTitleInput] = React.useState('')
    const [subTitleInput, setSubTitleInput] = React.useState('')
    const [descriptionInput, setDescriptionInput] = React.useState('')
    const [isPostingNewList, setPostingNewList] = React.useState(false)
    // Image Dropzone States
    const [file, setFile] = React.useState(null)
    const [temporaryImageKey, setTemporaryImageKey] = React.useState<string | null>(null)
    const [imagePreviewURL, setImagePreviewURL] = React.useState<string | null>(null)
    const [isUploadingImage, setUploadingImage] = React.useState<boolean>(false)
    const [isImageDimensionImproper, setImageDimensionImproper] = React.useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === InputEnum.title) {
            if (e.target.value) {
                setTitleInput(e.target.value)
            } else {
                setTitleInput('')
            }
        } else if (e.target.id === InputEnum.subTitle) {
            if (e.target.value) {
                setSubTitleInput(e.target.value)
            } else {
                setSubTitleInput('')
            }
        } else if (e.target.id === InputEnum.description) {
            if (e.target.value) {
                setDescriptionInput(e.target.value)
            } else {
                setDescriptionInput('')
            }
        }
    }
    const handleCancel = () => {
        closeModal()
    }
    const handleBackToLists = () => {
        switchView(ListModalViewEnum.AddToRecommendationList)
    }

    const { enqueueSnackbar } = useSnackbar()
    const handleAddRecommendation = () => {
        if (
            recommendationID !== undefined &&
            recommendationID !== null &&
            titleInput &&
            subTitleInput &&
            descriptionInput &&
            temporaryImageKey
        ) {
            const createNewRecommendationListPayload = {
                title: titleInput,
                subtitle: subTitleInput,
                summary: descriptionInput,
                temporaryImageKey: temporaryImageKey,
            }
            const token = getTokenConfig()
            const config = {
                headers: {
                    Authorization: getTokenConfig(),
                },
            }
            if (token) {
                setPostingNewList(true)
                axios
                    .post(RECOMMENDATION_LIST_METAS, createNewRecommendationListPayload, config)
                    .then((res) => {
                        const newRecommendationListMetaID = res.data.id
                        axios
                            .post(
                                RECOMMENDATION_LIST_SPOTLIGHTED_RECOMMENDATION(
                                    newRecommendationListMetaID,
                                    recommendationID
                                ),
                                {},
                                config
                            )
                            .then((res) => {
                                fetchUser(keycloak)
                                enqueueSnackbar('', {
                                    content: (
                                        <div>
                                            <Snackbar
                                                type={B.ADDED_TO_LIST.Type}
                                                title={B.ADDED_TO_LIST.Title}
                                                message={
                                                    <SnackbarMessageBody>
                                                        <SnackbarOrangeMessage>
                                                            {recommendationTitle}
                                                        </SnackbarOrangeMessage>
                                                        &nbsp;{B.ADDED_TO_LIST.Body}&nbsp;
                                                        <SnackbarOrangeMessage>{res.data.title}</SnackbarOrangeMessage>
                                                    </SnackbarMessageBody>
                                                }
                                            />
                                        </div>
                                    ),
                                })
                                closeModal()
                            })
                            .catch((err) => console.log(err))
                    })
                    .catch((err) => console.log(err))
                    .finally(() => {
                        setPostingNewList(false)
                    })
            }
        }
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

    return (
        <>
            <ListModalHeaderContainer>
                <ListModalHeaderText>{S.LIST_MODAL.AddNewRecommendationList.Header}</ListModalHeaderText>
            </ListModalHeaderContainer>
            <ListModalMainAreaContainer>
                <ListModalTitleText>{S.LIST_MODAL.AddNewRecommendationList.Title}</ListModalTitleText>
                <ListModalMainContentContainer>
                    <ListModalInputRowContainer>
                        <ImageDropzone
                            file={file}
                            preview={imagePreviewURL}
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
                            value={titleInput}
                            onChange={handleChange}
                            variant="outlined"
                            label={
                                titleInput === '' ? (
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
                            value={subTitleInput}
                            placeholder="Subtitle"
                            onChange={handleChange}
                            variant="outlined"
                            label={
                                subTitleInput === '' ? (
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
                            value={descriptionInput}
                            placeholder="Description"
                            onChange={handleChange}
                            variant="outlined"
                            label={
                                descriptionInput === '' ? (
                                    <PlaceholderContainer>
                                        <PlaceholderTextBold>{S.INPUT_PLACEHOLDERS.Description}</PlaceholderTextBold>
                                    </PlaceholderContainer>
                                ) : null
                            }
                            InputLabelProps={{ shrink: false }}
                        />
                    </ListModalInputRowContainer>
                    {/* <ListModalInputRowContainer>
                        <ListModalMessage>{S.LIST_MODAL.AddNewRecommendationList.Message}</ListModalMessage>
                    </ListModalInputRowContainer> */}
                </ListModalMainContentContainer>
            </ListModalMainAreaContainer>
            <ListModalFooterContainer>
                <Media queries={query} defaultMatches={{ mobile: true }}>
                    {(matches) => (
                        <>
                            {(matches.laptop || matches.tablet) && (
                                <ListModalFooterLeftContainer>
                                    <ListModalNavigationButton onClick={handleBackToLists}>
                                        <ArrowBackIcon />
                                        {S.BUTTON_LABELS.BackToLists}
                                    </ListModalNavigationButton>
                                </ListModalFooterLeftContainer>
                            )}
                        </>
                    )}
                </Media>
                <ListModalFooterRightContainer>
                    <CancelButton onClick={handleCancel}>{S.BUTTON_LABELS.Cancel}</CancelButton>
                    <SubmitButton
                        onClick={handleAddRecommendation}
                        disabled={
                            !titleInput ||
                            !subTitleInput ||
                            !descriptionInput ||
                            !temporaryImageKey ||
                            isPostingNewList ||
                            isUploadingImage
                        }
                    >
                        {S.BUTTON_LABELS.Add}
                    </SubmitButton>
                </ListModalFooterRightContainer>
            </ListModalFooterContainer>
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    recommendationID: state.listModalReducer.recommendationID,
    recommendationTitle: state.listModalReducer.recommendationTitle,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            fetchUser,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(AddToRecommendationList))
