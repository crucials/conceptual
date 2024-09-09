import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Idea } from '@/types/idea'
import { RootState } from '@/stores'
import {
    localIdeaDeletionThunk,
    localIdeasCreationThunk,
    localIdeasLoadingThunk,
    localIdeaSynchronizationThunk,
} from '@/stores/local-ideas/thunks'

export interface LocalIdeasState {
    status: 'initial' | 'loaded' | 'pending' | 'error'
    errorMessage: string | null
    items: Idea[]
}

const initialState: LocalIdeasState = {
    status: 'initial',
    errorMessage: null,
    items: [],
}

export const localIdeasSlice = createSlice({
    name: 'localIdeas',
    initialState,
    reducers: {
        addIdeas(state, action: PayloadAction<Idea[]>) {
            return {
                ...state,
                items: state.items.concat(...action.payload),
            }
        },

        updateIdea(
            state,
            action: PayloadAction<{
                ideaToUpdateId: number
                newIdeaData: Partial<Idea>
            }>,
        ) {
            const foundIdeaIndex = state.items.findIndex(
                idea => idea.id === action.payload.ideaToUpdateId,
            )

            if (foundIdeaIndex !== -1) {
                const newItems = [...state.items]
                newItems[foundIdeaIndex] = {
                    ...newItems[foundIdeaIndex],
                    ...action.payload.newIdeaData,
                }

                return {
                    ...state,
                    items: newItems,
                }
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(localIdeasLoadingThunk.pending, state => ({
            ...state,
            status: 'pending',
        }))

        builder.addCase(localIdeasLoadingThunk.fulfilled, (state, action) => {
            return {
                status: 'loaded',
                errorMessage: null,
                items: state.items.concat(...action.payload),
            }
        })

        builder.addCase(localIdeasLoadingThunk.rejected, (state, action) => ({
            ...state,
            status: 'error',
            errorMessage: action.error.message || null,
        }))

        builder.addCase(localIdeasCreationThunk.fulfilled, (state, action) => ({
            ...state,
            items: state.items.concat(action.payload),
            status: 'loaded',
            errorMessage: null,
        }))

        builder.addCase(localIdeaSynchronizationThunk.rejected, (state, action) => ({
            ...state,
            status: 'error',
            errorMessage: action.error.message || null,
        }))

        builder.addCase(localIdeaDeletionThunk.fulfilled, (state, action) => ({
            ...state,
            items: state.items.filter(idea => idea.id !== action.payload)
        }))
    },
})

export const { addIdeas, updateIdea } = localIdeasSlice.actions

export const localIdeasReducer = localIdeasSlice.reducer

export const selectLocalIdeas = (state: RootState) => state.localIdeas
export const selectLocalIdeasItems = (state: RootState) => state.localIdeas.items
export const selectIdeasLoadingStatus = (state: RootState) => state.localIdeas.status
