const chopString = (input: string) => {
    return input.length > 90 ? `${input.slice(0, 90)}...` : input
}

export default chopString
