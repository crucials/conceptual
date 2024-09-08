import { createAsyncThunk } from '@reduxjs/toolkit'
import { selectIdeasLoadingStatus } from '@/stores/local-ideas'
import { RootState } from '@/stores'
import { LocalIdeasDatabase } from '@/local-ideas-database'
import { Idea, IdeaWithoutId } from '@/types/idea'

const localIdeasDatabase = new LocalIdeasDatabase()

export const localIdeasLoadingThunk = createAsyncThunk<
    Idea[],
    void,
    { state: RootState }
>(
    'localIdeas/load',
    async () => {
        await localIdeasDatabase.open()
        return await localIdeasDatabase.getIdeas()
    },
    {
        condition(arg, thunkApi) {
            const status = selectIdeasLoadingStatus(thunkApi.getState())
            return status === 'initial'
        },
    },
)

export const localIdeasCreationThunk = createAsyncThunk<
    Idea,
    Omit<Idea, 'id'>,
    { state: RootState }
>('localIdeas/create', async (ideaData: IdeaWithoutId) => {
    await localIdeasDatabase.open()
    const newRecordId = await localIdeasDatabase.addIdea(ideaData)
    return await localIdeasDatabase.getIdeaById(newRecordId)
})

export const localIdeaSynchronizationThunk = createAsyncThunk<
    void,
    { ideaToUpdateId: number; newIdeaValue: Idea },
    { state: RootState }
>('localIdeas/synchronize', async ({ ideaToUpdateId, newIdeaValue }) => {
    await localIdeasDatabase.open()
    await localIdeasDatabase.updateIdea(ideaToUpdateId, newIdeaValue)
})
