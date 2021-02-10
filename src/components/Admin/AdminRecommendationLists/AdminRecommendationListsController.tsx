import RecommendationListCard from 'components/Admin/AdminRecommendationLists/RecommendationListCard'
import axios, { FEATURED_LISTS, FEATURED_LISTS_WITH_ID } from 'config/AxiosConfig'
import * as S from 'constants/StringConstants'
import React from 'react'
import { ReactSortable } from 'react-sortablejs'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'
import {
    AdminRecommendationListsActionsColumn,
    AdminRecommendationListsImageColumn,
    AdminRecommendationListsRecommendationsColumn,
    AdminRecommendationListsSubTitleColumn,
    AdminRecommendationListsTableContainer,
    AdminRecommendationListsTableHeaderRow,
    AdminRecommendationListsTitleColumn,
} from './AdminRecommendationLists.style'

interface IAdminRecommendationListsControllerProps extends IWithAuthInjectedProps {
    fetchRecommendationLists: () => void
    recommendationLists: IRecommendationListMeta[]
    featured: boolean
}

const AdminRecommendationListsController: React.FC<IAdminRecommendationListsControllerProps> = ({
    recommendationLists,
    featured,
    getTokenConfig,
    fetchRecommendationLists,
}) => {
    const [lists, setLists] = React.useState<IRecommendationListMeta[]>([])

    React.useEffect(() => {
        setLists(recommendationLists)
    }, [recommendationLists])

    const handleRemove = (e) => {
        if (featured) {
            unfeatureList(e.item.id)
        }
    }

    const handleAdd = (e) => {
        if (featured) {
            featureList(e.item.id, e.newIndex)
        }
    }

    const handleUpdate = (e) => {
        if (featured) {
            const token = getTokenConfig()
            const config = {
                headers: {
                    Authorization: token,
                },
            }
            const targetList = lists.find(
                (recommendationListMeta: IRecommendationListMeta) =>
                    String(recommendationListMeta.id) === String(e.item.id)
            )
            const targetFeaturedListID = targetList && targetList.featuredList ? targetList.featuredList.id : null
            if (targetFeaturedListID !== null) {
                const payload = {
                    recommendationListMetaId: targetFeaturedListID,
                    sortOrder: e.newIndex,
                }
                axios
                    .put(FEATURED_LISTS_WITH_ID(targetFeaturedListID), payload, config)
                    .then((res) => {
                        fetchRecommendationLists()
                    })
                    .catch((err) => console.log(err))
            }
        }
    }

    const featureList = (listID: number, newIndex?: number) => {
        const token = getTokenConfig()
        const config = {
            headers: {
                Authorization: token,
            },
        }
        const payload =
            newIndex !== undefined
                ? {
                      recommendationListMetaId: listID,
                      sortOrder: newIndex,
                  }
                : {}
        axios
            .post(FEATURED_LISTS, payload, config)
            .then((res) => {
                fetchRecommendationLists()
            })
            .catch((err) => console.log(err))
    }

    const unfeatureList = (listID: number) => {
        const token = getTokenConfig()
        const config = {
            headers: {
                Authorization: token,
            },
        }
        const targetList = lists.find(
            (recommendationListMeta: IRecommendationListMeta) => String(recommendationListMeta.id) === String(listID)
        )
        const targetFeaturedListID = targetList && targetList.featuredList ? targetList.featuredList.id : null
        if (targetFeaturedListID !== null) {
            axios
                .delete(FEATURED_LISTS_WITH_ID(targetFeaturedListID), config)
                .then((res) => {
                    fetchRecommendationLists()
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <div>
            <AdminRecommendationListsTableContainer id="">
                <AdminRecommendationListsTableHeaderRow>
                    <AdminRecommendationListsImageColumn>
                        {S.ADMIN_PAGE.AdminRecommendationLists.CardImage}
                    </AdminRecommendationListsImageColumn>
                    <AdminRecommendationListsTitleColumn>
                        {S.ADMIN_PAGE.AdminRecommendationLists.CardTitle}
                    </AdminRecommendationListsTitleColumn>
                    <AdminRecommendationListsSubTitleColumn>
                        {S.ADMIN_PAGE.AdminRecommendationLists.CardSubtitle}
                    </AdminRecommendationListsSubTitleColumn>
                    <AdminRecommendationListsRecommendationsColumn>
                        {S.ADMIN_PAGE.AdminRecommendationLists.CardRecommendations}
                    </AdminRecommendationListsRecommendationsColumn>
                    <AdminRecommendationListsActionsColumn>
                        {S.ADMIN_PAGE.AdminRecommendationLists.CardActions}
                    </AdminRecommendationListsActionsColumn>
                </AdminRecommendationListsTableHeaderRow>
                <ReactSortable
                    list={lists}
                    setList={setLists}
                    group="shared"
                    animation={150}
                    onRemove={handleRemove}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                >
                    {lists.map((list: IRecommendationListMeta, index: number) => {
                        return (
                            <RecommendationListCard
                                key={list.id}
                                list={list}
                                featured={featured}
                                featureList={featureList}
                                unfeatureList={unfeatureList}
                            />
                        )
                    })}
                </ReactSortable>
            </AdminRecommendationListsTableContainer>
        </div>
    )
}

export default withAuth(AdminRecommendationListsController)
