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

    .MuiTooltip-tooltip {
        padding: 12px;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.12);
        background-color: rgba(0, 0, 0, 0.7);
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.57;
        letter-spacing: normal;
        text-align: center;
        color: ${(props) => props.theme.white};
    }

    .MuiTooltip-arrow {
        color: rgba(0, 0, 0, 0.7);
    }

    .Mui-disabled {
        cursor: not-allowed;
    }

    .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child {
        padding-left: 10px;
    }

    .MuiButton-root {
        min-width: 48px;
        text-transform: none;
    }

    .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
        padding: 0;
    }

    .MuiInputLabel-outlined {
        transform: translate(14px, 16px) scale(1);
    }

    .MuiOutlinedInput-input {
        /* box-sizing: padding-box; */
        padding: 11px;
        height: 24px;
        /* height: 100%; */
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