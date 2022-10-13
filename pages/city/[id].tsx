import CityBanner from 'components/CityBanner/CityBanner'
import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import LocalPlaces from 'components/LocalPlaces/LocalPlaces'
import MostPopular from 'components/MostPopular/MostPopular'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import axios, { FETCH_CITY, FETCH_LOCAL_PLACES } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import { ILocalPlacesTab } from 'utilities/types/localPlacesTab'
import { IParentRegion } from 'utilities/types/parentRegion'
import { IRecommendation } from 'utilities/types/recommendation'
import { IVenue } from 'utilities/types/venue'

interface IServerSideProps {
    cityInformation: IParentRegion | null
}

interface ICityProps extends IServerSideProps {}

const City: React.FC<ICityProps> = ({ cityInformation }) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const refLocalPlaces = React.useRef<HTMLDivElement | null>(null)
    const [currentTab, setCurrentTab] = React.useState<ILocalPlacesTab>(ILocalPlacesTab.MOST_RECOMMENDED)
    const [currentPlaces, setCurrentPlaces] = React.useState<IVenue[]>([])
    const [currentRecommendations, setCurrentRecommendations] = React.useState<IRecommendation[]>([])
    const [currentTotal, setCurrentTotal] = React.useState(0)
    const [currentPageCount, setCurrentPageCount] = React.useState(0)
    const [currentPage, setCurrentPage] = React.useState(1)

    React.useEffect(() => {
        if (!cityInformation) {
            enqueueSnackbar('', {
                content: (
                    <div>
                        <Snackbar
                            type={B.ERROR_CITY.Type}
                            title={B.ERROR_CITY.Title}
                            message={<SnackbarMessageBody>{B.ERROR_CITY.Body}</SnackbarMessageBody>}
                        />
                    </div>
                ),
            })
            router.push('/')
        }
    }, [cityInformation])

    React.useEffect(() => {
        fetchData(0, currentTab)
    }, [])

    const handleTabChange = (targetTab: ILocalPlacesTab) => {
        if (currentTab !== targetTab) {
            fetchData(0, targetTab)
            setCurrentPage(1)
        }
    }

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        fetchData(value - 1, currentTab)
        setCurrentPage(value)
    }

    const fetchData = (page: number, sortEnum: ILocalPlacesTab) => {
        setCurrentTab(sortEnum)
        axios
            .get(FETCH_LOCAL_PLACES(cityInformation?.id, page, sortEnum))
            .then((res) => {
                console.log(res)
                switch (sortEnum) {
                    case ILocalPlacesTab.MOST_RECOMMENDED:
                        setCurrentRecommendations(res.data)
                        break
                    case ILocalPlacesTab.LATEST_RECOMMENDATIONS:
                        setCurrentRecommendations(res.data)
                        break
                    case ILocalPlacesTab.NEW_PLACES:
                        setCurrentPlaces(res.data)
                        break
                    case ILocalPlacesTab.TRENDING_PLACES:
                        setCurrentPlaces(res.data)
                        break
                }
                const total = Number(res.headers['x-total-count'])
                const pageCount = Math.ceil(total / 5)
                setCurrentTotal(total)
                setCurrentPageCount(pageCount)
            })
            .catch((err) => console.log(err))
    }

    const handleClickViewMore = () => {
        if (refLocalPlaces) {
            handleTabChange(ILocalPlacesTab.TRENDING_PLACES)
            refLocalPlaces?.current?.scrollIntoView()
        }
    }

    return JSON.parse(localStorage.getItem('isPrelaunch')) ? (
        <p>Redirecting...</p>
    ) : cityInformation ? (
        <>
            <CityBanner cityInformation={cityInformation} />
            <MostPopular cityInformation={cityInformation} handleClickViewMore={handleClickViewMore} />
            <LocalPlaces
                cityInformation={cityInformation}
                currentTab={currentTab}
                currentPlaces={currentPlaces}
                currentRecommendations={currentRecommendations}
                currentTotal={currentTotal}
                currentPageCount={currentPageCount}
                currentPage={currentPage}
                handleTabChange={handleTabChange}
                handlePagination={handlePagination}
                refLocalPlaces={refLocalPlaces}
            />
            <EmailSubscription />
        </>
    ) : null
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cityID = context && context.params ? context.params.id : null
    let cityInformation = undefined
    if (cityID) {
        await axios
            .get(FETCH_CITY(Number(cityID)))
            .then((res) => {
                cityInformation = res.data
            })
            .catch((err) => console.log('Error: ', err))
    }
    return {
        props: {
            cityInformation: cityInformation ? cityInformation : null,
        },
    }
}

export default City
