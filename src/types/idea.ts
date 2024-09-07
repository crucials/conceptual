export interface Idea {
    id: number
    title: string
    content: string
}

export type IdeaWithoutId = Omit<Idea, 'id'>
