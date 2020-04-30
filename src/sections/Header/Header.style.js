import { CustomButton } from 'style/Button/Button.style'
import { CustomIconButton } from 'style/Button/IconButton.style'
import { TextLink } from 'style/Button/TextLink.style'
import { device } from 'style/device'
import zIndices from 'style/zIndices'
import styled, { css } from 'styled-components'

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.12);
    background-color: rgba(255, 255, 255, 0.6);
    overflow: hidden;
    width: 100%;

    @media ${device.mobile} {
        height: 80px;
        padding: 12px 16px;
        justify-content: space-between;
    }

    @media ${device.tablet} {
        height: 96px;
        padding: 16px 20px;
        justify-content: space-between;
    }

    @media ${device.laptop} {
        height: 150px;
        padding: 20px 40px;
        justify-content: space-between;
    }
`

export const LogoContainer = styled.div`
    @media ${device.mobile} {
        width: 106.6px;
        height: 30px;
    }

    @media ${device.tablet} {
        width: 152px;
        height: 64px;
    }

    @media ${device.laptop} {
        width: 260px;
        height: 110px;
    }
`

export const RightItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`
export const LeftItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

export const MenuItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 40px;
`

export const SignedInMenuItemsContainer = styled(MenuItemsContainer)`
    padding-left: 30px;
    border-left: 2px solid ${props => props.theme.darkGreyOpaque};
`

export const MenuItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    ${props => {
        if (props.id === 'leftPadded') {
            return css`
                margin-left: 50px;
            `
        }
    }}
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    ${props => {
        if (props.id === 'leftPadded') {
            return css`
                margin-left: 10px;
            `
        }
    }}
`

export const LoginItemsContainer = styled.div``
export const AdminItemsContainer = styled.div``
export const ProfileItemsContainer = styled.div``

export const SignUpButton = styled(CustomButton)`
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.darkSlateBlue};
    :hover {
        background-color: ${props => props.theme.darkSlateBlue};
    }
`
export const LoginButton = styled(CustomButton)`
    color: ${props => props.theme.mushroom};
    background-color: ${props => props.theme.white};
    border-color: ${props => props.theme.darkGreyOpaque};
    :hover {
        border-color: ${props => props.theme.darkGreyOpaque};
    }
`

export const SearchToggleButton = styled(CustomIconButton)`
    background-color: ${props => props.theme.darkSlateBlue};
    :hover {
        background-color: ${props => props.theme.darkSlateBlue};
    }
`
// Popover
export const PopoverContainer = styled.div`
    position: absolute;
    width: 250px;
    backdrop-filter: blur(10px);
    /* box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.12),
        0 1px 2px 0 rgba(0, 0, 0, 0.12); */
    /* box-shadow: 3px -2px 4px #AAA; */
    background-color: rgba(0, 0, 0, 0.7);
    padding: 20px;
    display: flex;
    flex-direction: column;

    @media ${device.tablet} {
        top: 90px;
        right: 20px;
    }

    @media ${device.laptop} {
        top: 110px;
        right: 40px;
    }
`
export const PopoverArrow = styled.div`
    position: absolute;
    top: -8px;
    left: 210px;
	border-left: 4px solid transparent;
	border-right: 4px solid transparent;
	border-bottom: 8px solid rgba(0, 0, 0, 0.7);
    width: 0;
    height: 0;
    -webkit-filter: drop-shadow(0 -2px 2px #AAA);
`

export const PopoverRow = styled.div``

export const PopoverRowProfileInfo = styled(PopoverRow)`
    margin-bottom: 15px;
`

export const PopoverRowOption = styled(PopoverRow)`
    margin-bottom: 10px;
`

const PopoverText = css`
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: 0.25px;
    color: #d9deea;
`

export const PopoverOptionText = styled.p`
    ${PopoverText}
`

export const PopoverOptionLinkText = styled(TextLink)`
    ${PopoverText}
`

export const PopoverUserNameText = styled(PopoverOptionText)`
    font-size: 16px;
    font-weight: 500;
    line-height: 1.38;
    letter-spacing: normal;
    color: ${props => props.theme.white};
`
export const PopoverEmailText = styled(PopoverOptionText)`
    font-size: 12.1px;
    line-height: 1.32;
    letter-spacing: 0.4px;
`
export const PopoverSignOutText = styled(PopoverOptionLinkText)`
    font-size: 14px;
    font-weight: bold;
    line-height: 1.71;
    letter-spacing: 0.13px;
`

// Mobile Menu
export const MenuContainerMobile = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100vh;
    background-color: ${props => props.theme.darkSlateBlue};
    overflow-y: auto;
    z-index: ${zIndices.mobileMenu};
`

export const MenuItemsSectionRow = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 16px;
    border-bottom: 2px solid ${(props) => props.theme.darkGreyOpaque};

    ${props => {
        if (props.id === 'mainMenu') {
            return css`
                margin-bottom: 24px;
            `
        }
        }
    }
`

export const MenuItemRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    ${props => {
        if(props.id === 'marginBottom') {
            return css`
                margin-bottom: 12px;
            `
        }
        }
    }
`
export const MenuItemText = styled.p`
    opacity: 0.96;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${props => props.theme.white};
`

export const MenuItemAnchorText = styled(MenuItemText)`
    cursor: pointer;

    :hover {
        text-decoration: underline;
    }
`

export const MobileIconsContainer = styled.div`
    display: inline-flex;
`

export const MobileIconContainer = styled.div``