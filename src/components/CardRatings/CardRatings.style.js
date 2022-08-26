import styled from 'styled-components'

export const CardPlaceWideForksContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

export const CardPlaceWideForkContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 24px;
    height: 24px;

    margin-right: 10px;
`

export const CardPlaceWideForkCursorContainer = styled(CardPlaceWideForkContainer)`
    cursor: pointer;
`

export const CardPlaceWideForkMessageText = styled.p`
    font-family: 'Rubik', sans-serif;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.83;
    letter-spacing: 2px;
    color: #363940;
`
