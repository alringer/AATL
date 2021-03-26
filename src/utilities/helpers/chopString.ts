import { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import { CardRecommendationWideEnum } from 'components/CardRecommendationWide/CardRecommendationWide'
import { DeviceNameEnum } from 'style/device'

export const chopStringSmallCallToAction = (input: string) => {
    return input ? (input.length > 65 ? `${input.slice(0, 65)}...` : input) : ''
}

export const chopStringSmallPlaceName = (input: string) => {
    return input ? (input.length > 20 ? `${input.slice(0, 20)}...` : input) : ''
}

export const chopStringSmallPlaceDescription = (input: string) => {
    return input ? (input.length > 90 ? `${input.slice(0, 90)}...` : input) : ''
}

export const chopStringInfiniteCarouselCardDescription = (input: string) => {
    return input ? (input.length > 140 ? `${input.slice(0, 140)}...` : input) : ''
}

export const chopStringPlaceName = (input: string, viewport: DeviceNameEnum, type: CardPlaceWideEnum) => {
    if (input) {
        switch (viewport) {
            case DeviceNameEnum.laptop:
                if (type === CardPlaceWideEnum.Profile || type === CardPlaceWideEnum.ProfileOwnerList) {
                    return input.length > 13 ? `${input.slice(0, 13)}...` : input
                } else if (type === CardPlaceWideEnum.Search) {
                    return input.length > 18 ? `${input.slice(0, 18)}...` : input
                } else {
                    return input.length > 25 ? `${input.slice(0, 25)}...` : input
                }
            case DeviceNameEnum.tablet:
                if (type === CardPlaceWideEnum.Profile || type === CardPlaceWideEnum.ProfileOwnerList) {
                    return input.length > 17 ? `${input.slice(0, 17)}...` : input
                } else if (type === CardPlaceWideEnum.Search) {
                    return input.length > 22 ? `${input.slice(0, 22)}...` : input
                } else {
                    return input.length > 19 ? `${input.slice(0, 19)}...` : input
                }
            case DeviceNameEnum.mobile:
                return input.length > 18 ? `${input.slice(0, 18)}...` : input
            default:
                return input
        }
    } else {
        return ''
    }
}

export const chopStringPlaceCategories = (input: string, viewport: DeviceNameEnum, type: CardPlaceWideEnum) => {
    if (input) {
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
    } else {
        return ''
    }
}

export const chopStringPlaceLatestRecommendationTitle = (
    input: string,
    viewport: DeviceNameEnum,
    type: CardPlaceWideEnum
) => {
    if (input) {
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
    } else {
        return ''
    }
}

export const chopStringPlaceLatestRecommendationContent = (
    input: string,
    viewport: DeviceNameEnum,
    type: CardPlaceWideEnum
) => {
    if (input) {
        switch (viewport) {
            case DeviceNameEnum.laptop:
                if (type === CardPlaceWideEnum.Profile || type === CardPlaceWideEnum.ProfileOwnerList) {
                    return input.length > 75 ? `${input.slice(0, 75)}...` : input
                } else if (type === CardPlaceWideEnum.Search) {
                    return input.length > 95 ? `${input.slice(0, 95)}...` : input
                } else {
                    return input.length > 140 ? `${input.slice(0, 140)}...` : input
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
    } else {
        return ''
    }
}

export const chopStringPlaceUserName = (input: string, viewport: DeviceNameEnum, type: CardPlaceWideEnum) => {
    if (input) {
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
    } else {
        return ''
    }
}

export const chopStringPlaceUserByLine = (input: string, viewport: DeviceNameEnum, type: CardPlaceWideEnum) => {
    if (input) {
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
    } else {
        return ''
    }
}

export const chopStringRecommendationCardPlaceName = (input: string, viewport: DeviceNameEnum, isFull: boolean) => {
    if (input) {
        switch (viewport) {
            case DeviceNameEnum.laptop:
                if (isFull === false) {
                    return input.length > 10 ? `${input.slice(0, 10)}...` : input
                } else {
                    return input.length > 22 ? `${input.slice(0, 22)}...` : input
                }

            case DeviceNameEnum.tablet:
                if (isFull === false) {
                    return input.length > 16 ? `${input.slice(0, 16)}...` : input
                } else {
                    return input.length > 18 ? `${input.slice(0, 18)}...` : input
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
    } else {
        return ''
    }
}

export const chopStringRecommendationCardAddress = (input: string, viewport: DeviceNameEnum, isFull: boolean) => {
    if (input) {
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
    } else {
        return ''
    }
}

export const chopStringRecommendationCardCategories = (input: string, viewport: DeviceNameEnum, isFull: boolean) => {
    if (input) {
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
    } else {
        return ''
    }
}

export const chopStringRecommendationCardTitle = (input: string, viewport: DeviceNameEnum, isFull: boolean) => {
    if (input) {
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
    } else {
        return ''
    }
}

export const chopStringRecommendationCardDescription = (
    input: string,
    viewport: DeviceNameEnum,
    type: CardRecommendationWideEnum
) => {
    if (input) {
        switch (viewport) {
            case DeviceNameEnum.laptop:
                if (type === CardRecommendationWideEnum.Profile) {
                    return input.length > 40 ? `${input.slice(0, 40)}...` : input
                } else if (type === CardRecommendationWideEnum.Restaurant) {
                    return input.length > 300 ? `${input.slice(0, 300)}...` : input
                } else {
                    return input.length > 75 ? `${input.slice(0, 75)}...` : input
                }
            case DeviceNameEnum.tablet:
                if (type === CardRecommendationWideEnum.Profile) {
                    return input.length > 80 ? `${input.slice(0, 80)}...` : input
                } else if (type === CardRecommendationWideEnum.Restaurant) {
                    return input.length > 250 ? `${input.slice(0, 250)}...` : input
                } else {
                    return input.length > 90 ? `${input.slice(0, 90)}...` : input
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
    } else {
        return ''
    }
}

export const chopStringRecommendationCardUserName = (input: string, viewport: DeviceNameEnum, isFull: boolean) => {
    if (input) {
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
    } else {
        return ''
    }
}

export const chopStringRecommendationCardByLine = (input: string, viewport: DeviceNameEnum, isFull: boolean) => {
    if (input) {
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
    } else {
        return ''
    }
}

export const chopStringRecommendationsListsCardTitle = (input: string, viewport: DeviceNameEnum) => {
    if (input) {
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
    } else {
        return ''
    }
}

export const chopStringRecommendationsListsCardSubTitle = (input: string, viewport: DeviceNameEnum) => {
    if (input) {
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
    } else {
        return ''
    }
}

export const chopStringRecommendationsListsCardContent = (input: string, viewport: DeviceNameEnum) => {
    if (input) {
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
    } else {
        return ''
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

export const chopStringInstagramCaption = (input: string, viewport: DeviceNameEnum) => {
    if (input) {
        switch (viewport) {
            case DeviceNameEnum.laptop:
                return input.length > 40 ? `${input.slice(0, 40)}...` : input

            case DeviceNameEnum.tablet:
                return input.length > 35 ? `${input.slice(0, 35)}...` : input
            case DeviceNameEnum.mobile:
            default:
                ''
        }
    } else {
        return ''
    }
}
