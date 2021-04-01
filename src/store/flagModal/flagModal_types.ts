export interface FlagModalReducerState {
    isOpen: boolean
    recommendationID: number | null
    onSuccess: () => void
}

export type OpenFlagModalPayload = {
    recommendationID?: number
    onSuccess?: () => void
}

// Action Types
export const OPEN_FLAG_MODAL = 'OPEN_FLAG_MODAL'

interface OpenFlagModalAction {
    type: typeof OPEN_FLAG_MODAL
    payload: OpenFlagModalPayload
}

export const CLOSE_FLAG_MODAL = 'CLOSE_FLAG_MODAL'

interface CloseFlagModalAction {
    type: typeof CLOSE_FLAG_MODAL
}

export type FlagModalActionTypes = OpenFlagModalAction | CloseFlagModalAction
