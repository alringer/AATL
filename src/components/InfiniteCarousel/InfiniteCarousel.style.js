import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import styled, { css } from 'styled-components'

// Infinite Carousel
export const InfiniteCarouselContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`
export const InfiniteCarouselSlideContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.white};

    @media ${device.mobile} {
        padding-left: 5px;
        padding-right: 5px;
    }
    @media ${device.tablet} {
        padding-left: 10px;
        padding-right: 10px;
    }
`

export const InfiniteCarouselDotButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const InfiniteCarouselDotButton = styled(CustomButton)``

export const InfiniteCarouselDotSpan = styled.span`
    height: 8px;
    width: 8px;
    background-color: ${props => props.theme.charcoalGrey};
    opacity: 0.2;
    border-radius: 50%;
    display: inline-block;

    ${props => {
        if(props.className === 'active') {
            return css`
                background-color: ${props => props.theme.mushroom};
                opacity: 1;
            `
        }
    }}
`