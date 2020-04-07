import { CustomTextField } from '../../style/TextField/TextField.style'

interface IHeaderSearchProps {
    handleBlur: () => void
}

const HeaderSearch: React.FC<IHeaderSearchProps> = ({ handleBlur }) => {
    const handleTextFieldKeyDown = (e: React.SyntheticEvent) => {
        switch (event.key) {
            case 'Enter':
                // call corresponding handler
                break
            case 'Escape':
                // etc...
                break
            default:
                break
        }
    }

    return <CustomTextField onBlur={handleBlur} autoFocus={true} placeholder={'placeholder'} variant="outlined" />
}

export default HeaderSearch
