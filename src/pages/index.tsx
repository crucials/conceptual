import styles from '@/styles/home-page.module.css'

import Link from 'next/link'
import { AppShell, Button, Container, Divider, NavLink, ScrollArea, Text, Title } from '@mantine/core'
import { IconBulb } from '@tabler/icons-react'

export default function HomePage() {
    return (
        <AppShell navbar={{ width: 300, breakpoint: '' }}>
            <AppShell.Navbar p="lg">
                <ScrollArea scrollbarSize={10} pr="lg">
                    <Button mb="md" mih={37} w="100%">
                        Create
                    </Button>

                    <ul>
                        {Array(20).fill(1).map(() => (
                            <li key={Math.random()}>
                                <NavLink href="/something" label="idea 1" component={Link} leftSection={<IconBulb size={22} />} />
                                <Divider my="xs" />
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </AppShell.Navbar>

            <AppShell.Main>
                <Container fluid p="xl">
                    <Title order={1} mb="md">have an idea?</Title>

                    <Text>
                        select or create a concept in sidebar
                    </Text>
                </Container>
            </AppShell.Main>
        </AppShell>
    )
}
