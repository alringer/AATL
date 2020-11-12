import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import styled from 'styled-components'

export const InfiniteCarouselCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    background-color: white;
    width: 100%;
    height: 100%;
    @media ${device.mobile} {
        /* max-width: 300px; */
    }
    @media ${device.tablet} {
        /* max-width: 720px; */
    }
    @media ${device.laptop} {
        /* max-width: 780px; */
    }
`

export const InfiniteCarouselCardImageContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;

    @media ${device.mobile} {
        height: 300px;
    }
    @media ${device.tablet} {
        height: 400px;
    }

    img {
        object-fit: cover;
    }
`

export const InfiniteCarouselCardPlaceName = styled.p`
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.08;
    letter-spacing: normal;
    color: ${(props) => props.theme.white};
    font-size: 30px;
    text-shadow: 0 2px 0 rgba(54, 57, 64, 0.12);
`

export const InfiniteCarouselCardContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media ${device.mobile} {
        /* height: 260px; */
        padding: 14px;
    }
    @media ${device.tablet} {
        /* height: 120px; */
        padding: 20px;
    }
    @media ${device.laptop} {
        /* height: 120px; */
        padding: 20px;
    }
`

export const InfiniteCarouselCardCategoryText = styled.p`
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${(props) => props.theme.charcoalGrey};
    text-align: left;
`

export const InfiniteCarouselCardBodyContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    /* @media ${device.mobile} {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
    }
    @media ${device.tablet} {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    @media ${device.laptop} {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    } */
`

export const InfiniteCarouselCardDescriptionContainer = styled.div`
    @media ${device.mobile} {
        width: 100%;
    }
    @media ${device.tablet} {
        /* TODO: This is actually max-width for laptop. Figure out widths for each viewport and set it to proper sizes */
        max-width: 497px;
    }
    @media ${device.laptop} {
        max-width: 520px;
    }
`

export const InfiniteCarouselCardDescriptionText = styled.p`
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: ${(props) => props.theme.charcoalGrey};
    text-align: left;

    @media ${device.mobile} {
        /* height: 88px; */
    }
    @media ${device.tablet} {
        /* height: 48px; */
    }
    @media ${device.laptop} {
        /* height: 48px; */
    }
`

export const InfiniteCarouselCardCheckItOutButton = styled(CustomButton)`
    color: ${(props) => props.theme.pinkishTan};
    background-color: ${(props) => props.theme.white};
    min-width: 119px;
    white-space: nowrap;

    :hover {
        background-color: ${(props) => props.theme.white};
    }
`
