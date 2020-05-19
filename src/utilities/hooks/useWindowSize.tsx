import React from 'react'

const useWindowSize = () => {
    const isClient = typeof window === 'object'

    const getSize = () => {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined,
        }
    }

    const [windowSize, setWindowSize] = React.useState(getSize)

    const handleResize = () => {
        setWindowSize(getSize())
    }

    React.useEffect(() => {
        if (isClient) {
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }
    }, [])

    return windowSize
}

export default useWindowSize
