import { createAsyncThunk } from '@reduxjs/toolkit'
import { useAppSelector } from '@/stores/hooks'
import { selectPrivateIdeasStatus } from '@/stores/private-ideas'
import { AppThunk, RootState } from '@/stores'
import { Idea } from '@/types/idea'

export const privateIdeasLoadingThunk = createAsyncThunk<
    Idea[],
    void,
    { state: RootState }
>(
    'privateIdeas/load',
    async () => {
        await new Promise<void>(resolve => setTimeout(resolve, 1000))
        console.log('load')
        
        return [
            {
                id: 1,
                title: '123',
                content: '123',
            },
        ]
    },
    {
        condition(arg, thunkApi) {
            const status = selectPrivateIdeasStatus(thunkApi.getState())
            return status === 'initial'
        }
    }
)
