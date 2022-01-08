export interface GuidelinesModalReducerState {
    isOpen: boolean
}

// Action Types
export const OPEN_GUIDELINES_MODAL = 'OPEN_GUIDELINES_MODAL'

interface OpenGuidelinesModalAction {
    type: typeof OPEN_GUIDELINES_MODAL
}

export const CLOSE_GUIDELINES_MODAL = 'CLOSE_GUIDELINES_MODAL'

interface CloseGuidelinesModalAction {
    type: typeof CLOSE_GUIDELINES_MODAL
}

export type GuidelinesModalActionTypes = OpenGuidelinesModalAction | CloseGuidelinesModalAction
