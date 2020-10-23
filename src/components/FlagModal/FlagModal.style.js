import Dialog from '@material-ui/core/Dialog'
import { device } from 'style/device'
import { CustomTextField } from 'style/TextField/TextField.style'
import styled from 'styled-components'

export const FlagModalCustomDialog = styled(Dialog)`
    @media ${device.tablet} {
        margin: 0;
        .MuiDialog-paper {
            margin: 0;
        }
    }
`

export const FlagModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 100vh;

    @media ${device.mobile} {
        width: 100%;
        height: 100%;
    }
    @media ${device.tablet} {
        width: 768px;
        height: auto;
    }
    @media ${device.laptop} {
        width: 780px;
    }
`

export const FlagModalTitle = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: left;
    color: ${(props) => props.charcoalGrey};
`

export const FlagModalInput = styled(CustomTextField)``
