import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import HaveYouBeenTo from 'components/HaveYouBeenTo/HaveYouBeenTo'
import PlaceBanner from 'components/PlaceBanner/PlaceBanner'
// import Snackbar from 'components/Snackbar/Snackbar'
import axios, { FETCH_RESTAURANT, REGISTER_VIEW } from 'config/AxiosConfig'
// import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
// import { useSnackbar } from 'notistack'
import React from 'react'
import CardPlaceSmallList from 'sections/CardsList/CardPlaceSmallList'
import CardRecommendationWideList from 'sections/CardsList/CardRecommendationWideList'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IVenue } from 'utilities/types/venue'
interface IServerSideProps {
    recommendationID: number | null
    restaurantID: number | null
    venueInformation: IVenue | null
}
interface IRestaurantProps extends IServerSideProps, IWithAuthInjectedProps {}

const Restaurant: NextPage<IRestaurantProps> = ({ recommendationID, restaurantID, venueInformation }) => {
    const router = useRouter()
    // const { enqueueSnackbar } = useSnackbar()
    React.useEffect(() => {
        console.log('Venue page with restaurant: ', venueInformation)
        console.log('Venue page with recommendationID: ', recommendationID)
        console.log('Venue page with restaurantID: ', restaurantID)
        if (venueInformation === null) {
            router.push('/')
        } else {
            axios
                .get(REGISTER_VIEW(venueInformation.id))
                .then((res) => {})
                .catch((err) => console.log(err))
        }
    }, [])

    // React.useEffect(() => {
    //     if (!venueInformation) {
    //         // enqueueSnackbar('', {
    //         //     content: (
    //         //         <div>
    //         //             <Snackbar
    //         //                 type={B.COPY_TO_CLIPBOARD.Type}
    //         //                 title={B.COPY_TO_CLIPBOARD.Title}
    //         //                 message={B.COPY_TO_CLIPBOARD.Body}
    //         //             />
    //         //         </div>
    //         //     ),
    //         // })
    //         // router.push(`${R.ROUTE_ITEMS.home}`)
    //     }
    // }, [])

    const recommendationsSubTitle = `${S.RESTAURANT_PAGE.RecommendationsSectionSubTitlePartOne} ${
        venueInformation && venueInformation.name ? venueInformation.name : ''
    } ${S.RESTAURANT_PAGE.RecommendationsSectionSubTitlePartTwo} ${
        venueInformation &&
        venueInformation.categories &&
        venueInformation.categories[0] &&
        venueInformation.categories[0].longName &&
        S.RESTAURANT_PAGE.RecommendationsSectionSubTitlePartThree + ' ' + venueInformation.categories[0].longName
    }.`

    return (
        <>
            <PlaceBanner venueInformation={venueInformation} />
            <CardRecommendationWideList
                isFull={false}
                title={S.RESTAURANT_PAGE.RecommendationsSectionTitle}
                subTitle={recommendationsSubTitle}
                venueRecommendationsInformation={
                    venueInformation && venueInformation.recommendations ? venueInformation.recommendations : null
                }
                pageNumber={
                    venueInformation && venueInformation.recommendations && venueInformation.recommendations.pageNumber
                        ? venueInformation.recommendations.pageNumber
                        : null
                }
                pageSize={
                    venueInformation && venueInformation.recommendations && venueInformation.recommendations.pageSize
                        ? venueInformation.recommendations.pageSize
                        : null
                }
                totalCount={
                    venueInformation && venueInformation.recommendations && venueInformation.recommendations.totalCount
                        ? venueInformation.recommendations.totalCount
                        : null
                }
            />
            <HaveYouBeenTo
                placeID={venueInformation ? venueInformation.id : null}
                placeName={venueInformation ? venueInformation.name : null}
            />
            <CardPlaceSmallList
                title={`Places similar to ${venueInformation ? venueInformation.name : null}`}
                subTitle={`A sampling of places similar to ${
                    venueInformation ? venueInformation.name : null
                } that may peak your appetite.`}
                places={venueInformation ? venueInformation.similarVenues : null}
                category={
                    venueInformation &&
                    venueInformation.categories &&
                    venueInformation.categories[0] &&
                    venueInformation.categories[0].longName
                        ? venueInformation.categories[0].longName
                        : ''
                }
            />
            <EmailSubscription />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const recommendationID = context.query.r
    const restaurantID = context && context.params ? context.params.id : null
    let venueInformation
    if (restaurantID) {
        await axios
            .get(FETCH_RESTAURANT(Number(restaurantID)))
            .then((res) => {
                venueInformation = res.data
            })
            .catch((err) => console.log('Error: ', err))
    }
    return {
        props: {
            recommendationID: recommendationID !== undefined ? recommendationID : null,
            restaurantID: restaurantID !== undefined ? restaurantID : null,
            venueInformation: venueInformation ? venueInformation : null,
        },
    }
}

export default withAuth(Restaurant)
