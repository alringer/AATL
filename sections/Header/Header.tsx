import Link from 'next/link'
import { useRouter } from 'next/router'
import LogoSVG from '../../assets/logo.svg'
import HeaderItem from '../../components/HeaderItem/HeaderItem'
import Image from '../../components/Image/Image'
import * as R from '../../constants/RouteConstants'
import * as S from '../../constants/StringConstants'
import { HeaderContainer, LeftItemsContainer, LogoContainer, RightItemsContainer } from './Header.style'

const Header = () => {
    const router = useRouter()
    // const logoPath = require('../../assets/logo.svg') as string

    return (
        <HeaderContainer>
            <LeftItemsContainer>
                <LogoContainer>
                    <Link href="/">
                        <a>
                            <Image src={LogoSVG} alt="logo" />
                        </a>
                    </Link>
                </LogoContainer>
            </LeftItemsContainer>
            <RightItemsContainer>
                <HeaderItem
                    href={R.ROUTE_ITEMS.home}
                    title={S.HEADER_ITEMS.FoodAndDrinks}
                    active={router.pathname === R.ROUTE_ITEMS.home}
                />
                <HeaderItem
                    href={R.ROUTE_ITEMS.cities}
                    title={S.HEADER_ITEMS.Cities}
                    active={router.pathname === R.ROUTE_ITEMS.cities}
                />
            </RightItemsContainer>
        </HeaderContainer>
    )
}

export default Header
