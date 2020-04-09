import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import SearchSVG from '../../assets/lightSearch.svg'
import LogoSVG from '../../assets/logo.svg'
import MenuItem from '../../components/HeaderItem/MenuItem'
import Image from '../../components/Image/Image'
import HeaderSearch from '../../components/Search/HeaderSearch'
import * as R from '../../constants/RouteConstants'
import * as S from '../../constants/StringConstants'
import {
    ButtonContainer,
    HeaderContainer,
    LeftItemsContainer,
    LoginButton,
    LogoContainer,
    MenuItemContainer,
    MenuItemsContainer,
    RightItemsContainer,
    SearchToggleButton,
    SignUpButton,
} from './Header.style'

const Header = () => {
    const [isSearchToggled, setSearchToggled] = React.useState(false)
    const router = useRouter()

    const handleBlurSearch = (e: React.FocusEvent) => {
        console.log('Blur event from the parent: ', e)
        setSearchToggled(false)
    }

    const Logo = () => {
        return (
            <LogoContainer>
                <Link href="/">
                    <a>
                        <Image src={LogoSVG} alt="logo" />
                    </a>
                </Link>
            </LogoContainer>
        )
    }

    const MenuItems = () => {
        return (
            <MenuItemsContainer>
                <MenuItemContainer>
                    <MenuItem
                        href={R.ROUTE_ITEMS.foodAndDrink}
                        title={S.HEADER_ITEMS.FoodAndDrinks}
                        active={router.pathname === R.ROUTE_ITEMS.foodAndDrink}
                    />
                </MenuItemContainer>
                <MenuItemContainer id={'left-padded'}>
                    <MenuItem
                        href={R.ROUTE_ITEMS.cities}
                        title={S.HEADER_ITEMS.Cities}
                        active={router.pathname === R.ROUTE_ITEMS.cities}
                    />
                </MenuItemContainer>
                <MenuItemContainer id={'left-padded'} onBlur={handleBlurSearch} tabIndex={0}>
                    {!isSearchToggled ? (
                        <SearchToggleButton onClick={() => setSearchToggled(true)}>
                            <Image src={SearchSVG} alt="logo" />
                        </SearchToggleButton>
                    ) : (
                        <HeaderSearch />
                    )}
                </MenuItemContainer>
            </MenuItemsContainer>
        )
    }

    const NotSignedInItems = () => {
        return (
            <MenuItemsContainer>
                <ButtonContainer>
                    <SignUpButton>{S.BUTTON_LABELS.SignUp}</SignUpButton>
                </ButtonContainer>
                <ButtonContainer id={'left-padded'}>
                    <LoginButton>{S.BUTTON_LABELS.Login}</LoginButton>
                </ButtonContainer>
            </MenuItemsContainer>
        )
    }

    return (
        <HeaderContainer>
            <LeftItemsContainer>
                <Logo />
            </LeftItemsContainer>
            <RightItemsContainer>
                <MenuItems />
                <NotSignedInItems />
            </RightItemsContainer>
        </HeaderContainer>
    )
}

export default Header
