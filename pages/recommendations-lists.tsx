import RecommendationsListsBanner from 'components/RecommendationsLists/RecommendationListsBanner/RecommendationsListsBanner'
import RecommendationsListsCards from 'components/RecommendationsLists/RecommendationsListsCards/RecommendationsListsCards'
import axios, { RECOMMENDATION_LIST_METAS } from 'config/AxiosConfig'
import { GetStaticProps, NextPage } from 'next'
import React from 'react'
import { IRecommendationListMeta, mockRecommendationListMeta } from 'utilities/types/recommendationListMeta'

interface IServerSideProps {
    // TODO: Replace the interface with the updated DTO for RecommendationListMeta for this page
    recommendationsLists: IRecommendationListMeta[]
}

interface IRecommendationsListsProps extends IServerSideProps {}

const RecommendationsLists: NextPage<IRecommendationsListsProps> = ({ recommendationsLists }) => {
    return (
        <>
            <RecommendationsListsBanner />
            <RecommendationsListsCards recommendationsLists={recommendationsLists} />
        </>
    )
}

export const getServerSideProps: GetStaticProps = async () => {
    let recommendationsLists: IRecommendationListMeta[] = []
    // TODO: Replace the endpoint with the new endpoint for this page
    await axios
        .get(RECOMMENDATION_LIST_METAS)
        .then((res) => {
            if (res && res.data) {
                recommendationsLists = res.data
            }
        })
        .catch((err) => {
            console.log('Fetch failed in recommendations-lists: ', err)
        })
    recommendationsLists = [
        { ...mockRecommendationListMeta },
        { ...mockRecommendationListMeta },
        { ...mockRecommendationListMeta },
    ]
    return {
        props: { recommendationsLists: recommendationsLists ? recommendationsLists : [] },
    }
}

export default RecommendationsLists
