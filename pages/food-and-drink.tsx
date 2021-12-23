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
    return !JSON.parse(localStorage.getItem('isPrelaunch')) ? (
        <>
            <CategoriesListView categoryList={categoryList ? categoryList : []} />
            <EmailSubscription />
        </>
    ) : (
        <p>Redirecting...</p>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    let categoryList: ICategory[] = []
    await axios
        .get(FETCH_CATEGORIES)
        .then((res) => {
            categoryList = res.data
        })
        .catch((err) => {
            console.log('Fetch failed in food-and-drink', err)
        })
    return {
        props: { categoryList: categoryList },
    }
}

export default FoodAndDrink
