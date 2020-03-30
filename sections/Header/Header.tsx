import Link from 'next/link'
import { useRouter } from 'next/router'
import LogoSVG from '../../assets/logo.svg'
import HeaderItem from '../../components/HeaderItem/HeaderItem'
import * as R from '../../constants/RouteConstants'
import * as S from '../../constants/StringConstants'
import { HeaderContainer, LeftItemsContainer, RightItemsContainer } from './Header.style'

const Header = () => {
    const router = useRouter()
    // const logoPath = require('../../assets/logo.svg') as string

    return (
        <HeaderContainer>
            <LeftItemsContainer>
                <Link href="/">
                    <a>
                        <img src={LogoSVG} alt="logo" />
                    </a>
                </Link>
            </LeftItemsContainer>
            <RightItemsContainer>
                <HeaderItem title={S.HEADER_ITEMS.FoodAndDrinks} active={router.pathname === R.ROUTE_ITEMS.home} />
                <HeaderItem title={S.HEADER_ITEMS.Cities} active={router.pathname === R.ROUTE_ITEMS.cities} />
            </RightItemsContainer>
        </HeaderContainer>
    )
}

export default Header
