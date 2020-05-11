import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import CitiesListView from 'components/ListView/CitiesListView'
import { GetStaticProps } from 'next'
import React from 'react'
import { mockProvinceList, mockStateList } from 'utilities/types/city'

const Cities = ({ stateList, provinceList }) => {
    return (
        <>
            <CitiesListView stateList={stateList ? stateList : []} provinceList={provinceList ? provinceList : []} />
            <EmailSubscription />
        </>
    )
}

export const getServerSideProps: GetStaticProps = async (context) => {
    return {
        props: { stateList: mockStateList, provinceList: mockProvinceList },
    }
}

export default Cities
