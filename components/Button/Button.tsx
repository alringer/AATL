import * as S from '../../constants/StringConstants'
import { CustomButton } from './Button.style'

export enum ButtonType {
    SearchOrange = 'Search',
    SearchMushroom = 'SearchMushroom',
    SignUpDark = 'SignUpDark',
    SignUpLight = 'SignUpLight',
    MoreTransparent = 'MoreTransparent',
    MoreWhite = 'MoreWhite',
    ShareTransparent = 'ShareTransparent',
    ShareWhite = 'ShareWhite',
    MoreOrange = 'MoreOrange',
    Login = 'Login'
}

interface IButtonProps {
    buttonType: ButtonType
}

const Button: React.FC<IButtonProps> = ({ buttonType }) => {
    const BUTTON_LABEL =
        buttonType === ButtonType.SearchMushroom || buttonType === ButtonType.SearchOrange
            ? S.BUTTON_LABELS.Search
            : buttonType === ButtonType.SignUpDark || buttonType === ButtonType.SignUpLight
            ? S.BUTTON_LABELS.SignUp
            : buttonType === ButtonType.Login
            ? S.BUTTON_LABELS.Login
            : ''

    return <CustomButton id={buttonType}>{BUTTON_LABEL}</CustomButton>
}

export default Button
