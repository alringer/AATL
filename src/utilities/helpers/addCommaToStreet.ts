export const addCommaToStreet = (inputString: string) => {
    if (inputString) {
        const trimmedString = inputString.trimEnd()
        if (trimmedString.charAt(trimmedString.length - 1) !== ',') {
            return inputString + ', '
        } else {
            return inputString
        }
    } else {
        return ''
    }
}
