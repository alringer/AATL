import { InputAdornment } from '@material-ui/core'
import CloseSVG from 'assets/close.svg'
import SearchSVG from 'assets/darkSearch.svg'
import * as S from 'constants/StringConstants'
import { useRouter } from 'next/router'
import React from 'react'
import Media from 'react-media'
import { CustomIconButton } from 'style/Button/IconButton.style'
import { query } from 'style/device'
import { CustomTextField } from 'style/TextField/TextField.style'
import Image from '../Image/Image'
import {
    HeaderSearchContainer,
    HeaderSearchTabletContainer,
    PlaceholderContainer,
    PlaceholderTextBold,
    PlaceholderTextNormal,
    SearchButton,
} from './Search.style'

interface IHeaderSearchProps {
    handleCloseSearch: () => void
}

const HeaderSearch: React.FC<IHeaderSearchProps> = ({ handleCloseSearch }) => {
    const router = useRouter()
    const [value, setValue] = React.useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // TODO: Wire up Debounced Search API
        setValue(e.target.value)
    }

    const handleSearch = (keyword: string) => {
        // TODO: Push the user to the city page with the search query parameter in the URL
        const urlParam = keyword ? `?place=${keyword}` : ''
        router.push(`/search` + urlParam)
    }

    const handleTextFieldKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'Enter':
                handleSearch(value)
                break
            case 'Escape':
                handleCloseSearch()
                break
            default:
                break
        }
    }

    const HeaderSearchTablet = () => (
        <HeaderSearchTabletContainer>
            <CustomTextField
                value={value}
                onChange={handleChange}
                autoFocus={true}
                placeholder={`${S.INPUT_PLACEHOLDERS.VenueSearchBold} ${S.INPUT_PLACEHOLDERS.VenueSearchNormal}`}
                InputLabelProps={{
                    shrink: false,
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <div style={{ width: '30px', height: '30px' }}>
                                <Image src={SearchSVG} alt="logo" />
                            </div>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <CustomIconButton onClick={handleCloseSearch}>
                                <Image src={CloseSVG} alt="close-icon" />
                            </CustomIconButton>
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                onKeyDown={handleTextFieldKeyDown}
            />
        </HeaderSearchTabletContainer>
    )

    const HeaderSearchDesktop = () => (
        <>
            <HeaderSearchContainer>
                <CustomTextField
                    value={value}
                    onChange={handleChange}
                    autoFocus={true}
                    label={
                        value === '' ? (
                            <PlaceholderContainer>
                                <PlaceholderTextBold>{S.INPUT_PLACEHOLDERS.VenueSearchBold}</PlaceholderTextBold> &nbsp;
                                <PlaceholderTextNormal>{S.INPUT_PLACEHOLDERS.VenueSearchNormal}</PlaceholderTextNormal>
                            </PlaceholderContainer>
                        ) : null
                    }
                    InputLabelProps={{ shrink: false }}
                    variant="outlined"
                    onKeyDown={handleTextFieldKeyDown}
                />
            </HeaderSearchContainer>
            <SearchButton onClick={() => handleSearch(value)}>{S.BUTTON_LABELS.Search}</SearchButton>
        </>
    )

    return (
        <>
            <Media queries={query}>
                {(matches) => (
                    <>
                        {matches.mobile && <HeaderSearchTablet />}
                        {matches.tablet && <HeaderSearchTablet />}
                        {matches.laptop && <HeaderSearchDesktop />}
                    </>
                )}
            </Media>
        </>
    )
}

export default HeaderSearch
