import { storiesOf } from '@storybook/react'
import InfiniteCarousel from 'components/InfiniteCarousel/InfiniteCarousel'
import InfiniteCarouselCard from 'components/InfiniteCarouselCard/InfiniteCarouselCard'
import MostPopular from 'components/MostPopular/MostPopular'
import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { InfiniteCarouselMockData } from 'utilities/types/infiniteCarousel'

storiesOf('Infinite Carousel', module)
    .add('Card: Default', () => {
        return <InfiniteCarouselCard {...InfiniteCarouselMockData[0]} />
    })
    .add('Carousel: Default', () => {
        return <InfiniteCarousel places={InfiniteCarouselMockData} />
    })
    .add('Most Popular: Default', () => {
        return <MostPopular cityName={'Chicago'} places={InfiniteCarouselMockData} />
    })
