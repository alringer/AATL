import { CustomButton } from 'style/Button/Button.style'
import { device } from 'style/device'
import { SectionContainer, SectionHeaderContainer, SectionHeaderSubTitleText, SectionHeaderTitleText } from 'style/Section/Section.style'
import styled from 'styled-components'

// General
export const MostPopularContainer = styled(SectionContainer)``

export const ViewMoreButton = styled(CustomButton)`
    color: ${props => props.theme.mushroom};
    background-color: ${props => props.theme.white};
    border-color: ${props => props.theme.darkGreyOpaque};

    :hover {
        background-color: ${props => props.theme.white};
        border-color: ${props => props.theme.darkGreyOpaque};
    }
    @media ${device.mobile} {
        margin-top: 40px;
    }
    @media ${device.laptop} {
        margin-top: 50px;
    }
`

// Header
export const MostPopularHeaderContainer = styled(SectionHeaderContainer)``
export const MostPopularHeaderTitleText = styled(SectionHeaderTitleText)``

export const MostPopularHeaderSubTitleText = styled(SectionHeaderSubTitleText)``