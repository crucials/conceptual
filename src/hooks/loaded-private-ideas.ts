import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/stores/hooks'
import { selectPrivateIdeas, selectPrivateIdeasStatus } from '@/stores/private-ideas'
import { privateIdeasLoadingThunk } from '@/stores/private-ideas/thunks'

/**
 * loads ideas from indexed DB into the store
 * @returns private ideas state (items, loading status, etc.)
 */
export function useLoadedPrivateIdeas() {
    const privateIdeasStatus = useAppSelector(selectPrivateIdeasStatus)
    const privateIdeasState = useAppSelector(selectPrivateIdeas)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (privateIdeasStatus === 'initial') {
            dispatch(privateIdeasLoadingThunk())
        }
    }, [privateIdeasStatus, dispatch])

    return privateIdeasState
}
