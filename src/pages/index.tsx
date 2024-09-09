import Head from 'next/head'
import { Container, Text, Title } from '@mantine/core'

export default function HomePage() {
    return (
        <>
            <Head>
                <title>your ideas</title>
            </Head>

            <Container fluid p="xl">
                <Title order={1} mb="md">
                    have an idea?
                </Title>

                <Text>select or create a concept in the sidebar</Text>
            </Container>
        </>
    )
}
