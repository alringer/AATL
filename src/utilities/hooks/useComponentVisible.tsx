import React from 'react'

const useComponentVisible = (initialIsVisible: boolean) => {
    const [isComponentVisible, setIsComponentVisible] = React.useState(initialIsVisible)
    const ref = React.useRef(null)
    let targetRef = React.useRef(null)

    const setTargetRef = (inputRef) => {
        console.log('targetRef: ', targetRef)
        console.log('inputRef: ', inputRef)
        console.log('inputRef Current: ', inputRef.current)
        const value = inputRef?.current
        targetRef = inputRef
    }

    const handleClickOutside = (event) => {
        if (!ref?.current?.contains(event.target) && !targetRef?.current?.contains(event.target)) {
            setIsComponentVisible(false)
        }
    }

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    })

    return { ref, isComponentVisible, setIsComponentVisible, setTargetRef }
}

export default useComponentVisible
