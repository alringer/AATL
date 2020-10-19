import styled from 'styled-components'

export const AdminContainer = styled.div`
    display: flex;
    width: 100%;
    flex-grow: 1;
`

export const AdminContentContainer = styled.div`
    display: flex;
    padding: 40px;
`

export const AdminVerifyingText = styled.p`
    font-size: 20px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: ${(props) => props.theme.mushroom};

    margin-top: 20px;
`