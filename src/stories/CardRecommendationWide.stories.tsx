import { storiesOf } from '@storybook/react'
import PlaceImage from 'assets/mock-images/restaurant_image.jpg'
import CardRecommendationWide, {
    CardRecommendationWideEnum,
} from 'components/CardRecommendationWide/CardRecommendationWide'
import { flaggedEnum } from 'utilities/types/enumerations'
import { IRecommendation } from 'utilities/types/recommendation'
import { mockUser } from 'utilities/types/userProfile'
import { mockVenue } from 'utilities/types/venue'

const recommendationDefault: IRecommendation = {
    id: 12,
    imageCDNUrl: PlaceImage,
    venue: mockVenue,
    title: 'An amazingly rich and diverse range of edible delights. An amazingly rich and diverse range of edible delights',
    content:
        'The only moment, the only life we have is in the NOW. The only moment, the only life we have is in the NOW The only moment, the only life we have is in the NOW The only moment, the only life we have is in the NOW ',
    createdAt: '',
    createdBy: mockUser,
    deletedAt: '',
    flagged: flaggedEnum.None,
    updatedAt: '',
    rating: 4,
}

const recommendationLongTitle: IRecommendation = {
    ...recommendationDefault,
    title: 'An amazingly rich and diverse range of edible delights. An amazingly rich and diverse range of edible delights. An amazingly rich and diverse range of edible delights. An amazingly rich and diverse range of edible delights. An amazingly rich and diverse range of edible delights. An amazingly rich and diverse range of edible delights.',
}

const recommendationLongDescription: IRecommendation = {
    ...recommendationDefault,
    content:
        'The only moment, the only life we have is in the NOW. The only moment, the only life we have is in the NOW The only moment, the only life we have is in the NOW The only moment, the only life we have is in the NOW The only moment, the only life we have is in the NOW. The only moment, the only life we have is in the NOW The only moment, the only life we have is in the NOW The only moment, the only life we have is in the NOW The only moment, the only life we have is in the NOW. The only moment, the only life we have is in the NOW The only moment, the only life we have is in the NOW The only moment, the only life we have is in the NOW The only moment, the only life we have is in the NOW. The only moment, the only life we have is in the NOW The only moment, the only life we have is in the NOW The only moment, the only life we have is in the NOW',
}

const recommendationLongTitleAndLongDescription: IRecommendation = {
    ...recommendationDefault,
    title: recommendationLongTitle.title,
    content: recommendationLongDescription.content,
}

export const RecommendationCardData = {
    default: recommendationDefault,
    longTitle: recommendationLongTitle,
    longDescription: recommendationLongDescription,
    longTitleAndDescription: recommendationLongTitleAndLongDescription,
}

export const RecommendationCardsListData = {
    default: {
        title: 'Recommendations',
        subTitle: 'Recommendations of Sushi Ota by locals who love sushi.',
        recommendations: Object.entries(RecommendationCardData).map((entries: any[]) => {
            const recommendationCardData = entries[1]
            return recommendationCardData
        }),
    },
}

storiesOf('Card: Wide Recommendation Card', module)
    .add('Default - Full Card', () => {
        return <CardRecommendationWide isFull={true} recommendation={RecommendationCardData.default} />
    })
    .add('Default - Long Title Full Card', () => {
        return <CardRecommendationWide isFull={true} recommendation={RecommendationCardData.longTitle} />
    })
    .add('Default - Long Description Full Card', () => {
        return <CardRecommendationWide isFull={true} recommendation={RecommendationCardData.longDescription} />
    })
    .add('Default - Long Title and Description Full Card', () => {
        return <CardRecommendationWide isFull={true} recommendation={RecommendationCardData.longTitleAndDescription} />
    })
    .add('Profile - Full Card', () => {
        return (
            <div style={{ maxWidth: '690px', width: '100%' }}>
                <CardRecommendationWide
                    type={CardRecommendationWideEnum.Profile}
                    isFull={false}
                    recommendation={RecommendationCardData.default}
                />
            </div>
        )
    })
    .add('Profile - Long Title Full Card', () => {
        return (
            <div style={{ maxWidth: '690px', width: '100%' }}>
                <CardRecommendationWide
                    type={CardRecommendationWideEnum.Profile}
                    isFull={false}
                    recommendation={RecommendationCardData.longTitle}
                />
            </div>
        )
    })
    .add('Profile - Long Description Full Card', () => {
        return (
            <div style={{ maxWidth: '690px', width: '100%' }}>
                <CardRecommendationWide
                    type={CardRecommendationWideEnum.Profile}
                    isFull={false}
                    recommendation={RecommendationCardData.longDescription}
                />
            </div>
        )
    })
    .add('Profile - Long Title and Description Full Card', () => {
        return (
            <div style={{ maxWidth: '690px', width: '100%' }}>
                <CardRecommendationWide
                    type={CardRecommendationWideEnum.Profile}
                    isFull={false}
                    recommendation={RecommendationCardData.longTitleAndDescription}
                />
            </div>
        )
    })
    .add('Venue Page - Full Card', () => {
        return (
            <CardRecommendationWide
                isFull={true}
                recommendation={RecommendationCardData.default}
                type={CardRecommendationWideEnum.Restaurant}
            />
        )
    })
    .add('Venue Page - Long Title Full Card', () => {
        return (
            <CardRecommendationWide
                isFull={true}
                recommendation={RecommendationCardData.longTitle}
                type={CardRecommendationWideEnum.Restaurant}
            />
        )
    })
    .add('Venue Page - Long Description Full Card', () => {
        return (
            <CardRecommendationWide
                isFull={true}
                recommendation={RecommendationCardData.longDescription}
                type={CardRecommendationWideEnum.Restaurant}
            />
        )
    })
    .add('Venue Page - Long Title and Description Full Card', () => {
        return (
            <CardRecommendationWide
                isFull={true}
                recommendation={RecommendationCardData.longTitleAndDescription}
                type={CardRecommendationWideEnum.Restaurant}
            />
        )
    })
