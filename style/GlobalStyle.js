import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Rubik, sans-serif;
    }

    input { 
        box-sizing: border-box;
    }

    .MuiButton-root {
        min-width: 48px;
    }

    .MuiOutlinedInput-input {
        padding: 12px;
    }

    .Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: transparent !important;
    }

    .MuiInputLabel-outlined {
        /* transform: translate(12px, 16px) scale(1); */
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translate(0, -50%) scale(1)
    }
`