interface IImageProps {
    src: string
    alt: string
}

const Image: React.FC<IImageProps> = ({ src, alt }) => {
    return <img src={src} alt={alt} style={{ height: '100%', width: '100%' }} />
}

export default Image
