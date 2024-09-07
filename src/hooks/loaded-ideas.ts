import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/stores/hooks'
import { selectLocalIdeas, selectIdeasLoadingStatus } from '@/stores/local-ideas'
import { localIdeasLoadingThunk } from '@/stores/local-ideas/thunks'

/**
 * loads ideas from indexed DB into the store, if they are not already
 * loaded
 * @returns local ideas state (items, loading status, etc.)
 */
export function useLoadedIdeas() {
    const localIdeasLoadingStatus = useAppSelector(selectIdeasLoadingStatus)
    const localIdeasState = useAppSelector(selectLocalIdeas)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localIdeasLoadingStatus === 'initial') {
            dispatch(localIdeasLoadingThunk())
        }
    }, [localIdeasLoadingStatus, dispatch])

    return localIdeasState
}
