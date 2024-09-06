import styles from '@/styles/home-page.module.css'

import { Container, Text, Title } from '@mantine/core'

export default function HomePage() {
    return (
        <Container fluid p="xl">
            <Title order={1} mb="md">
                have an idea?
            </Title>

            <Text>select or create a concept in sidebar</Text>
        </Container>
    )
}
