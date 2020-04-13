import Link from 'next/link'
import { MenuItemAnchor, MenuItemText } from './MenuItem.style'

interface IMenuItemProps {
    title: string
    active: boolean
    href: string
}

const MenuItem: React.FC<IMenuItemProps> = ({ title, active, href }) => {
    return (
        <Link href={href}>
            <MenuItemAnchor>
                <MenuItemText id={active ? 'active' : 'not-active'}>{title}</MenuItemText>
            </MenuItemAnchor>
        </Link>
    )
}

export default MenuItem
