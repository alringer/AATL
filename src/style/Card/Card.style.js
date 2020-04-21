import { CustomIconButton } from 'style/Button/IconButton.style'
import styled from 'styled-components'

export const CardContainer = styled.div`
    transition: all 0.2s linear;

    :hover {
        box-shadow: 0 3px 50px 0 #dedede;
        transform: translateY(-2px);
        cursor: pointer;
    }
`

export const ImageButtonsContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const RecommendationIcon = styled(CustomIconButton)`
    width: 48px;
    height: 48px;

    img {
        height: fit-content !important;
    }
`