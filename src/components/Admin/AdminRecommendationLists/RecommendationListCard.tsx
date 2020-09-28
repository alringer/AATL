import Image from 'components/Image/Image'
import * as S from 'constants/StringConstants'
import Link from 'next/link'
import React from 'react'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'
import {
    AdminRecommendationListsActionClickableText,
    AdminRecommendationListsActionsColumn,
    AdminRecommendationListsClickableText,
    AdminRecommendationListsImageColumn,
    AdminRecommendationListsRecommendationsColumn,
    AdminRecommendationListsSubTitleColumn,
    AdminRecommendationListsTableRow,
    AdminRecommendationListsTitleColumn,
} from './AdminRecommendationLists.style'

interface IRecommendationListCardProps {
    key: number | string
    list: IRecommendationListMeta
    featured: boolean
    featureList: (listID: number, newIndex?: number) => void
    unfeatureList: (listID: number) => void
}

const RecommendationListCard: React.FC<IRecommendationListCardProps> = ({
    list,
    featured,
    key,
    featureList,
    unfeatureList,
}) => {
    const handleClick = () => {
        if (featured) {
            unfeatureList(list.id)
        } else {
            featureList(list.id, 0)
        }
    }

    return (
        <div key={key} id={String(list.id)}>
            <AdminRecommendationListsTableRow>
                <AdminRecommendationListsImageColumn>
                    <Image src={list.imageCDNUrl} alt="image" />
                </AdminRecommendationListsImageColumn>
                <AdminRecommendationListsTitleColumn>
                    <Link href={`/recommendation-list/${list.id}`} passHref={true} prefetch={false}>
                        <AdminRecommendationListsClickableText>{list.title}</AdminRecommendationListsClickableText>
                    </Link>
                </AdminRecommendationListsTitleColumn>
                <AdminRecommendationListsSubTitleColumn>{list.subtitle}</AdminRecommendationListsSubTitleColumn>
                <AdminRecommendationListsRecommendationsColumn>
                    {list.spotlightedRecommendations && list.spotlightedRecommendations.length
                        ? list.spotlightedRecommendations.length
                        : 'null'}
                </AdminRecommendationListsRecommendationsColumn>
                <AdminRecommendationListsActionsColumn>
                    <AdminRecommendationListsActionClickableText onClick={handleClick}>
                        {featured
                            ? S.ADMIN_PAGE.AdminRecommendationLists.CardDontFeature
                            : S.ADMIN_PAGE.AdminRecommendationLists.CardFeature}
                    </AdminRecommendationListsActionClickableText>
                </AdminRecommendationListsActionsColumn>
            </AdminRecommendationListsTableRow>
        </div>
    )
}

export default RecommendationListCard
