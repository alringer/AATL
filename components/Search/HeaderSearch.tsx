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
    // hideSearch: () => void
}

const HeaderSearch: React.FC<IHeaderSearchProps> = () => {
    const router = useRouter()

    const [value, setValue] = React.useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // TODO: Wire up Debounced Search API
        setValue(e.target.value)
    }

    const handleBlur = (e: React.FocusEvent) => {
        console.log('Blur event from the child: ', e.target.id)
        e.persist()
    }

    const handleSearch = () => {
        // TODO: Wire up Search API
        console.log('Search submitted')
        router.push('/city')
    }

    const handleTextFieldKeyDown = (e: React.KeyboardEvent) => {
        console.log('Press Key: ', e.key)
        switch (e.key) {
            case 'Enter':
                router.push('/city')
                break
            case 'Escape':
                // etc...
                break
            default:
                break
        }
    }

    const HeaderSearchTablet = () => (
        <HeaderSearchTabletContainer>
            <TextField
                id="hello"
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
                            <CustomIconButton>
                                <Image src={CloseSVG} alt="logo" />
                            </CustomIconButton>
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                onBlur={handleBlur}
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
                    onBlur={handleBlur}
                />
            </HeaderSearchContainer>
            <SearchButton onClick={handleSearch} onBlur={handleBlur}>
                {S.BUTTON_LABELS.Search}
            </SearchButton>
        </>
    )

    return (
        <>
            <Media queries={query}>
                {(matches) => (
                    <>
                        {matches.tablet && <HeaderSearchTablet />}
                        {matches.laptop && <HeaderSearchDesktop />}
                    </>
                )}
            </Media>
        </>
    )
}

export default HeaderSearch
