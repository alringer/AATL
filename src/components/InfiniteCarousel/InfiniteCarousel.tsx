import InfiniteCarouselCard from 'components/InfiniteCarouselCard/InfiniteCarouselCard'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { size } from 'style/device'
import useWindowSize from 'utilities/hooks/useWindowSize'
import { IVenue } from 'utilities/types/venue'
import {
    InfiniteCarouselContainer,
    InfiniteCarouselDotButton,
    InfiniteCarouselDotButtonsContainer,
    InfiniteCarouselDotSpan,
    InfiniteCarouselSlideContainer,
} from './InfiniteCarousel.style'

interface IInfiniteCarouselProps {
    places: IVenue[] | null
}

const InfiniteCarousel: React.FC<IInfiniteCarouselProps> = ({ places }) => {
    const [currentPlaces, setCurrentPlaces] = React.useState([])
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const windowSize = useWindowSize()
    const centerWidth: number = windowSize.width < Number(size.laptop) ? Number(95) : Number(80)

    React.useEffect(() => {
        setCurrentPlaces(places)
    }, [places])

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
        selectedItem: 1,
        interval: 3000,
        transitionTime: 150,
        swipeScrollTolerance: 5,
        centerMode: true,
        centerSlidePercentage: 80,
    })

    return (
        currentPlaces &&
        currentPlaces.length > 0 && (
            <InfiniteCarouselContainer>
                <Carousel
                    width={
                        currentPlaces?.length > 1
                            ? '100%'
                            : `${windowSize.width < Number(size.laptop) ? Number(95) : Number(80)}%`
                    }
                    infiniteLoop={currentPlaces?.length > 1 ? true : false}
                    showArrows={true}
                    showIndicators={false}
                    showThumbs={false}
                    showStatus={false}
                    centerMode={currentPlaces?.length > 1 ? true : false}
                    centerSlidePercentage={centerWidth}
                    selectedItem={currentSlide}
                    onChange={updateCurrentSlide}
                    onClickItem={updateCurrentSlide}
                >
                    {currentPlaces?.map((place: IVenue) => {
                        return (
                            <InfiniteCarouselSlideContainer key={place.id}>
                                <InfiniteCarouselCard place={place} />
                            </InfiniteCarouselSlideContainer>
                        )
                    })}
                </Carousel>
                <InfiniteCarouselDotButtonsContainer>
                    {currentPlaces?.map((place: IVenue, index: number) => {
                        return (
                            <InfiniteCarouselDotButton id={String(index)} onClick={handleDotNavigation} key={index}>
                                <InfiniteCarouselDotSpan className={index === currentSlide ? 'active' : 'inactive'} />
                            </InfiniteCarouselDotButton>
                        )
                    })}
                </InfiniteCarouselDotButtonsContainer>
            </InfiniteCarouselContainer>
        )
    )
}

export default InfiniteCarousel
