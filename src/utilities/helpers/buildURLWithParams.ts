import { ParamType } from 'utilities/types/clientDTOS/ParamType'

const buildURLWithParams = (params: ParamType[]): string => {
    const filteredParams = params.filter((param: ParamType) => param.value)
    const stringifiedParams = filteredParams.map((param: ParamType) => `${param.label}=${param.value}`)
    const joinedParams = stringifiedParams.join('&')
    return joinedParams ? joinedParams : ''
}

export default buildURLWithParams
