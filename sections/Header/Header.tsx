import Link from 'next/link'
import { useRouter } from 'next/router'
import LogoSVG from '../../assets/logo.svg'
import Button, { ButtonType } from '../../components/Button/Button'
import MenuItem from '../../components/HeaderItem/MenuItem'
import Image from '../../components/Image/Image'
import * as R from '../../constants/RouteConstants'
import * as S from '../../constants/StringConstants'
import {
    ButtonContainer,
    HeaderContainer,
    LeftItemsContainer,
    LogoContainer,
    MenuItemContainer,
    MenuItemsContainer,
    RightItemsContainer
} from './Header.style'

const Header = () => {
    const router = useRouter()

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
                <MenuItemContainer id={'rightmost'}>
                    <MenuItem
                        href={R.ROUTE_ITEMS.cities}
                        title={S.HEADER_ITEMS.Cities}
                        active={router.pathname === R.ROUTE_ITEMS.cities}
                    />
                </MenuItemContainer>
            </MenuItemsContainer>
        )
    }

    const NotSignedInItems = () => {
        return (
            <MenuItemsContainer>
                <ButtonContainer>
                    <Button buttonType={ButtonType.SignUpDark} />
                </ButtonContainer>
                <ButtonContainer id={'rightmost'}>
                    <Button buttonType={ButtonType.Login} />
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
