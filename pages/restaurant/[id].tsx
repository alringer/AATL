import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import HaveYouBeenTo from 'components/HaveYouBeenTo/HaveYouBeenTo'
import PlaceBanner from 'components/PlaceBanner/PlaceBanner'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import axios, { FETCH_RESTAURANT, REGISTER_VIEW } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import CardPlaceSmallList from 'sections/CardsList/CardPlaceSmallList'
import CardRecommendationWideList from 'sections/CardsList/CardRecommendationWideList'
import { IVenue } from 'utilities/types/venue'
interface IServerSideProps {
    recommendationID: number | null
    restaurantID: number | null
    venueInformation: IVenue | null
}
interface IRestaurantProps extends IServerSideProps {}

const Restaurant: React.FC<IRestaurantProps> = ({ recommendationID, restaurantID, venueInformation }) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    React.useEffect(() => {
        if (venueInformation === null || venueInformation === undefined) {
            enqueueSnackbar('', {
                content: (
                    <div>
                        <Snackbar
                            type={B.ERROR_RESTAURANT.Type}
                            title={B.ERROR_RESTAURANT.Title}
                            message={<SnackbarMessageBody>{B.ERROR_RESTAURANT.Body}</SnackbarMessageBody>}
                        />
                    </div>
                ),
            })
            router.push('/')
        } else {
            axios
                .get(REGISTER_VIEW(venueInformation.id))
                .then((res) => {})
                .catch((err) => console.log(err))
        }
    }, [])

    const recommendationsSubTitle = `${S.RESTAURANT_PAGE.RecommendationsSectionSubTitlePartOne} ${
        venueInformation && venueInformation.name ? venueInformation.name : ''
    } ${S.RESTAURANT_PAGE.RecommendationsSectionSubTitlePartTwo} ${
        venueInformation &&
        venueInformation.categories &&
        venueInformation.categories[0] &&
        venueInformation.categories[0].longName &&
        S.RESTAURANT_PAGE.RecommendationsSectionSubTitlePartThree + ' ' + venueInformation.categories[0].longName
    }.`

    return venueInformation ? (
        <>
            <PlaceBanner venueInformation={venueInformation} />
            <CardRecommendationWideList
                highlightedRecommendationID={recommendationID}
                isFull={false}
                placeID={venueInformation ? venueInformation.id : null}
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
            {venueInformation && venueInformation.similarVenues && venueInformation.similarVenues.length > 0 ? (
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
            ) : null}
            <EmailSubscription />
        </>
    ) : null
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const recommendationID = context.query.r
    const restaurantID = context && context.params ? context.params.id : undefined
    let venueInformation = undefined
    if (restaurantID !== undefined && restaurantID !== undefined) {
        if (recommendationID !== undefined && recommendationID !== undefined) {
            await axios
                .get(FETCH_RESTAURANT(Number(restaurantID), Number(recommendationID)))
                .then((res) => {
                    console.log('Fetch Restaurant with Recommendation: ', res.data)
                    venueInformation = res.data
                })
                .catch((err) => console.log('Error: ', err))
        } else {
            await axios
                .get(FETCH_RESTAURANT(Number(restaurantID)))
                .then((res) => {
                    console.log('Fetch Restaurant: ', res.data)
                    venueInformation = res.data
                })
                .catch((err) => console.log('Error: ', err))
        }
    }
    return {
        props: {
            recommendationID: recommendationID !== undefined ? recommendationID : null,
            restaurantID: restaurantID !== undefined ? restaurantID : null,
            venueInformation: venueInformation !== undefined ? venueInformation : null,
        },
    }
}

export default Restaurant
