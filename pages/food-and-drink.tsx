import EmailSubscription from 'components/EmailSubscription/EmailSubscription'
import CategoriesListView from 'components/ListView/CategoriesListView'
import axios, { FETCH_CATEGORIES } from 'config/AxiosConfig'
import { GetServerSideProps } from 'next'
import React from 'react'
import { ICategory } from 'utilities/types/category'

interface IServerSideProps {
    categoryList?: ICategory[]
}

interface IFoodAndDrinkProps extends IServerSideProps {}

const FoodAndDrink: React.FC<IFoodAndDrinkProps> = ({ categoryList }) => {
    return (
        <>
            <CategoriesListView categoryList={categoryList ? categoryList : []} />
            <EmailSubscription />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let categoryList = []
    await axios
        .get(FETCH_CATEGORIES)
        .then((res) => {
            categoryList = res.data
        })
        .catch((err) => {
            console.log('Error detected in food-and-drink')
        })
    return {
        props: { categoryList: categoryList },
    }
}

export default FoodAndDrink
