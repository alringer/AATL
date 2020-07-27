import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import CitiesListView from 'components/ListView/CitiesListView'
import axios, { FETCH_CITIES } from 'config/AxiosConfig'
import { GetStaticProps } from 'next'
import React from 'react'

const Cities = ({ stateList, provinceList }) => {
    return (
        <>
            <CitiesListView stateList={stateList ? stateList : []} provinceList={provinceList ? provinceList : []} />
            <EmailSubscription />
        </>
    )
}

export const getServerSideProps: GetStaticProps = async (context) => {
    let stateList = []
    let provinceList = []
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
