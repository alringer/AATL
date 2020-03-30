interface IHeaderItemProps {
    title: string
    active: boolean
}

const HeaderItem: React.FC<IHeaderItemProps> = ({ title, active }) => {
    return <div>{title}</div>
}

export default HeaderItem
