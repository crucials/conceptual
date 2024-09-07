import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/stores'

/**
 * use throughout your app instead of plain `useDispatch`
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

/**
 * use throughout your app instead of plain `useSelector`
 */
export const useAppSelector = useSelector.withTypes<RootState>()
