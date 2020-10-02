import { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import { DeviceNameEnum } from 'style/device'

export const chopStringFullRecommendationDescription = (input: string) => {
    return input.length > 141 ? `${input.slice(0, 141)}...` : input
}

export const chopStringRecommendationTitle = (input: string) => {
    return input.length > 57 ? `${input.slice(0, 57)}...` : input
}

export const chopStringSimpleRecommendationDescription = (input: string) => {
    return input.length > 250 ? `${input.slice(0, 250)}...` : input
}

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
