import CityBanner from 'components/CityBanner/CityBanner'
import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import LocalPlaces from 'components/LocalPlaces/LocalPlaces'
import MostPopular from 'components/MostPopular/MostPopular'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import axios, { FETCH_CITY } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import { IParentRegion } from 'utilities/types/parentRegion'

interface IServerSideProps {
    cityInformation: IParentRegion | null
}

interface ICityProps extends IServerSideProps {}

const City: React.FC<ICityProps> = ({ cityInformation }) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

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
    }, [])

    return (
        <>
            <CityBanner cityInformation={cityInformation} />
            <MostPopular cityInformation={cityInformation} />
            <LocalPlaces cityName={cityInformation?.city} />
            <EmailSubscription />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cityID = context && context.params ? context.params.id : null
    console.log('TODO: Query city with ID: ', cityID)
    let cityInformation = undefined
    if (cityID) {
        await axios
            .get(FETCH_CITY(Number(cityID)))
            .then((res) => {
                console.log('Fetch City: ', res.data)
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
