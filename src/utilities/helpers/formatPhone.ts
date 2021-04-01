export const formatPhone = (input: string) => {
    return `(${input.substr(0, 3)})${input.substr(3, 3)}-${input.substr(6, 4)}`
}
