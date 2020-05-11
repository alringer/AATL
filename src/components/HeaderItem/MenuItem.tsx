import Link from 'next/link'
import React from 'react'
import { MenuItemText } from './MenuItem.style'

interface IMenuItemProps {
    title: string
    active: boolean
    href: string
}

const MenuItem: React.FC<IMenuItemProps> = ({ title, active, href }) => {
    return (
        <Link href={href}>
            <MenuItemText id={active ? 'active' : 'not-active'}>{title}</MenuItemText>
        </Link>
    )
}

export default MenuItem
