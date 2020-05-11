import { Tooltip } from '@material-ui/core'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import ImageDropzoneDefaultBackground from 'assets/image-dropzone-background.svg'
import * as S from 'constants/StringConstants'
import React from 'react'
import Dropzone from 'react-dropzone'
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
    onDrop: (acceptedFile: any) => void
}

const ImageDropzone: React.FC<IImageDropzoneProps> = ({ onDrop, file }) => {
    return (
        <Dropzone onDrop={onDrop} accept="image/png" minSize={0} maxSize={5242880} multiple={false}>
            {({ getRootProps, getInputProps, isDragReject, acceptedFiles }) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                        <ImageDropzoneSection>
                            <ImageDropzoneBackgroundContainer>
                                <ImageDropzoneBackgroundImg
                                    src={
                                        // acceptedFiles && acceptedFiles.length > 0 && acceptedFiles[0]
                                        file ? URL.createObjectURL(file) : ImageDropzoneDefaultBackground
                                    }
                                    alt="image-background-image"
                                />
                            </ImageDropzoneBackgroundContainer>
                            <ImageDropzoneContainer {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Tooltip title={S.IMAGE_DROPZONE.Tooltip} placement="top">
                                    <ImageDropzoneIconContainer>
                                        <CameraAltIcon />
                                    </ImageDropzoneIconContainer>
                                </Tooltip>
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
                                            {S.IMAGE_DROPZONE.ImageDimensions}
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
                            </ImageDropzoneContainer>
                        </ImageDropzoneSection>
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
