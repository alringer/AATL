const size = {
    mobile: '300',
    tablet: '768',
    laptop: '1440',
}

export const device = {
    mobile: `(min-width: ${size.mobile}px)`,
    tablet: `(min-width: ${size.tablet}px)`,
    laptop: `(min-width: ${size.laptop}px)`
}

export const query = {
    mobile: `(max-width: ${Number(size.tablet) - 1}px)`,
    tablet: `(min-width: ${Number(size.tablet)}px) and (max-width: ${Number(size.laptop) - 1}px)`,
    laptop: `(min-width: ${Number(size.laptop)}px)`,
}