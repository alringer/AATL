import { IconButton } from '@material-ui/core'
import MobileLogoTextSVG from 'assets/LFB-Text.svg'
import SearchSVG from 'assets/lightSearch.svg'
import LogoLadySVG from 'assets/logo_svg/LFB_logo-mark.svg'
import FullLogoSVG from 'assets/logo_svg/LFG_logo.svg'
import CloseIconSVG from 'assets/mobileHeaderCloseIcon.svg'
import MobileMenuSVG from 'assets/mobileHeaderMenuIcon.svg'
import MobileSearchSvg from 'assets/mobileHeaderSearchIcon.svg'
import UserProfileSVG from 'assets/userProfile.svg'
import MenuItem from 'components/HeaderItem/MenuItem'
import Image from 'components/Image/Image'
import HeaderSearch from 'components/Search/HeaderSearch'
import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openAuthenticationModal } from 'store/authModal/authModal_actions'
import { AuthenticationViewEnum } from 'store/authModal/authModal_types'
import { StoreState } from 'store/index'
import { query } from 'style/device'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import useComponentVisible from 'utilities/hooks/useComponentVisible'
import { UserRoleEnum } from 'utilities/types/clientDTOS/UserRole'
import { IUserProfile } from 'utilities/types/userProfile'
import {
    ButtonContainer,
    HeaderContainer,
    LeftItemsContainer,
    LoginButton,
    LogoContainer,
    MenuContainerMobile,
    MenuItemAnchorText,
    MenuItemContainer,
    MenuItemRow,
    MenuItemsContainer,
    MenuItemsSectionRow,
    MenuItemText,
    MobileIconContainer,
    MobileIconsContainer,
    PopoverArrow,
    PopoverContainer,
    PopoverEmailText,
    PopoverOptionLinkText,
    PopoverRowOption,
    PopoverRowProfileInfo,
    PopoverSignOutText,
    PopoverUserNameText,
    RightItemsContainer,
    SearchToggleButton,
    SignedInMenuItemsContainer,
    SignUpButton,
    UserIconContainer,
} from './Header.style'

interface IReduxProps {
    isPrelaunch: boolean
    user: IUserProfile
    userRole: string | null
    openAuthenticationModal: (currentView: AuthenticationViewEnum) => void
    loggedIn: boolean
}
interface IHeaderProps extends IReduxProps, IWithAuthInjectedProps {}

const Header: React.FC<IHeaderProps> = ({
    user,
    userRole,
    keycloakLogout,
    openAuthenticationModal,
    keycloakLogin,
    keycloakSignUp,
    authenticated,
    isPrelaunch,
    loggedIn,
}) => {
    const [isMobileMenuVisible, setMobileMenuVisible] = React.useState(false)
    const [isSearchToggled, setSearchToggled] = React.useState(false)
    const searchReference = useComponentVisible(false)
    const popoverReference = useComponentVisible(false)
    const router = useRouter()
    const isSearchEnabled = router.pathname !== R.ROUTE_ITEMS.home && router.pathname !== R.ROUTE_ITEMS.search

    const handleOpenSearch = () => {
        searchReference.setIsComponentVisible(true)
        setSearchToggled(true)
    }

    const handleCloseSearch = () => {
        searchReference.setIsComponentVisible(false)
        setSearchToggled(false)
    }

    const handleMobileNavigation = (target: string) => {
        setMobileMenuVisible(false)
        router.push(target)
    }

    const handleLogout = () => {
        keycloakLogout()
        setMobileMenuVisible(false)
    }

    const handlePopoverOpen = () => {
        if (user) {
            popoverReference.setIsComponentVisible(true)
        }
    }

    const handlePopoverLogout = () => {
        keycloakLogout()
        popoverReference.setIsComponentVisible(false)
    }

    const handlePopoverNavigation = (target: string) => {
        popoverReference.setIsComponentVisible(false)
        router.push(target)
    }

    const handleOpenLogin = () => {
        keycloakLogin()
        setMobileMenuVisible(false)
    }
    const handleOpenSignUp = () => {
        keycloakSignUp()
        setMobileMenuVisible(false)
    }

    const Logo = () => (
        <LogoContainer>
            <Link href="/" prefetch={false}>
                <a>
                    <Image src={FullLogoSVG} alt="logo" />
                </a>
            </Link>
        </LogoContainer>
    )

    const LogoText = () => (
        <LogoContainer>
            <Link href="/" prefetch={false}>
                <a>
                    <Image src={MobileLogoTextSVG} alt="logo" />
                </a>
            </Link>
        </LogoContainer>
    )

    const LogoLady = () => (
        <LogoContainer>
            <Image src={LogoLadySVG} alt="logo" style={{ objectFit: 'cover', transform: 'translate(0px, -45px)' }} />
        </LogoContainer>
    )

    const NotSignedInItems = () => (
        <MenuItemsContainer>
            {!isPrelaunch && (
                <ButtonContainer>
                    <SignUpButton onClick={handleOpenSignUp}>{S.BUTTON_LABELS.SignUp}</SignUpButton>
                </ButtonContainer>
            )}
            <ButtonContainer id={'leftPadded'}>
                <LoginButton onClick={handleOpenLogin}>{S.BUTTON_LABELS.Login}</LoginButton>
            </ButtonContainer>
        </MenuItemsContainer>
    )

    const SignedInItems = () => (
        <SignedInMenuItemsContainer>
            <IconButton onClick={handlePopoverOpen}>
                <UserIconContainer>
                    <Image src={user && user.imageCDNUrl ? user.imageCDNUrl : UserProfileSVG} alt="close-icon" />
                </UserIconContainer>
            </IconButton>
        </SignedInMenuItemsContainer>
    )

    const PopoverItems = () => (
        <PopoverContainer ref={popoverReference.ref}>
            <PopoverArrow />
            <PopoverRowProfileInfo>
                <PopoverUserNameText>
                    {user
                        ? (user.firstName ? `${user.firstName} ` : '') + (user.lastName ? `${user.lastName}` : '')
                        : ''}
                </PopoverUserNameText>
                <PopoverEmailText>{user ? user.email : ''}</PopoverEmailText>
            </PopoverRowProfileInfo>
            <PopoverRowOption>
                <Link
                    href={user && user.id !== undefined && user.id !== null ? `${R.ROUTE_ITEMS.userProfile}/me` : ``}
                    passHref
                >
                    <PopoverOptionLinkText onClick={() => handlePopoverNavigation(R.ROUTE_ITEMS.home)}>
                        {S.PROFILE_POPOVER_ITEMS.AccountSettings}
                    </PopoverOptionLinkText>
                </Link>
            </PopoverRowOption>
            {userRole === UserRoleEnum.Admin ? (
                <PopoverRowOption>
                    <Link href={R.ROUTE_ITEMS.admin} passHref>
                        <PopoverOptionLinkText onClick={() => handlePopoverNavigation(R.ROUTE_ITEMS.home)}>
                            {S.PROFILE_POPOVER_ITEMS.AdminMenu}
                        </PopoverOptionLinkText>
                    </Link>
                </PopoverRowOption>
            ) : null}
            <PopoverRowOption>
                <PopoverSignOutText onClick={handlePopoverLogout}>{S.PROFILE_POPOVER_ITEMS.SignOut}</PopoverSignOutText>
            </PopoverRowOption>
        </PopoverContainer>
    )

    const handleClickMyLists = (e) => {
        e.stopPropagation()
        localStorage.setItem('clickedMyLists', 'true')
    }

    const MenuItems = () => (
        <MenuItemsContainer>
            <MenuItemContainer>
                <MenuItem
                    href={R.ROUTE_ITEMS.foodAndDrink}
                    title={S.HEADER_ITEMS.FoodAndDrinks}
                    active={router.pathname === R.ROUTE_ITEMS.foodAndDrink}
                />
            </MenuItemContainer>
            <MenuItemContainer id={'leftPadded'}>
                <MenuItem
                    href={R.ROUTE_ITEMS.cities}
                    title={S.HEADER_ITEMS.Cities}
                    active={router.pathname === R.ROUTE_ITEMS.cities}
                />
            </MenuItemContainer>
            {loggedIn && (
                <MenuItemContainer id={'leftPadded'} onClick={handleClickMyLists}>
                    <MenuItem
                        href={R.ROUTE_ITEMS.me}
                        title={S.HEADER_ITEMS.MyLists}
                        active={router.pathname === R.ROUTE_ITEMS.me}
                    />
                </MenuItemContainer>
            )}
            {isSearchEnabled && (
                <MenuItemContainer id={'leftPadded'}>
                    {!isSearchToggled || !searchReference.isComponentVisible ? (
                        <SearchToggleButton onClick={handleOpenSearch}>
                            <Image src={SearchSVG} alt="logo" />
                        </SearchToggleButton>
                    ) : (
                        <HeaderSearch handleCloseSearch={handleCloseSearch} searchRef={searchReference.ref} />
                    )}
                </MenuItemContainer>
            )}
        </MenuItemsContainer>
    )

    const HeaderDesktopTablet = () => (
        <>
            <LeftItemsContainer>
                <Logo />
            </LeftItemsContainer>
            <RightItemsContainer>
                {!isPrelaunch && <MenuItems />}
                {authenticated === true ? <SignedInItems /> : <NotSignedInItems />}
            </RightItemsContainer>
        </>
    )

    const HeaderMobile = () => (
        <>
            <LogoText />
            <LogoLady />
            <MobileIconsContainer>
                {!isPrelaunch && isSearchEnabled && (
                    <MobileIconContainer>
                        {!isSearchToggled || !searchReference.isComponentVisible ? (
                            <IconButton onClick={handleOpenSearch}>
                                <Image src={MobileSearchSvg} alt="" />
                            </IconButton>
                        ) : (
                            <HeaderSearch searchRef={searchReference.ref} handleCloseSearch={handleCloseSearch} />
                        )}
                    </MobileIconContainer>
                )}
                <MobileIconContainer>
                    <IconButton onClick={() => setMobileMenuVisible(true)}>
                        <Image src={MobileMenuSVG} alt="" />
                    </IconButton>
                </MobileIconContainer>
            </MobileIconsContainer>
        </>
    )

    const MobileMenu = () => (
        <MenuContainerMobile>
            <MenuItemsSectionRow id="mainMenu">
                <MenuItemRow>
                    <MenuItemText>{S.HEADER_ITEMS.MainMenu}</MenuItemText>
                    <IconButton onClick={() => setMobileMenuVisible(false)}>
                        <Image src={CloseIconSVG} alt="" />
                    </IconButton>
                </MenuItemRow>
            </MenuItemsSectionRow>
            {!isPrelaunch && (
                <MenuItemsSectionRow>
                    <MenuItemRow id="marginBottom" onClick={() => handleMobileNavigation(R.ROUTE_ITEMS.foodAndDrink)}>
                        <MenuItemAnchorText>{S.HEADER_ITEMS.FoodAndDrinks}</MenuItemAnchorText>
                    </MenuItemRow>
                    <MenuItemRow id="marginBottom" onClick={() => handleMobileNavigation(R.ROUTE_ITEMS.cities)}>
                        <MenuItemAnchorText>{S.HEADER_ITEMS.Cities}</MenuItemAnchorText>
                    </MenuItemRow>
                </MenuItemsSectionRow>
            )}
            <MenuItemsSectionRow>
                {authenticated ? (
                    <>
                        <MenuItemRow id="marginBottom" onClick={() => handleMobileNavigation(R.ROUTE_ITEMS.me)}>
                            <MenuItemAnchorText>{S.HEADER_ITEMS.Profile}</MenuItemAnchorText>
                        </MenuItemRow>
                        {/* <MenuItemRow id="marginBottom">
                            <MenuItemAnchorText>{S.HEADER_ITEMS.Settings}</MenuItemAnchorText>
                        </MenuItemRow> */}
                        <MenuItemRow onClick={handleLogout}>
                            <MenuItemAnchorText>{S.HEADER_ITEMS.SignOut}</MenuItemAnchorText>
                        </MenuItemRow>
                    </>
                ) : (
                    <>
                        {!isPrelaunch && (
                            <MenuItemRow id="marginBottom" onClick={handleOpenSignUp}>
                                <MenuItemAnchorText>{S.HEADER_ITEMS.SignUp}</MenuItemAnchorText>
                            </MenuItemRow>
                        )}
                        <MenuItemRow onClick={handleOpenLogin}>
                            <MenuItemAnchorText>{S.HEADER_ITEMS.Login}</MenuItemAnchorText>
                        </MenuItemRow>
                    </>
                )}
            </MenuItemsSectionRow>
            {userRole === UserRoleEnum.Admin ? (
                <MenuItemsSectionRow>
                    <MenuItemRow>
                        <Link href={`${R.ROUTE_ITEMS.admin}?menu=${R.ROUTE_ITEMS.adminCities}`} passHref>
                            <MenuItemAnchorText>{S.HEADER_ITEMS.Admin}</MenuItemAnchorText>
                        </Link>
                    </MenuItemRow>
                </MenuItemsSectionRow>
            ) : null}
        </MenuContainerMobile>
    )

    return (
        <>
            <Media queries={query} defaultMatches={{ laptop: true }}>
                {(matches) => (
                    <>
                        <HeaderContainer>
                            {matches.mobile && <HeaderMobile />}
                            {matches.tablet && <HeaderDesktopTablet />}
                            {matches.laptop && <HeaderDesktopTablet />}
                        </HeaderContainer>
                        {authenticated && popoverReference.isComponentVisible && (matches.laptop || matches.tablet) && (
                            <PopoverItems />
                        )}
                        {matches.mobile && isMobileMenuVisible && <MobileMenu />}
                    </>
                )}
            </Media>
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    user: state.userReducer.user,
    userRole: state.userReducer.userRole,
    isPrelaunch: state.prelaunchReducer.isPrelaunch,
    loggedIn: state.userReducer.loggedIn,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            openAuthenticationModal,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(Header))
