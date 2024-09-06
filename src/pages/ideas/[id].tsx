import { useRouter } from 'next/router'
import { Container, Title } from '@mantine/core'

export default function Idea() {
    const router = useRouter()

    return (
        <Container fluid p="lg">
            <Title order={1}>idea {router.query.id}</Title>
        </Container>
    )
}
