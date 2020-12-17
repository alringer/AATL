import { CustomButton } from 'style/Button/Button.style'
import styled from 'styled-components'

export const AdminFlaggedCardContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const AdminFlaggedCardRecommendationContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;

    padding: 30px 69px;
    box-shadow: inset 0 -1px 0 0 #e9e9e9, inset 0 1px 0 0 #e9e9e9;
    background-color: #fbf9f7;
`
export const AdminFlaggedCardRecommendationContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
`
export const AdminFlaggedCardRecommendationButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    width: 100%;
`
// Buttons
export const AdminFlaggedCardDeleteButton = styled(CustomButton)`
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.mushroom};

    :hover {
        background-color: ${(props) => props.theme.mushroom};
    }

    margin-right: 25px;
`

export const AdminFlaggedCardMarkButton = styled(CustomButton)`
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.darkSlateBlue};

    :hover {
        background-color: ${(props) => props.theme.darkSlateBlue};
    }
`