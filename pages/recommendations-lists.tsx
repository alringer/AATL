import RecommendationsListsBanner from 'components/RecommendationsLists/RecommendationListsBanner/RecommendationsListsBanner'
import RecommendationsListsCards from 'components/RecommendationsLists/RecommendationsListsCards/RecommendationsListsCards'
import axios, { RECOMMENDATION_LIST_METAS_DETAILS } from 'config/AxiosConfig'
import { GetStaticProps, NextPage } from 'next'
import React from 'react'
import { IPageable } from 'utilities/types/pageable'

interface IServerSideProps {
    pageable: IPageable
}

interface IRecommendationsListsProps extends IServerSideProps {}

const RecommendationsLists: NextPage<IRecommendationsListsProps> = ({ pageable }) => {
    return (
        <>
            <RecommendationsListsBanner />
            <RecommendationsListsCards
                initialRecommendationsLists={pageable && pageable.content ? pageable.content : []}
                initialTotalPages={pageable ? pageable.totalPages : 1}
                initialPage={pageable && pageable.pageable ? pageable.pageable.pageNumber : 0}
                initialPageSize={pageable && pageable.pageable ? pageable.pageable.pageSize : 3}
            />
        </>
    )
}

export const getServerSideProps: GetStaticProps = async () => {
    let pageable: IPageable | null = null
    await axios
        .get(RECOMMENDATION_LIST_METAS_DETAILS(0, 7))
        .then((res) => {
            if (res && res.data) {
                pageable = res.data
            }
        })
        .catch((err) => {
            console.log('Fetch failed in recommendations-lists: ', err)
        })
    return {
        props: { pageable: pageable ? pageable : null },
    }
}

export default RecommendationsLists
