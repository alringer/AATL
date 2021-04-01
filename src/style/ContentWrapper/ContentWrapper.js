import { contentWidth, device } from 'style/device'
import styled from 'styled-components'

export const ContentWrapper = styled.div`
    width: 100%;
    @media ${device.mobile} {
        max-width: ${contentWidth.mobile};
    }
    @media ${device.tablet} {
        max-width: ${contentWidth.tablet};
    }
    @media ${device.laptop} {
        max-width: ${contentWidth.laptop};
    }
`
