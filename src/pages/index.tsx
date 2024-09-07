import { Container, Text, Title } from '@mantine/core'
import { useLoadedPrivateIdeas } from '@/hooks/loaded-private-ideas'

export default function HomePage() {
    useLoadedPrivateIdeas()

    return (
        <Container fluid p="xl">
            <Title order={1} mb="md">
                have an idea?
            </Title>

            <Text>select or create a concept in sidebar</Text>
        </Container>
    )
}
