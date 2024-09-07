import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Idea } from '@/types/idea'
import { RootState } from '@/stores'
import {
    privateIdeasCreationThunk,
    privateIdeasLoadingThunk,
} from '@/stores/private-ideas/thunks'

export interface PrivateIdeasState {
    status: 'initial' | 'loaded' | 'pending' | 'error'
    errorMessage: string | null
    items: Idea[]
}

const initialState: PrivateIdeasState = {
    status: 'initial',
    errorMessage: null,
    items: [],
}

export const privateIdeasSlice = createSlice({
    name: 'privateIdeas',
    initialState,
    reducers: {
        addIdeas(state, action: PayloadAction<Idea[]>) {
            return {
                ...state,
                items: state.items.concat(...action.payload),
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(privateIdeasLoadingThunk.pending, state => ({
            ...state,
            status: 'pending',
        }))

        builder.addCase(privateIdeasLoadingThunk.fulfilled, (state, action) => {
            return {
                status: 'loaded',
                errorMessage: null,
                items: state.items.concat(...action.payload),
            }
        })

        builder.addCase(privateIdeasLoadingThunk.rejected, (state, action) => ({
            ...state,
            status: 'error',
            errorMessage: action.error.message || null,
        }))

        builder.addCase(privateIdeasCreationThunk.fulfilled, (state, action) => ({
            ...state,
            items: state.items.concat(action.payload),
            status: 'loaded',
            errorMessage: null,
        }))
    },
})

export const { addIdeas } = privateIdeasSlice.actions

export const privateIdeasReducer = privateIdeasSlice.reducer

export const selectPrivateIdeas = (state: RootState) => state.privateIdeas
export const selectPrivateIdeasItems = (state: RootState) => state.privateIdeas.items
export const selectPrivateIdeasStatus = (state: RootState) =>
    state.privateIdeas.status
