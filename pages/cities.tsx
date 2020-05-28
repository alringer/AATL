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
            // categoryList = res.data
            console.log(res)
        })
        .catch((err) => {
            console.log('Fetch failed in cities')
        })
    return {
        props: { stateList: stateList, provinceList: provinceList },
    }
    // return {
    //     props: { stateList: mockStateList, provinceList: mockProvinceList },
    // }
}

export default Cities
