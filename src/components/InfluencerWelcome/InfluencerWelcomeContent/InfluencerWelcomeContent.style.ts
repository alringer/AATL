import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import styled from 'styled-components'

export const InfluencerWelcomeContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;


    @media ${device.mobile} {
        margin-top: 113px;
        padding-bottom: 68.5px;
    }

    @media ${device.tablet} {
        margin-top: 149.5px;
        padding-bottom: 233px;
    }

    @media ${device.laptop} {
        padding-bottom: 170.5px;
    }
`

export const InfluencerWelcomeContentTextBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`

export const InfluencerWelcomeContentTitle = styled.p`
    font-size: 36px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.charcoalGrey};
    line-height: 1.19;

    margin-bottom: 20px;
`
export const InfluencerWelcomeContentMessage = styled.p`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.darkGrey};

    margin-bottom: 40px;
`
export const InfluencerWelcomeContentButton = styled(CustomButton)`
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.darkSlateBlue};

    :hover {
        background-color: ${props => props.theme.darkSlateBlue};
    }
`

// export const InfluencerWelcomeContent