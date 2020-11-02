import { StaticWelcomeContentMessage } from 'components/StaticWelcome/StaticWelcomeContent/StaticWelcomeContent.style'
import styled from 'styled-components'

export const TermsAndConditionsContentSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 50px;
`
export const TermAndConditionsContentSectionTitle = styled.p`
    color: ${props => props.theme.darkGrey};
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 10px;
`

export const TermsAndConditionsContentSectionBody = styled(StaticWelcomeContentMessage)`
    text-align: left;
    white-space: break-spaces;
    line-height: 1.6;
`