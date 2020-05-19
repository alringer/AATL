import InfiniteCarouselCard from 'components/InfiniteCarouselCard/InfiniteCarouselCard'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { size } from 'style/device'
import useWindowSize from 'utilities/hooks/useWindowSize'
import { IInfiniteCarouselCard } from 'utilities/types/infiniteCarousel'
import {
    InfiniteCarouselContainer,
    InfiniteCarouselDotButton,
    InfiniteCarouselDotButtonsContainer,
    InfiniteCarouselDotSpan,
    InfiniteCarouselSlideContainer,
} from './InfiniteCarousel.style'

interface IInfiniteCarouselProps {
    places: IInfiniteCarouselCard[]
}

const InfiniteCarousel: React.FC<IInfiniteCarouselProps> = ({ places }) => {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const windowSize = useWindowSize()
    const centerWidth: number = windowSize.width < Number(size.laptop) ? Number(95) : Number(80)

    React.useEffect(() => {
        console.log('Size: ', size, centerWidth)
    }, [size])

    const next = (index: number) => {
        if (currentSlide !== index) {
            setCurrentSlide(currentSlide + 1)
        }
    }

    const prev = (index: number) => {
        if (currentSlide !== index) {
            setCurrentSlide(currentSlide - 1)
        }
    }

    const updateCurrentSlide = (index: number) => {
        if (currentSlide !== index) {
            setCurrentSlide(index)
        }
    }

    const handleDotNavigation = (e: React.MouseEvent<HTMLInputElement>) => {
        const targetIndex = Number(e.currentTarget.id)
        if (currentSlide !== targetIndex) {
            setCurrentSlide(targetIndex)
        }
    }

    const getConfigurableProps = () => ({
        showArrows: true,
        showStatus: false,
        showIndicators: false,
        infiniteLoop: true,
        showThumbs: false,
        useKeyboardArrows: true,
        autoPlay: true,
        stopOnHover: true,
        swipeable: true,
        dynamicHeight: true,
        emulateTouch: true,
        thumbWidth: 100,
        selectedItem: 0,
        interval: 3000,
        transitionTime: 150,
        swipeScrollTolerance: 5,
        centerMode: true,
        centerSlidePercentage: 80,
    })

    return (
        <InfiniteCarouselContainer>
            <Carousel
                width="100%"
                infiniteLoop
                showArrows={true}
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
                centerMode={true}
                centerSlidePercentage={centerWidth}
                selectedItem={currentSlide}
                onChange={updateCurrentSlide}
                onClickItem={updateCurrentSlide}
            >
                {places.map((place: IInfiniteCarouselCard) => {
                    return (
                        <InfiniteCarouselSlideContainer key={place.placeID}>
                            <InfiniteCarouselCard {...place} />
                        </InfiniteCarouselSlideContainer>
                    )
                })}
            </Carousel>
            <InfiniteCarouselDotButtonsContainer>
                {places.map((place: IInfiniteCarouselCard, index: number) => {
                    return (
                        <InfiniteCarouselDotButton id={String(index)} onClick={handleDotNavigation}>
                            <InfiniteCarouselDotSpan className={index === currentSlide ? 'active' : 'inactive'} />
                        </InfiniteCarouselDotButton>
                    )
                })}
            </InfiniteCarouselDotButtonsContainer>
        </InfiniteCarouselContainer>
    )
}

export default InfiniteCarousel
