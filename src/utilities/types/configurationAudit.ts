export interface IConfigurationAudit {
    category: string
    changedBy: number
    id?: number
    key: string
    newIsDefault: boolean
    newValue?: string
    oldIsDefault: boolean
    oldValue?: string
}
