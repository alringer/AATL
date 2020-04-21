export const chopStringLargeRecommendation = (input: string) => {
    return input.length > 141 ? `${input.slice(0, 141)}...` : input
}

export const chopStringSmallCallToAction = (input: string) => {
    return input.length > 90 ? `${input.slice(0, 90)}...` : input
}

export const chopStringSmallPlaceDescription = (input: string) => {
    // TODO: Determine the correct character count
    return input.length > 90 ? `${input.slice(0, 90)}...` : input
}
