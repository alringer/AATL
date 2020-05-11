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
    }


    .Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: transparent !important;
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