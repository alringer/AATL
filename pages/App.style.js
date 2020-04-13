import styled from 'styled-components'
import { device } from '../style/device'

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    @media ${device.mobile} {
    }

    @media ${device.tablet} {
    }

    @media ${device.laptop} {
    }
`

export const PageContainer = styled.div`
    flex-grow: 1;
`