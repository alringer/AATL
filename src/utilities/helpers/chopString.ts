import { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import { CardRecommendationWideEnum } from 'components/CardRecommendationWide/CardRecommendationWide'
import { DeviceNameEnum } from 'style/device'

export const chopStringSmallCallToAction = (input: string) => {
    return input.length > 65 ? `${input.slice(0, 65)}...` : input
}

export const chopStringSmallPlaceName = (input: string) => {
    return input.length > 20 ? `${input.slice(0, 20)}...` : input
}

export const chopStringSmallPlaceDescription = (input: string) => {
    return input.length > 90 ? `${input.slice(0, 90)}...` : input
}

export const chopStringInfiniteCarouselCardDescription = (input: string) => {
    return input.length > 140 ? `${input.slice(0, 140)}...` : input
}

export const chopStringPlaceName = (input: string, viewport: DeviceNameEnum, type: CardPlaceWideEnum) => {
    switch (viewport) {
        case DeviceNameEnum.laptop:
            if (type === CardPlaceWideEnum.Profile || type === CardPlaceWideEnum.ProfileOwnerList) {
                return input.length > 13 ? `${input.slice(0, 13)}...` : input
            } else if (type === CardPlaceWideEnum.Search) {
                return input.length > 18 ? `${input.slice(0, 18)}...` : input
            } else {
                return input.length > 29 ? `${input.slice(0, 29)}...` : input
            }
        case DeviceNameEnum.tablet:
            if (type === CardPlaceWideEnum.Profile || type === CardPlaceWideEnum.ProfileOwnerList) {
                return input.length > 16 ? `${input.slice(0, 16)}...` : input
            } else if (type === CardPlaceWideEnum.Search) {
                return input.length > 24 ? `${input.slice(0, 24)}...` : input
            } else {
                return input.length > 20 ? `${input.slice(0, 20)}...` : input
            }
        case DeviceNameEnum.mobile:
            return input.length > 40 ? `${input.slice(0, 40)}...` : input
        default:
            return input
    }
}

export const chopStringPlaceCategories = (input: string, viewport: DeviceNameEnum, type: CardPlaceWideEnum) => {
    switch (viewport) {
        case DeviceNameEnum.laptop:
            if (type === CardPlaceWideEnum.Profile || type === CardPlaceWideEnum.ProfileOwnerList) {
                return input.length > 33 ? `${input.slice(0, 33)}...` : input
            } else if (type === CardPlaceWideEnum.Search) {
                return input.length > 43 ? `${input.slice(0, 43)}...` : input
            } else {
                return input.length > 64 ? `${input.slice(0, 64)}...` : input
            }
        case DeviceNameEnum.tablet:
            if (type === CardPlaceWideEnum.Profile || type === CardPlaceWideEnum.ProfileOwnerList) {
                return input.length > 38 ? `${input.slice(0, 38)}...` : input
            } else if (type === CardPlaceWideEnum.Search) {
                return input.length > 50 ? `${input.slice(0, 50)}...` : input
            } else {
                return input.length > 44 ? `${input.slice(0, 44)}...` : input
            }
        case DeviceNameEnum.mobile:
            return input.length > 34 ? `${input.slice(0, 34)}...` : input
        default:
            return input
    }
}

export const chopStringPlaceLatestRecommendationTitle = (
    input: string,
    viewport: DeviceNameEnum,
    type: CardPlaceWideEnum
) => {
    switch (viewport) {
        case DeviceNameEnum.laptop:
            if (type === CardPlaceWideEnum.Profile || type === CardPlaceWideEnum.ProfileOwnerList) {
                return input.length > 30 ? `${input.slice(0, 30)}...` : input
            } else if (type === CardPlaceWideEnum.Search) {
                return input.length > 40 ? `${input.slice(0, 40)}...` : input
            } else {
                return input.length > 55 ? `${input.slice(0, 55)}...` : input
            }
        case DeviceNameEnum.tablet:
            if (type === CardPlaceWideEnum.Profile || type === CardPlaceWideEnum.ProfileOwnerList) {
                return input.length > 32 ? `${input.slice(0, 32)}...` : input
            } else if (type === CardPlaceWideEnum.Search) {
                return input.length > 40 ? `${input.slice(0, 40)}...` : input
            } else {
                return input.length > 35 ? `${input.slice(0, 35)}...` : input
            }
        case DeviceNameEnum.mobile:
            return input.length > 30 ? `${input.slice(0, 30)}...` : input
        default:
            return input
    }
}

export const chopStringPlaceLatestRecommendationContent = (
    input: string,
    viewport: DeviceNameEnum,
    type: CardPlaceWideEnum
) => {
    switch (viewport) {
        case DeviceNameEnum.laptop:
            if (type === CardPlaceWideEnum.Profile || type === CardPlaceWideEnum.ProfileOwnerList) {
                return input.length > 120 ? `${input.slice(0, 120)}...` : input
            } else if (type === CardPlaceWideEnum.Search) {
                return input.length > 150 ? `${input.slice(0, 150)}...` : input
            } else {
                return input.length > 210 ? `${input.slice(0, 210)}...` : input
            }
        case DeviceNameEnum.tablet:
            if (type === CardPlaceWideEnum.Profile || type === CardPlaceWideEnum.ProfileOwnerList) {
                return input.length > 120 ? `${input.slice(0, 120)}...` : input
            } else if (type === CardPlaceWideEnum.Search) {
                return input.length > 150 ? `${input.slice(0, 150)}...` : input
            } else {
                return input.length > 130 ? `${input.slice(0, 130)}...` : input
            }
        case DeviceNameEnum.mobile:
            return input.length > 120 ? `${input.slice(0, 120)}...` : input
        default:
            return input
    }
}

export const chopStringPlaceUserName = (input: string, viewport: DeviceNameEnum, type: CardPlaceWideEnum) => {
    switch (viewport) {
        case DeviceNameEnum.laptop:
            if (type === CardPlaceWideEnum.Profile || type === CardPlaceWideEnum.ProfileOwnerList) {
                return input.length > 32 ? `${input.slice(0, 32)}...` : input
            } else {
                return input.length > 42 ? `${input.slice(0, 42)}...` : input
            }
        case DeviceNameEnum.tablet:
            if (type === CardPlaceWideEnum.Profile || type === CardPlaceWideEnum.ProfileOwnerList) {
                return input.length > 31 ? `${input.slice(0, 31)}...` : input
            } else {
                return input.length > 36 ? `${input.slice(0, 36)}...` : input
            }
        case DeviceNameEnum.mobile:
            return input.length > 30 ? `${input.slice(0, 30)}...` : input
        default:
            return input
    }
}

export const chopStringPlaceUserByLine = (input: string, viewport: DeviceNameEnum, type: CardPlaceWideEnum) => {
    switch (viewport) {
        case DeviceNameEnum.laptop:
            if (type === CardPlaceWideEnum.Profile || type === CardPlaceWideEnum.ProfileOwnerList) {
                return input.length > 32 ? `${input.slice(0, 32)}...` : input
            } else {
                return input.length > 42 ? `${input.slice(0, 42)}...` : input
            }
        case DeviceNameEnum.tablet:
            if (type === CardPlaceWideEnum.Profile || type === CardPlaceWideEnum.ProfileOwnerList) {
                return input.length > 35 ? `${input.slice(0, 35)}...` : input
            } else {
                return input.length > 42 ? `${input.slice(0, 42)}...` : input
            }
        case DeviceNameEnum.mobile:
            return input.length > 30 ? `${input.slice(0, 30)}...` : input
        default:
            return input
    }
}

export const chopStringRecommendationCardPlaceName = (input: string, viewport: DeviceNameEnum, isFull: boolean) => {
    switch (viewport) {
        case DeviceNameEnum.laptop:
            if (isFull === false) {
                return input.length > 10 ? `${input.slice(0, 10)}...` : input
            } else {
                return input.length > 22 ? `${input.slice(0, 22)}...` : input
            }

        case DeviceNameEnum.tablet:
            if (isFull === false) {
                return input.length > 13 ? `${input.slice(0, 13)}...` : input
            } else {
                return input.length > 16 ? `${input.slice(0, 16)}...` : input
            }
        case DeviceNameEnum.mobile:
            if (isFull === false) {
                return input.length > 13 ? `${input.slice(0, 13)}...` : input
            } else {
                return input.length > 12 ? `${input.slice(0, 12)}...` : input
            }
        default:
            return input
    }
}

export const chopStringRecommendationCardAddress = (input: string, viewport: DeviceNameEnum, isFull: boolean) => {
    switch (viewport) {
        case DeviceNameEnum.laptop:
            if (isFull === false) {
                return input.length > 30 ? `${input.slice(0, 30)}...` : input
            } else {
                return input.length > 60 ? `${input.slice(0, 60)}...` : input
            }

        case DeviceNameEnum.tablet:
            if (isFull === false) {
                return input.length > 34 ? `${input.slice(0, 34)}...` : input
            } else {
                return input.length > 38 ? `${input.slice(0, 38)}...` : input
            }
        default:
            return input
    }
}

export const chopStringRecommendationCardCategories = (input: string, viewport: DeviceNameEnum, isFull: boolean ) => {
    switch (viewport) {
        case DeviceNameEnum.laptop:
            if (isFull === false) {
                return input.length > 30 ? `${input.slice(0, 30)}...` : input
            } else {
                return input.length > 60 ? `${input.slice(0, 60)}...` : input
            }
        case DeviceNameEnum.tablet:
            if (isFull === false) {
                return input.length > 40 ? `${input.slice(0, 40)}...` : input
            } else {
                return input.length > 44 ? `${input.slice(0, 44)}...` : input
            }
        case DeviceNameEnum.mobile:
            if (isFull === false) {
                return input.length > 30 ? `${input.slice(0, 30)}...` : input
            } else {
                return input.length > 30 ? `${input.slice(0, 30)}...` : input
            }
        default:
            return input
    }
}

export const chopStringRecommendationCardTitle = (input: string, viewport: DeviceNameEnum, isFull: boolean) => {
    switch (viewport) {
        case DeviceNameEnum.laptop:
            if (isFull === false) {
                return input.length > 29 ? `${input.slice(0, 29)}...` : input
            } else {
                return input.length > 55 ? `${input.slice(0, 55)}...` : input
            }
        case DeviceNameEnum.tablet:
            if (isFull === false) {
                return input.length > 35 ? `${input.slice(0, 35)}...` : input
            } else {
                return input.length > 35 ? `${input.slice(0, 35)}...` : input
            }
        case DeviceNameEnum.mobile:
            if (isFull === false) {
                return input.length > 30 ? `${input.slice(0, 30)}...` : input
            } else {
                return input.length > 30 ? `${input.slice(0, 30)}...` : input
            }
        default:
            return input
    }
}

export const chopStringRecommendationCardDescription = (input: string, viewport: DeviceNameEnum, type: CardRecommendationWideEnum) => {
    switch (viewport) {
        case DeviceNameEnum.laptop:
            if (type === CardRecommendationWideEnum.Profile) {
                return input.length > 80 ? `${input.slice(0, 80)}...` : input
            } else if (type === CardRecommendationWideEnum.Restaurant) {
                return input.length > 400 ? `${input.slice(0, 400)}...` : input
            } else {
                return input.length > 160 ? `${input.slice(0, 160)}...` : input
            }
        case DeviceNameEnum.tablet:
            if (type === CardRecommendationWideEnum.Profile) {
                return input.length > 140 ? `${input.slice(0, 140)}...` : input
            } else if (type === CardRecommendationWideEnum.Restaurant) {
                return input.length > 300 ? `${input.slice(0, 300)}...` : input
            } else {
                return input.length > 140 ? `${input.slice(0, 140)}...` : input
            }
        case DeviceNameEnum.mobile:
            if (type === CardRecommendationWideEnum.Profile) {
                return input.length > 180 ? `${input.slice(0, 180)}...` : input
            } else if (type === CardRecommendationWideEnum.Restaurant) {
                return input.length > 180 ? `${input.slice(0, 180)}...` : input
            } else {
                return input.length > 180 ? `${input.slice(0, 180)}...` : input
            }
        default:
            return input
    }
}

export const chopStringRecommendationCardUserName = (input: string, viewport: DeviceNameEnum, isFull: boolean ) => {
    switch (viewport) {
        case DeviceNameEnum.laptop:
            if (isFull === false) {
                return input.length > 30 ? `${input.slice(0, 30)}...` : input
            } else {
                return input.length > 60 ? `${input.slice(0, 60)}...` : input
            }
        case DeviceNameEnum.tablet:
            if (isFull === false) {
                return input.length > 34 ? `${input.slice(0, 34)}...` : input
            } else {
                return input.length > 37 ? `${input.slice(0, 37)}...` : input
            }
        case DeviceNameEnum.mobile:
            if (isFull === false) {
                return input.length > 30 ? `${input.slice(0, 30)}...` : input
            } else {
                return input.length > 30 ? `${input.slice(0, 30)}...` : input
            }
        default:
            return input
    }
}

export const chopStringRecommendationCardByLine = (input: string, viewport: DeviceNameEnum, isFull: boolean ) => {
    switch (viewport) {
        case DeviceNameEnum.laptop:
            if (isFull === false) {
                return input.length > 30 ? `${input.slice(0, 30)}...` : input
            } else {
                return input.length > 60 ? `${input.slice(0, 60)}...` : input
            }
        case DeviceNameEnum.tablet:
            if (isFull === false) {
                return input.length > 38 ? `${input.slice(0, 38)}...` : input
            } else {
                return input.length > 43 ? `${input.slice(0, 43)}...` : input
            }
        case DeviceNameEnum.mobile:
            if (isFull === false) {
                return input.length > 30 ? `${input.slice(0, 30)}...` : input
            } else {
                return input.length > 30 ? `${input.slice(0, 30)}...` : input
            }
        default:
            return input
    }
}

export const chopStringRecommendationsListsCardTitle = (input: string, viewport: DeviceNameEnum) => {
    switch (viewport) {
        case DeviceNameEnum.laptop:
            return input.length > 30 ? `${input.slice(0, 30)}...` : input

        case DeviceNameEnum.tablet:
            return input.length > 30 ? `${input.slice(0, 30)}...` : input
        case DeviceNameEnum.mobile:
            return input.length > 20 ? `${input.slice(0, 20)}...` : input
        default:
            return input
    }
}

export const chopStringRecommendationsListsCardSubTitle = (input: string, viewport: DeviceNameEnum) => {
    switch (viewport) {
        case DeviceNameEnum.laptop:
            return input.length > 41 ? `${input.slice(0, 41)}...` : input

        case DeviceNameEnum.tablet:
            return input.length > 41 ? `${input.slice(0, 41)}...` : input
        case DeviceNameEnum.mobile:
            return input.length > 26 ? `${input.slice(0, 26)}...` : input
        default:
            return input
    }
}

export const chopStringRecommendationsListsCardContent = (input: string, viewport: DeviceNameEnum) => {
    switch (viewport) {
        case DeviceNameEnum.laptop:
            return input.length > 100 ? `${input.slice(0, 100)}...` : input

        case DeviceNameEnum.tablet:
            return input.length > 100 ? `${input.slice(0, 100)}...` : input
        case DeviceNameEnum.mobile:
            return input.length > 70 ? `${input.slice(0, 70)}...` : input
        default:
            return input
    }
}

export const chopStringRecommendationsListsCardNumber = (input: number) => {
    if (input === undefined || input === null) {
        return '0'
    } else if (input > 999) {
        return '999+'
    } else {
        return input
    }
}
