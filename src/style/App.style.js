import { HeaderHeights } from 'sections/Header/Header.style'
import { device } from 'style/device'
import styled from 'styled-components'

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* align-items: flex-start; */
    flex-grow: 1;
    @media ${device.mobile} {
        padding-top: ${HeaderHeights.mobile};
    }

    @media ${device.tablet} {
        padding-top: ${HeaderHeights.tablet};
    }

    @media ${device.laptop} {
        padding-top: ${HeaderHeights.laptop};
    }
`