import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Rubik, sans-serif;
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
`