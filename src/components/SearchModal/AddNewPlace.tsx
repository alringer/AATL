import { InputAdornment, Tooltip } from '@material-ui/core'
import ImageDropzone from 'components/ImageDropzone/ImageDropzone'
import * as S from 'constants/StringConstants'
import React from 'react'
import { ErrorIcon } from 'style/ErrorIcon/ErrorIcon.style'
import {
    AddPlaceContentContainer,
    AddPlaceContentRow,
    AddPlaceInput,
    AddPlaceIntroText,
    CancelButton,
    SearchModalHeaderContainer,
    SearchModalHeaderText,
    SearchModalSearchFooterContainer,
    SubmitButton,
} from './SearchModal.style'

interface IAddNewPlaceProps {
    switchViewToSearch: () => void
}

enum Values {
    name = 'name',
    type = 'type',
    address = 'address',
    description = 'description',
    phone = 'phone',
    url = 'url',
}

interface Errors {
    name: string
    type: string
    address: string
    description: string
    phone: string
    url: string
}

const AddNewPlace: React.FC<IAddNewPlaceProps> = ({ switchViewToSearch }) => {
    const DEFAULT_VALUES = {
        name: '',
        type: '',
        address: '',
        description: '',
        phone: '',
        url: '',
    }
    const DEFAULT_ERRORS: Errors = {
        name: '',
        type: '',
        address: '',
        description: '',
        phone: '',
        url: '',
    }
    const [values, setValues] = React.useState(DEFAULT_VALUES)
    const [errors, setErrors] = React.useState<Errors>(DEFAULT_ERRORS)
    const [file, setFile] = React.useState()
    const [preview, setPreview] = React.useState(null)
    const [isUploadingImage, setUploadingImage] = React.useState()
    const [isImageDimensionImproper, setImageDimensionImproper] = React.useState()

    const validateForm = () => {
        let isValid = true
        let newErrors = { ...errors }
        if (values.name === '') {
            newErrors = { ...newErrors, name: 'Invalid entry' }
            isValid = false
        }
        if (values.type === '') {
            newErrors = { ...newErrors, type: 'Invalid entry' }
            isValid = false
        }
        if (values.address === '') {
            newErrors = { ...newErrors, address: 'Invalid entry' }
            isValid = false
        }
        if (values.description === '') {
            newErrors = { ...newErrors, description: 'Invalid entry' }
            isValid = false
        }
        if (values.phone === '') {
            newErrors = { ...newErrors, phone: 'Invalid entry' }
            isValid = false
        }
        if (values.url === '') {
            newErrors = { ...newErrors, url: 'Invalid entry' }
            isValid = false
        }

        setErrors(newErrors)

        return isValid
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

    const handleDrag = () => {}

    const handleChange = (prop: Values) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
        if (prop === Values.name) {
            setErrors({ ...errors, name: '' })
        }
        if (prop === Values.type) {
            setErrors({ ...errors, type: '' })
        }
        if (prop === Values.address) {
            setErrors({ ...errors, address: '' })
        }
        if (prop === Values.description) {
            setErrors({ ...errors, description: '' })
        }
        if (prop === Values.phone) {
            setErrors({ ...errors, phone: '' })
        }
        if (prop === Values.url) {
            setErrors({ ...errors, url: '' })
        }
    }

    const handleAddPlace = () => {
        // TODO: Wire up sign-in-with-email
        console.log('TODO: Wire up Add-Place')
        const formValid = validateForm()
        if (formValid) {
            // TODO: Call API to add the currently entered info
        }
    }

    return (
        <div>
            <SearchModalHeaderContainer>
                <SearchModalHeaderText>{S.ADD_PLACE.Header}</SearchModalHeaderText>
            </SearchModalHeaderContainer>
            <AddPlaceContentContainer>
                <AddPlaceContentRow>
                    <AddPlaceIntroText>{S.ADD_PLACE.Intro}</AddPlaceIntroText>
                </AddPlaceContentRow>
                <AddPlaceContentRow>
                    <AddPlaceInput
                        id={Values.name}
                        className={errors.name !== '' ? 'error' : null}
                        value={values.name}
                        onChange={handleChange(Values.name)}
                        label={S.INPUT_PLACEHOLDERS.Name}
                        variant="outlined"
                        InputProps={
                            errors.name !== ''
                                ? {
                                      endAdornment: (
                                          <InputAdornment position="end">
                                              <Tooltip title={errors.name} placement="top">
                                                  <ErrorIcon />
                                              </Tooltip>
                                          </InputAdornment>
                                      ),
                                  }
                                : null
                        }
                    />
                </AddPlaceContentRow>
                <AddPlaceContentRow>
                    <AddPlaceInput
                        id={Values.type}
                        className={errors.type !== '' ? 'error' : null}
                        value={values.type}
                        onChange={handleChange(Values.type)}
                        label={S.INPUT_PLACEHOLDERS.RestaurantType}
                        variant="outlined"
                        InputProps={
                            errors.type !== ''
                                ? {
                                      endAdornment: (
                                          <InputAdornment position="end">
                                              <Tooltip title={errors.type} placement="top">
                                                  <ErrorIcon />
                                              </Tooltip>
                                          </InputAdornment>
                                      ),
                                  }
                                : null
                        }
                    />
                </AddPlaceContentRow>
                <AddPlaceContentRow>
                    <AddPlaceInput
                        id={Values.address}
                        className={errors.address !== '' ? 'error' : null}
                        value={values.address}
                        onChange={handleChange(Values.address)}
                        label={S.INPUT_PLACEHOLDERS.Address}
                        variant="outlined"
                        InputProps={
                            errors.address !== ''
                                ? {
                                      endAdornment: (
                                          <InputAdornment position="end">
                                              <Tooltip title={errors.address} placement="top">
                                                  <ErrorIcon />
                                              </Tooltip>
                                          </InputAdornment>
                                      ),
                                  }
                                : null
                        }
                    />
                </AddPlaceContentRow>
                <AddPlaceContentRow>
                    <AddPlaceInput
                        id={Values.description}
                        className={errors.description !== '' ? 'error' : null}
                        value={values.description}
                        onChange={handleChange(Values.description)}
                        label={S.INPUT_PLACEHOLDERS.Description}
                        variant="outlined"
                        InputProps={
                            errors.description !== ''
                                ? {
                                      endAdornment: (
                                          <InputAdornment position="end">
                                              <Tooltip title={errors.description} placement="top">
                                                  <ErrorIcon />
                                              </Tooltip>
                                          </InputAdornment>
                                      ),
                                  }
                                : null
                        }
                    />
                </AddPlaceContentRow>
                <AddPlaceContentRow>
                    <AddPlaceInput
                        id={Values.phone}
                        className={errors.phone !== '' ? 'error' : null}
                        value={values.phone}
                        onChange={handleChange(Values.phone)}
                        label={S.INPUT_PLACEHOLDERS.PhoneNumber}
                        variant="outlined"
                        InputProps={
                            errors.phone !== ''
                                ? {
                                      endAdornment: (
                                          <InputAdornment position="end">
                                              <Tooltip title={errors.phone} placement="top">
                                                  <ErrorIcon />
                                              </Tooltip>
                                          </InputAdornment>
                                      ),
                                  }
                                : null
                        }
                    />
                    <AddPlaceInput
                        id={Values.url}
                        className={errors.url !== '' ? 'error' : null}
                        value={values.url}
                        onChange={handleChange(Values.url)}
                        label={S.INPUT_PLACEHOLDERS.WebsiteURL}
                        variant="outlined"
                        InputProps={
                            errors.url !== ''
                                ? {
                                      endAdornment: (
                                          <InputAdornment position="end">
                                              <Tooltip title={errors.url} placement="top">
                                                  <ErrorIcon />
                                              </Tooltip>
                                          </InputAdornment>
                                      ),
                                  }
                                : null
                        }
                    />
                </AddPlaceContentRow>
                <AddPlaceContentRow>
                    <ImageDropzone
                        file={file}
                        handleDrop={handleDrop}
                        preview={preview}
                        isUploadingImage={isUploadingImage}
                        isImageDimensionImproper={isImageDimensionImproper}
                        handleDrag={handleDrag}
                    />
                </AddPlaceContentRow>
            </AddPlaceContentContainer>
            <SearchModalSearchFooterContainer>
                <CancelButton onClick={switchViewToSearch}>{S.BUTTON_LABELS.Cancel}</CancelButton>
                <SubmitButton onClick={handleAddPlace}>{S.BUTTON_LABELS.AddPlace}</SubmitButton>
            </SearchModalSearchFooterContainer>
        </div>
    )
}

export default AddNewPlace
