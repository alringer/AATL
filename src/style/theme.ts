export const theme: ITheme = {
    white: 'rgba(255,255,255,1)',
    darkGrey: 'rgba(30,31,34,1)',
    darkGreyOpaque: 'rgba(30,31,34,0.1)',
    charcoalGrey: 'rgba(54,57,64,1)',
    darkSlateBlue: 'rgba(29, 67, 84, 1)',
    dustyRed: 'rgba(211, 49, 62, 1)',
    dustyOrange: 'rgba(240, 129, 66, 1)',
    mushroom: 'rgba(191, 157, 138, 1)',
    mushroomOpaque: 'rgba(191, 157, 138, 0.25)',
    pinkishTan: 'rgba(205, 171, 149, 1)',
    transition: `all 0.08s ease-in-out`,
}

export interface ITheme {
    white: string
    darkGrey: string
    darkGreyOpaque: string
    charcoalGrey: string
    darkSlateBlue: string
    dustyRed: string
    dustyOrange: string
    mushroom: string
    mushroomOpaque: string
    pinkishTan: string
    transition: string
}
