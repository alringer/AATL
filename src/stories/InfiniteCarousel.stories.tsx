import { storiesOf } from '@storybook/react'
import InfiniteCarousel from 'components/InfiniteCarousel/InfiniteCarousel'
import InfiniteCarouselCard from 'components/InfiniteCarouselCard/InfiniteCarouselCard'
import MostPopular from 'components/MostPopular/MostPopular'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { mockParentRegion } from 'utilities/types/parentRegion'
import { mockVenue } from 'utilities/types/venue'

storiesOf('Infinite Carousel', module)
    .add('Card: Default', () => {
        return <InfiniteCarouselCard place={mockVenue} />
    })
    .add('Carousel: Default', () => {
        return <InfiniteCarousel places={[mockVenue, mockVenue]} />
    })
    .add('Most Popular: Default', () => {
        return <MostPopular cityInformation={mockParentRegion} handleClickViewMore={() => {}} />
    })
