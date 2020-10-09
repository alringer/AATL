import Dialog from '@material-ui/core/Dialog'
import { device } from 'style/device'
import styled from 'styled-components'

export const FlagModalCustomDialog = styled(Dialog)`
    @media ${device.tablet} {
        margin: 0;
        .MuiDialog-paper {
            margin: 0;
        }
    }
`

export const FlagModalContainer = styled.div``