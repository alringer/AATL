import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Rubik, sans-serif;
    }

    html, body {
        height: 100%;
        position: relative;
    }

    input { 
        box-sizing: border-box;
    }

    .MuiButton-root {
        min-width: 48px;
        text-transform: none;
    }


    .Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: transparent !important;
    }

    .carousel-root {
        width: 100%
    }

    .MuiPaginationItem-root {
        font-size: 12px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.67;
        letter-spacing: 2px;
        text-align: center;
        color: ${(props) => props.theme.pinkishTan};
        background-color: ${(props) => props.theme.white};
        border: 2px solid ${(props) => props.theme.darkGreyOpaque};
        border-radius: 5px;
    }

    .MuiPaginationItem-page.Mui-selected {
        color: ${(props) => props.theme.white};
        background-color: ${(props) => props.theme.pinkishTan};
    }

    /* Code below to put more padding within the input fields */
    /* .MuiOutlinedInput-input {
        padding: 12px;
    }

    .MuiInputLabel-outlined {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translate(0, -50%) scale(1)
    }

    .MuiInputLabel-outlined.MuiInputLabel-shrink {
        position: absolute;
        top: 0;
        left: 0;
    } */
`