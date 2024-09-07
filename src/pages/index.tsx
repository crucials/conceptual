import styles from '@/styles/home-page.module.css'

import { useEffect } from 'react'
import { Container, Text, Title } from '@mantine/core'
import { useAppDispatch, useAppSelector } from '@/stores/hooks'
import { privateIdeasLoadingThunk } from '@/stores/private-ideas/thunks'
import { selectPrivateIdeasStatus } from '@/stores/private-ideas'

export default function HomePage() {
    const privateIdeasStatus = useAppSelector(selectPrivateIdeasStatus)
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log(privateIdeasStatus)
        
        if (privateIdeasStatus === 'initial') {
            dispatch(privateIdeasLoadingThunk())
        }
    }, [privateIdeasStatus, dispatch])

    return (
        <Container fluid p="xl">
            <Title order={1} mb="md">
                have an idea?
            </Title>

            <Text>select or create a concept in sidebar</Text>
        </Container>
    )
}
