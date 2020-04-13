interface IImageProps {
    src: string
    alt: string
    style?: any
}

const Image: React.FC<IImageProps> = ({ src, alt, style }) => {
    return <img src={src} alt={alt} style={style ? style : { height: '100%', width: '100%' }} />
}

export default Image
