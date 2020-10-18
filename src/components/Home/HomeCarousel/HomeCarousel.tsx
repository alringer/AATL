import HomeCarouselCard from 'components/Home/HomeCarousel/HomeCarouselCard'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { size } from 'style/device'
import useWindowSize from 'utilities/hooks/useWindowSize'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'
import { HomeCarouselContainer } from './HomeCarousel.style'

interface IHomeCarouselProps {
    featuredRecommendationsLists: IRecommendationListMeta[] | null
}

const HomeCarousel: React.FC<IHomeCarouselProps> = ({ featuredRecommendationsLists }) => {
    const [currentFeaturedRecommendationsLists, setCurrentFeaturedRecommendationsLists] = React.useState([])
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0)

    React.useEffect(() => {
        if (featuredRecommendationsLists) {
            const sortedFeaturedLists = featuredRecommendationsLists.sort((a, b) =>
                a.featuredList.sortOrder > b.featuredList.sortOrder ? 1 : -1
            )
            setCurrentFeaturedRecommendationsLists(sortedFeaturedLists)
        }
    }, [featuredRecommendationsLists])

    const windowSize = useWindowSize()
    const centerWidth: number = windowSize.width < Number(size.laptop) ? Number(90) : Number(100)

    const updateCurrentSlide = (index: number) => {
        if (currentSlideIndex !== index) {
            setCurrentSlideIndex(index)
        }
    }

    const handleMoveForward = () => {
        if (featuredRecommendationsLists && currentSlideIndex + 1 < featuredRecommendationsLists.length) {
            setCurrentSlideIndex(currentSlideIndex + 1)
        } else {
            setCurrentSlideIndex(0)
        }
    }

    const handleMoveBackward = () => {
        if (currentSlideIndex <= 0) {
            setCurrentSlideIndex(featuredRecommendationsLists.length - 1)
        } else {
            setCurrentSlideIndex(currentSlideIndex - 1)
        }
    }

    return featuredRecommendationsLists ? (
        <HomeCarouselContainer>
            <Carousel
                width="100%"
                infiniteLoop
                showArrows={false}
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
                centerMode={true}
                // emulateTouch={true} TODO: Determine whether we are going to emulate touch for smaller screens on browser or just allow touch-devices to access touch
                centerSlidePercentage={centerWidth}
                selectedItem={currentSlideIndex}
                onChange={updateCurrentSlide}
                onClickItem={updateCurrentSlide}
            >
                {currentFeaturedRecommendationsLists.map((featuredRecommendationList, index) => (
                    <HomeCarouselCard
                        featuredRecommendationList={featuredRecommendationList}
                        handleMoveForward={handleMoveForward}
                        handleMoveBackward={handleMoveBackward}
                        isCurrent={currentSlideIndex === index}
                        length={featuredRecommendationsLists.length}
                    />
                ))}
            </Carousel>
        </HomeCarouselContainer>
    ) : null
}

export default HomeCarousel
