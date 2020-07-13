import PlaceImage from 'assets/mock-images/sushi_image.png'
import React from 'react'
import { AdminMenuPageSubTitle, AdminMenuPageTitle } from '../AdminShared.style'
import { AdminRecommendationListsContainer, FeatureListsTitle } from './AdminRecommendationLists.style'
import AdminRecommendationListsController from './AdminRecommendationListsController'

export interface IRecommendationList {
    id: number
    imgSrc: string
    title: string
    subTitle: string
    recommendations: number
}

const mockFeaturedLists: IRecommendationList[] = [
    {
        id: 0,
        imgSrc: PlaceImage,
        title: 'The Burger Kings',
        subTitle: '5 amazing burgers recommended by 5 amazing chefs',
        recommendations: 10,
    },
    {
        id: 3,
        imgSrc: PlaceImage,
        title: 'The Sushi Place',
        subTitle: '5 amazing burgers recommended by 5 amazing chefs',
        recommendations: 10,
    },
    {
        id: 2,
        imgSrc: PlaceImage,
        title: "Chili's",
        subTitle: '5 amazing burgers recommended by 5 amazing chefs',
        recommendations: 10,
    },
]
const mockOtherLists: IRecommendationList[] = [
    {
        id: 4,
        imgSrc: PlaceImage,
        title: 'Woomiok',
        subTitle: '5 amazing burgers recommended by 5 amazing chefs',
        recommendations: 10,
    },
    {
        id: 5,
        imgSrc: PlaceImage,
        title: 'Tajima Ramen',
        subTitle: '5 amazing burgers recommended by 5 amazing chefs',
        recommendations: 10,
    },
    {
        id: 6,
        imgSrc: PlaceImage,
        title: "McDonald's",
        subTitle: '5 amazing burgers recommended by 5 amazing chefs',
        recommendations: 10,
    },
]

interface IAdminRecommendationListsProps {}

const AdminRecommendationLists: React.FC<IAdminRecommendationListsProps> = () => {
    const [featuredLists, setFeaturedLists] = React.useState({ id: 0, lists: mockFeaturedLists })
    const [otherLists, setOtherLists] = React.useState({ id: 1, lists: mockOtherLists })

    return (
        <AdminRecommendationListsContainer>
            <AdminMenuPageTitle>Recommendation Lists</AdminMenuPageTitle>
            <AdminMenuPageSubTitle>
                A curated lists of recommendations. Selected lists will be displayed in the featured slideshow in the
                order arranged here. Up to 7 lists can be featured.
            </AdminMenuPageSubTitle>
            <FeatureListsTitle>Featured Lists</FeatureListsTitle>
            <AdminRecommendationListsController recommendationLists={featuredLists} />
            <FeatureListsTitle>Other Lists</FeatureListsTitle>
            <AdminRecommendationListsController recommendationLists={otherLists} />
        </AdminRecommendationListsContainer>
    )
}

export default AdminRecommendationLists
