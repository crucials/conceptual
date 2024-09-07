import { createAsyncThunk } from '@reduxjs/toolkit'
import { selectPrivateIdeasStatus } from '@/stores/private-ideas'
import { RootState } from '@/stores'
import { PrivateIdeasDatabase } from '@/private-ideas-database'
import { Idea, IdeaWithoutId } from '@/types/idea'

const privateIdeasDatabase = new PrivateIdeasDatabase()

export const privateIdeasLoadingThunk = createAsyncThunk<
    Idea[],
    void,
    { state: RootState }
>(
    'privateIdeas/load',
    async () => {
        await privateIdeasDatabase.open()
        return await privateIdeasDatabase.getIdeas()
    },
    {
        condition(arg, thunkApi) {
            const status = selectPrivateIdeasStatus(thunkApi.getState())
            return status === 'initial'
        },
    },
)

export const privateIdeasCreationThunk = createAsyncThunk<
    Idea,
    Omit<Idea, 'id'>,
    { state: RootState }
>('privateIdeas/create', async (ideaData: IdeaWithoutId) => {
    await privateIdeasDatabase.open()
    const newRecordId = await privateIdeasDatabase.addIdea(ideaData)
    return await privateIdeasDatabase.getIdeaById(newRecordId)
})

export const privateIdeaUpdateThunk = createAsyncThunk<
    void,
    { ideaToUpdateId: number, newIdeaValue: Idea },
    { state: RootState }
>('privateIdeas/create', async ({ ideaToUpdateId, newIdeaValue }) => {
    await privateIdeasDatabase.open()
    await privateIdeasDatabase.updateIdea(ideaToUpdateId, newIdeaValue)
})
