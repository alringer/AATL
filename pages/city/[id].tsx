import CityBanner from 'components/CityBanner/CityBanner'
import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import LocalPlaces from 'components/LocalPlaces/LocalPlaces'
import MostPopular from 'components/MostPopular/MostPopular'
import { GetServerSideProps } from 'next'
import React from 'react'
import { InfiniteCarouselMockData } from 'utilities/types/infiniteCarousel'

interface ICityProps {}

const City: React.FC<ICityProps> = () => {
    return (
        <>
            <CityBanner />
            <MostPopular places={InfiniteCarouselMockData} cityName={'Chicago'} />
            <LocalPlaces cityName={'Chicago'} />
            <EmailSubscription />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cityID = context && context.params ? context.params.id : null
    console.log('TODO: Query city with ID: ', cityID)
    return {
        props: {},
    }
}

export default City
