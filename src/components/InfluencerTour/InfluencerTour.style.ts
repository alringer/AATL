import { CustomButton } from 'style/Button/Button.style'
import styled from 'styled-components'

export const InfluencerTourCardContentContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const InfluencerCardTitle = styled.p`
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.1;
    letter-spacing: normal;
    color: ${props => props.theme.white};

    margin-bottom: 30px;
`

export const InfluencerCardMessage = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: 0.28px;
    color: #d9deea;
`

export const InfluencerCardOrangeMessage = styled.span`
    color: ${props => props.theme.dustyOrange};
`

export const InfluencerCardButton = styled(CustomButton)`
    margin-top: 74px;

    color: ${props => props.theme.white};
    background-color: transparent;
    border-color: ${props => props.theme.white};
    :hover {
        background-color: transparent;
        border-color: ${props => props.theme.white};
    }
`