import CityBanner from 'components/CityBanner/CityBanner'
import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import LocalPlaces from 'components/LocalPlaces/LocalPlaces'
import MostPopular from 'components/MostPopular/MostPopular'
import { GetServerSideProps } from 'next'
import React from 'react'
import { InfiniteCarouselMockData } from 'utilities/types/infiniteCarousel'
// import Snackbar from 'components/Snackbar/Snackbar'
// import * as B from 'constants/SnackbarConstants'
// import { useSnackbar } from 'notistack'
// import { useRouter } from 'next/router'

interface ICityProps {}

const City: React.FC<ICityProps> = () => {
    // TODO: Toast the user if the city does not exist
    // const router = useRouter()
    // const { enqueueSnackbar } = useSnackbar()

    // React.useEffect(() => {
    //     enqueueSnackbar('', {
    //         content: (
    //             <div>
    //                 <Snackbar
    //                     type={B.ERROR_CITY.Type}
    //                     title={B.ERROR_CITY.Title}
    //                     message={B.ERROR_CITY.Body}
    //                 />
    //             </div>
    //         ),
    //     })
    //     router.push('/')
    // }, [])

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
