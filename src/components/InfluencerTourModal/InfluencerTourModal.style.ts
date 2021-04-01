import styled, { css } from 'styled-components'

interface VisibleProps {
    readonly isVisible: boolean
}

export const InfluencerTourModalContainer = styled.div<VisibleProps>`
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(24, 26, 34, 0.5);
    z-index: 99;

    ${(props) => {
        if (props.isVisible) {
            return css`
                display: flex;
            `
        }
    }}
`

export const InfluencerTourModalInnerContainer = styled.div`
    display: flex;
    background-color: white;
    width: 1000px;
    /* height: 400px; */
    margin: auto;
`
