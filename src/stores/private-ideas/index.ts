import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Idea } from '@/types/idea'
import { RootState } from '@/stores'
import { privateIdeasLoadingThunk } from '@/stores/private-ideas/thunks'

export interface PrivateIdeasState {
    status: 'initial' | 'loaded' | 'loading'
    ideas: Idea[]
}

const initialState: PrivateIdeasState = {
    status: 'initial',
    ideas: [],
}

export const privateIdeasSlice = createSlice({
    name: 'privateIdeas',
    initialState,
    reducers: {
        addIdeas(state, action: PayloadAction<Idea[]>) {
            return {
                ...state,
                ideas: state.ideas.concat(...action.payload),
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(privateIdeasLoadingThunk.pending, state => ({
            ...state,
            status: 'loading',
        }))
        builder.addCase(privateIdeasLoadingThunk.fulfilled, (state, action) => {
            return {
                status: 'loaded',
                ideas: state.ideas.concat(...action.payload),
            }
        })
    },
})

export const { addIdeas } = privateIdeasSlice.actions

export const privateIdeasReducer = privateIdeasSlice.reducer

export const selectPrivateIdeas = (state: RootState) => state.privateIdeas.ideas
export const selectPrivateIdeasStatus = (state: RootState) =>
    state.privateIdeas.status
