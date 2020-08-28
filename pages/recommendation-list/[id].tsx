import RecommendationListBanner from 'components/RecommendationList/RecommendationListBanner/RecommendationListBanner'
import RecommendationListCards from 'components/RecommendationList/RecommendationListCards/RecommendationListCards'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import axios, { RECOMMENDATION_LIST_META_WITH_ID } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'

interface IServerSideProps {
    recommendationListMetaInput: IRecommendationListMeta | null
    recommendationListMetaID: number | null
}

interface IRecommendationListProps extends IServerSideProps {}

const RecommendationList: React.FC<IRecommendationListProps> = ({
    recommendationListMetaInput,
    recommendationListMetaID,
}) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const [recommendationListMeta, setRecommendationListMeta] = React.useState(recommendationListMetaInput)

    React.useEffect(() => {
        console.log('Received Recommendation List Meta: ', recommendationListMetaInput)
        console.log('Received Recommendation List Meta ID: ', recommendationListMetaID)
        if (!recommendationListMetaInput) {
            enqueueSnackbar('', {
                content: (
                    <div>
                        <Snackbar
                            type={B.ERROR_RECOMMENDATION_LIST.Type}
                            title={B.ERROR_RECOMMENDATION_LIST.Title}
                            message={<SnackbarMessageBody>{B.ERROR_USER_PROFILE.Body}</SnackbarMessageBody>}
                        />
                    </div>
                ),
            })
            router.push('/')
        }
    }, [])

    const fetchRecommendationListMeta = () => {
        axios
            .get(RECOMMENDATION_LIST_META_WITH_ID(recommendationListMetaID))
            .then((res) => {
                setRecommendationListMeta(res.data)
            })
            .catch((err) => console.log('Error: ', err))
    }

    return (
        <>
            <RecommendationListBanner
                recommendationListMeta={recommendationListMeta}
                fetchRecommendationListMeta={fetchRecommendationListMeta}
            />
            <RecommendationListCards
                recommendationListMeta={recommendationListMeta}
                fetchRecommendationListMeta={fetchRecommendationListMeta}
            />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const recommendationListMetaID =
        context && context.params && !isNaN(Number(context.params.id)) ? Number(context.params.id) : null
    let recommendationListMeta = null
    if (recommendationListMetaID !== null && recommendationListMetaID !== undefined) {
        await axios
            .get(RECOMMENDATION_LIST_META_WITH_ID(recommendationListMetaID))
            .then((res) => {
                recommendationListMeta = res.data
            })
            .catch((err) => console.log('Error: ', err))
    }
    return {
        props: {
            recommendationListMetaInput: recommendationListMeta,
            recommendationListMetaID: recommendationListMetaID,
        },
    }
}

export default RecommendationList
