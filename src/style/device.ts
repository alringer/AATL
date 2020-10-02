export const size = {
    mobile: '300',
    tablet: '768',
    laptop: '1440',
}

export const device = {
    mobile: `(min-width: ${size.mobile}px)`,
    tablet: `(min-width: ${size.tablet}px)`,
    laptop: `(min-width: ${size.laptop}px)`,
}

export const query = {
    mobile: `(max-width: ${Number(size.tablet) - 1}px)`,
    tablet: `(min-width: ${Number(size.tablet)}px) and (max-width: ${Number(size.laptop) - 1}px)`,
    laptop: `(min-width: ${Number(size.laptop)}px)`,
}

export const viewportDevices = {
    GalaxyS5: {
        width: '360px',
        height: '640px',
    },
    Pixel2: {
        width: '411px',
        height: '731px',
    },
    Pixel2XL: {
        width: '411px',
        height: '823px',
    },
    iPhone5SE: {
        width: '320px',
        height: '568px',
    },
    iPhone678: {
        width: '375px',
        height: '667px',
    },
    iPhone678Plus: {
        width: '414px',
        height: '736px',
    },
    iPhoneX: {
        width: '375px',
        height: '812px',
    },
    iPad: {
        width: '1024px',
        height: '768px',
    },
    iPadPro: {
        width: '1366px',
        height: '1024px',
    },
    mobile: {
        width: `${size.mobile}px`,
        height: '560px',
    },
    tablet: {
        width: `${size.tablet}px`,
        height: '500px',
    },
    laptop: {
        width: `${size.laptop}px`,
        height: '800px',
    },
}

export const sidePaddings = {
    mobile: '17px',
    tablet: '24px',
    laptop: '250px',
}

export const contentWidth = {
    mobile: '328px',
    tablet: '720px',
    laptop: '940px',
}

export enum DeviceNameEnum {
    mobile = 'mobile',
    tablet = 'tablet',
    laptop = 'laptop',
}
