import styled, { css } from 'styled-components'

export const AdminMenuContainer = styled.div`
    min-width: 320px;
    width: 320px;
    height: auto;

    display: flex;
    flex-direction: column;
    padding: 40px 50px;

    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.12);
    background-color: rgba(255, 255, 255, 0.6);
`

export const AdminMenuTitle = styled.p`
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    color: ${(props) => props.theme.charcoalGrey};

    margin-bottom: 40px;
`

export const AdminMenuItem = styled.p`
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 2px;
    color: ${(props) => props.theme.charcoalGrey};
    cursor: pointer;

    margin-bottom: 20px;

    ${(props) => {
        if (props.id === 'active') {
            return css`
                color: ${(props) => props.theme.mushroom};
            `
        }
    }}
`
