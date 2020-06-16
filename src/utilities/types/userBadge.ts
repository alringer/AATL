import { IBadge } from './badge'

export interface IUserBadge {
    badge: IBadge
    id?: number
    seenAt: string
    userprofile: any // TODO: Type this strictly
}
