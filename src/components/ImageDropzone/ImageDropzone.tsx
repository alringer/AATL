import { Tooltip } from '@material-ui/core'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import ImageDropzoneDefaultBackground from 'assets/image-dropzone-background.svg'
import * as D from 'constants/ImageDimensionConstants'
import * as S from 'constants/StringConstants'
import React from 'react'
import Dropzone from 'react-dropzone'
import Media from 'react-media'
import { query } from 'style/device'
import {
    ImageDropzoneBackgroundContainer,
    ImageDropzoneBackgroundImg,
    ImageDropzoneContainer,
    ImageDropzoneFileErrorText,
    ImageDropzoneFileInformationColumnContainer,
    ImageDropzoneFileInformationContainer,
    ImageDropzoneFileInformationText,
    ImageDropzoneIconContainer,
    ImageDropzoneSection,
} from './ImageDropzone.style'

interface IImageDropzoneProps {
    file: File
    preview: string
    isUploadingImage: boolean
    isImageDimensionImproper: boolean
    tooltipMessage: string
    handleDrop: (acceptedFile: any) => void
    handleDrag: () => void
}

const ImageDropzone: React.FC<IImageDropzoneProps> = ({
    handleDrop,
    handleDrag,
    file,
    preview,
    isUploadingImage,
    isImageDimensionImproper,
    tooltipMessage,
}) => {
    return (
        <Dropzone
            accept={['image/jpeg', 'image/png']}
            onDrop={handleDrop}
            minSize={0}
            maxSize={5242880}
            multiple={false}
            onDragEnter={handleDrag}
        >
            {({ getRootProps, getInputProps, isDragReject, acceptedFiles }) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                        <ImageDropzoneSection>
                            <ImageDropzoneBackgroundContainer>
                                <ImageDropzoneBackgroundImg
                                    src={
                                        // acceptedFiles && acceptedFiles.length > 0 && acceptedFiles[0]
                                        preview ? preview : ImageDropzoneDefaultBackground
                                        // file ? URL.createObjectURL(file) : ImageDropzoneDefaultBackground
                                    }
                                    alt="image-background-image"
                                />
                            </ImageDropzoneBackgroundContainer>
                            <ImageDropzoneContainer {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Tooltip title={tooltipMessage} placement="top">
                                    <ImageDropzoneIconContainer>
                                        <CameraAltIcon />
                                    </ImageDropzoneIconContainer>
                                </Tooltip>
                                <Media queries={query} defaultMatches={{ mobile: true }}>
                                    {(matches) => (
                                        <>
                                            {(matches.laptop || matches.tablet) && (
                                                <ImageDropzoneFileInformationContainer>
                                                    <ImageDropzoneFileInformationColumnContainer>
                                                        <ImageDropzoneFileInformationText>
                                                            {S.IMAGE_DROPZONE.LabelSupportedFormats}
                                                        </ImageDropzoneFileInformationText>
                                                        <ImageDropzoneFileInformationText>
                                                            {S.IMAGE_DROPZONE.SupportedFormats}
                                                        </ImageDropzoneFileInformationText>
                                                    </ImageDropzoneFileInformationColumnContainer>
                                                    <ImageDropzoneFileInformationColumnContainer>
                                                        <ImageDropzoneFileInformationText>
                                                            {S.IMAGE_DROPZONE.LabelImageDimensions}
                                                        </ImageDropzoneFileInformationText>
                                                        <ImageDropzoneFileInformationText>
                                                            {S.IMAGE_DROPZONE.ImageDimensions} {D.WIDTH_LIMIT}x
                                                            {D.HEIGHT_LIMIT}
                                                        </ImageDropzoneFileInformationText>
                                                    </ImageDropzoneFileInformationColumnContainer>
                                                    <ImageDropzoneFileInformationColumnContainer>
                                                        <ImageDropzoneFileInformationText>
                                                            {S.IMAGE_DROPZONE.LabelFileSize}
                                                        </ImageDropzoneFileInformationText>
                                                        <ImageDropzoneFileInformationText>
                                                            {S.IMAGE_DROPZONE.FileSize}
                                                        </ImageDropzoneFileInformationText>
                                                    </ImageDropzoneFileInformationColumnContainer>
                                                </ImageDropzoneFileInformationContainer>
                                            )}
                                        </>
                                    )}
                                </Media>
                            </ImageDropzoneContainer>
                        </ImageDropzoneSection>
                        {isUploadingImage && <p>Uploading...</p>}
                        {isImageDimensionImproper && (
                            <ImageDropzoneFileErrorText>
                                File dimensions are improper. Please use {D.WIDTH_LIMIT}x{D.HEIGHT_LIMIT}.
                            </ImageDropzoneFileErrorText>
                        )}
                        {isDragReject && (
                            <ImageDropzoneFileErrorText>
                                {S.IMAGE_DROPZONE.ErrorImproperFileType}
                            </ImageDropzoneFileErrorText>
                        )}
                    </div>
                )
            }}
        </Dropzone>
    )
}

export default ImageDropzone
