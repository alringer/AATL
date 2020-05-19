import EarlImage from 'assets/mock-images/earl-sandwich.jpg'
import PlaceImageTwo from 'assets/mock-images/restaurant_image.jpg'
import PlaceImage from 'assets/mock-images/sushi_image.png'

export interface IInfiniteCarouselCard {
    imgSrc: string
    placeName: string
    placeID: number
    placeCategories: string[]
    placeDescription: string
}

export const InfiniteCarouselMockData: IInfiniteCarouselCard[] = [
    {
        imgSrc: PlaceImage,
        placeName: "Montgomery's",
        placeID: 2,
        placeCategories: ['Steakhouse', 'BBQ'],
        placeDescription:
            'The best reason you ever had to eat sushi, drink sake and get sake bombed in San Diego. The best reason you ever had to eat sushi, drink sake and get GOOD FOOOOOOOD',
    },
    {
        imgSrc: PlaceImageTwo,
        placeName: "Ditka's",
        placeID: 3,
        placeCategories: ['BBQ', 'Sushi'],
        placeDescription: 'The best reason you ever had to eat sushi!',
    },
    {
        imgSrc: EarlImage,
        placeName: "Earl's Sandwich",
        placeID: 4,
        placeCategories: ['Sandwich', 'American'],
        placeDescription: "I definitely recommend the Earl's sandwich. My FAVORITE place in San Diego!",
    },
]
