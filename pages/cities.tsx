import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import CitiesListView from 'components/ListView/CitiesListView'
import axios, { FETCH_CITIES } from 'config/AxiosConfig'
import { GetStaticProps, NextPage } from 'next'
import React from 'react'
import { IParentRegion } from 'utilities/types/parentRegion'

interface IServerSideProps {
    stateList: IParentRegion[]
    provinceList: IParentRegion[]
}

interface ICitiesProps extends IServerSideProps {}

const Cities: NextPage<ICitiesProps> = ({ stateList, provinceList }) => {
    return JSON.parse(localStorage.getItem('isPrelaunch')) ? (
        <p>Redirecting...</p>
    ) : (
        <>
            <CitiesListView stateList={stateList ? stateList : []} provinceList={provinceList ? provinceList : []} />
            <EmailSubscription />
        </>
    )
}

export const getServerSideProps: GetStaticProps = async () => {
    let stateList: IParentRegion[] = []
    let provinceList: IParentRegion[] = []
    await axios
        .get(FETCH_CITIES)
        .then((res) => {
            if (res && res.data) {
                stateList = res.data.USA
                provinceList = res.data.CAN
            }
        })
        .catch((err) => {
            console.log('Fetch failed in cities: ', err)
        })
    return {
        props: { stateList: stateList ? stateList : [], provinceList: provinceList ? provinceList : [] },
    }
}

export default Cities
