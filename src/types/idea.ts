export interface Idea {
    id: number
    title: string
    textContent: string
}

export type IdeaWithoutId = Omit<Idea, 'id'>
