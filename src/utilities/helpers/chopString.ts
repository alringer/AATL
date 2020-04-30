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

export const chopStringSmallPlaceDescription = (input: string) => {
    // TODO: Determine the correct character count
    return input.length > 90 ? `${input.slice(0, 90)}...` : input
}
