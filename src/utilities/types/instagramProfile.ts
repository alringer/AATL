import { InstagramMediaDTO } from 'utilities/types/instagrammMedia'

export interface InstagramProfileDTO {
    id: number
    username: string
    posts: InstagramMediaDTO[]
}
