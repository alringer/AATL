import { InputAdornment } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import Media from 'react-media'
import CloseSVG from '../../assets/close.svg'
import SearchSVG from '../../assets/darkSearch.svg'
import * as S from '../../constants/StringConstants'
import { CustomIconButton } from '../../style/Button/IconButton.style'
import { query } from '../../style/device'
import TextField from '../../style/TextField/TextField'
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

    const handleSearch = () => {
        // TODO: Push the user to the city page with the search query parameter in the URL
        router.push('/city')
    }

    const handleTextFieldKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'Enter':
                handleSearch()
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
            <TextField
                value={value}
                onChange={handleChange}
                autoFocus={true}
                placeholder={`${S.BUTTON_PLACEHOLDERS.VenueSearchBold} ${S.BUTTON_PLACEHOLDERS.VenueSearchNormal}`}
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
                                <Image src={CloseSVG} alt="logo" />
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
                <TextField
                    value={value}
                    onChange={handleChange}
                    autoFocus={true}
                    label={
                        value === '' ? (
                            <PlaceholderContainer>
                                <PlaceholderTextBold>{S.BUTTON_PLACEHOLDERS.VenueSearchBold}</PlaceholderTextBold>{' '}
                                &nbsp;
                                <PlaceholderTextNormal>{S.BUTTON_PLACEHOLDERS.VenueSearchNormal}</PlaceholderTextNormal>
                            </PlaceholderContainer>
                        ) : null
                    }
                    InputLabelProps={{ shrink: false }}
                    variant="outlined"
                    onKeyDown={handleTextFieldKeyDown}
                />
            </HeaderSearchContainer>
            <SearchButton onClick={handleSearch}>{S.BUTTON_LABELS.Search}</SearchButton>
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
