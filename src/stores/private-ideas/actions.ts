import { Action } from '@reduxjs/toolkit'
import { Idea } from '@/types/idea'

export const ADD_PRIVATE_IDEA_ACTION = 'private-ideas/add'
export interface AddPrivateIdeaAction extends Action {
    type: typeof ADD_PRIVATE_IDEA_ACTION
    payload: {
        newIdea: Idea[]
    }
}

export type PrivateIdeasAction = AddPrivateIdeaAction
