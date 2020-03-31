import Link from 'next/link'
import { HeaderItemText } from './HeaderItem.style'

interface IHeaderItemProps {
    title: string
    active: boolean
    href: string
}

const HeaderItem: React.FC<IHeaderItemProps> = ({ title, active, href }) => {
    return (
        <Link href={href}>
            <HeaderItemText>{title}</HeaderItemText>
        </Link>
    )
}

export default HeaderItem
