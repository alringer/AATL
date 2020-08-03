import { IconButton } from '@material-ui/core'
import SearchSVG from 'assets/lightSearch.svg'
import FullLogoSVG from 'assets/logo.svg'
import CloseIconSVG from 'assets/mobileHeaderCloseIcon.svg'
import LogoLadySVG from 'assets/mobileHeaderLogoLady.svg'
import LogoTextSVG from 'assets/mobileHeaderLogoText.svg'
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
} from './Header.style'

interface IReduxProps {
    user: IUserProfile
    userRole: string | null
    openAuthenticationModal: (currentView: AuthenticationViewEnum) => void
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
        popoverReference.setIsComponentVisible(true)
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
        // openAuthenticationModal(AuthenticationViewEnum.Login)
        keycloakLogin()
        setMobileMenuVisible(false)
    }
    const handleOpenSignUp = () => {
        // openAuthenticationModal(AuthenticationViewEnum.SignUp)
        keycloakSignUp()
        setMobileMenuVisible(false)
    }

    const Logo = () => (
        <LogoContainer>
            {/* Possible add prefetch={false} */}
            <Link href="/">
                <a>
                    <Image src={FullLogoSVG} alt="logo" />
                </a>
            </Link>
        </LogoContainer>
    )

    const LogoText = () => (
        <LogoContainer>
            {/* Possible add prefetch={false} */}
            <Link href="/">
                <a>
                    <Image src={LogoTextSVG} alt="logo" />
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
            <ButtonContainer>
                <SignUpButton onClick={handleOpenSignUp}>{S.BUTTON_LABELS.SignUp}</SignUpButton>
            </ButtonContainer>
            <ButtonContainer id={'leftPadded'}>
                <LoginButton onClick={handleOpenLogin}>{S.BUTTON_LABELS.Login}</LoginButton>
            </ButtonContainer>
        </MenuItemsContainer>
    )

    const SignedInItems = () => (
        <SignedInMenuItemsContainer>
            <IconButton onClick={handlePopoverOpen}>
                {/* TODO: Replace the icon with the default or custom user profile */}
                {/* TODO: Add a Tooltip and Tooltip options */}
                <Image src={UserProfileSVG} alt="close-icon" />
            </IconButton>
        </SignedInMenuItemsContainer>
    )

    const PopoverItems = () => (
        <PopoverContainer ref={popoverReference.ref}>
            <PopoverArrow />
            <PopoverRowProfileInfo>
                <PopoverUserNameText>
                    {(user.firstName ? `${user.firstName} ` : '') + (user.lastName ? `${user.lastName}` : '')}
                </PopoverUserNameText>
                <PopoverEmailText>{user.email}</PopoverEmailText>
            </PopoverRowProfileInfo>
            <PopoverRowOption>
                {/* TODO: Add account settings route */}
                <Link href={`${R.ROUTE_ITEMS.userProfile}/${user.id}`} passHref>
                    <PopoverOptionLinkText onClick={() => handlePopoverNavigation(R.ROUTE_ITEMS.home)}>
                        {S.PROFILE_POPOVER_ITEMS.AccountSettings}
                    </PopoverOptionLinkText>
                </Link>
            </PopoverRowOption>
            <PopoverRowOption>
                {userRole === UserRoleEnum.Admin ? (
                    <Link href={R.ROUTE_ITEMS.admin} passHref>
                        <PopoverOptionLinkText onClick={() => handlePopoverNavigation(R.ROUTE_ITEMS.home)}>
                            {S.PROFILE_POPOVER_ITEMS.AdminMenu}
                        </PopoverOptionLinkText>
                    </Link>
                ) : null}
            </PopoverRowOption>
            <PopoverRowOption>
                {/* TODO: Add help route */}
                <Link href={R.ROUTE_ITEMS.home} passHref>
                    <PopoverOptionLinkText onClick={() => handlePopoverNavigation(R.ROUTE_ITEMS.home)}>
                        {S.PROFILE_POPOVER_ITEMS.Help}
                    </PopoverOptionLinkText>
                </Link>
            </PopoverRowOption>
            <PopoverRowOption>
                <PopoverSignOutText onClick={handlePopoverLogout}>{S.PROFILE_POPOVER_ITEMS.SignOut}</PopoverSignOutText>
            </PopoverRowOption>
        </PopoverContainer>
    )

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
            {isSearchEnabled && (
                <MenuItemContainer id={'leftPadded'} ref={searchReference.ref}>
                    {!isSearchToggled || !searchReference.isComponentVisible ? (
                        <SearchToggleButton onClick={handleOpenSearch}>
                            <Image src={SearchSVG} alt="logo" />
                        </SearchToggleButton>
                    ) : (
                        <HeaderSearch handleCloseSearch={handleCloseSearch} />
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
                <MenuItems />
                {authenticated === true ? <SignedInItems /> : <NotSignedInItems />}
            </RightItemsContainer>
        </>
    )

    const HeaderMobile = () => (
        <>
            <LogoText />
            <LogoLady />
            <MobileIconsContainer>
                {isSearchEnabled && (
                    <MobileIconContainer>
                        {!isSearchToggled || !searchReference.isComponentVisible ? (
                            <IconButton onClick={handleOpenSearch}>
                                <Image src={MobileSearchSvg} alt="" />
                            </IconButton>
                        ) : (
                            <HeaderSearch handleCloseSearch={handleCloseSearch} />
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
            <MenuItemsSectionRow>
                <MenuItemRow id="marginBottom" onClick={() => handleMobileNavigation(R.ROUTE_ITEMS.foodAndDrink)}>
                    <MenuItemAnchorText>{S.HEADER_ITEMS.FoodAndDrinks}</MenuItemAnchorText>
                </MenuItemRow>
                <MenuItemRow id="marginBottom" onClick={() => handleMobileNavigation(R.ROUTE_ITEMS.cities)}>
                    <MenuItemAnchorText>{S.HEADER_ITEMS.Cities}</MenuItemAnchorText>
                </MenuItemRow>
            </MenuItemsSectionRow>
            <MenuItemsSectionRow>
                {authenticated ? (
                    <>
                        {/* TODO: Add profile route  */}
                        <MenuItemRow id="marginBottom">
                            <MenuItemAnchorText>{S.HEADER_ITEMS.Profile}</MenuItemAnchorText>
                        </MenuItemRow>
                        {/* TODO: Add settings route  */}
                        <MenuItemRow id="marginBottom">
                            <MenuItemAnchorText>{S.HEADER_ITEMS.Settings}</MenuItemAnchorText>
                        </MenuItemRow>
                        <MenuItemRow onClick={handleLogout}>
                            <MenuItemAnchorText>{S.HEADER_ITEMS.SignOut}</MenuItemAnchorText>
                        </MenuItemRow>
                    </>
                ) : (
                    <>
                        {/* TODO: Add sign up modal  */}
                        <MenuItemRow id="marginBottom" onClick={handleOpenSignUp}>
                            <MenuItemAnchorText>{S.HEADER_ITEMS.SignUp}</MenuItemAnchorText>
                        </MenuItemRow>
                        <MenuItemRow onClick={handleOpenLogin}>
                            <MenuItemAnchorText>{S.HEADER_ITEMS.Login}</MenuItemAnchorText>
                        </MenuItemRow>
                    </>
                )}
            </MenuItemsSectionRow>
            <MenuItemsSectionRow>
                {/* TODO: Add admin route  */}
                <MenuItemRow>
                    <MenuItemAnchorText>{S.HEADER_ITEMS.Admin}</MenuItemAnchorText>
                </MenuItemRow>
            </MenuItemsSectionRow>
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
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            openAuthenticationModal,
        },
        dispatch
    )

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(Header))
