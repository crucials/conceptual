import Link from 'next/link'
import { AppShell, Button, Divider, NavLink, ScrollArea } from '@mantine/core'
import { IconBulb } from '@tabler/icons-react'

export default function Sidebar() {
    return (
        <AppShell.Navbar p="lg">
            <ScrollArea scrollbarSize={10} pr="lg">
                <Button mb="md" mih={37} w="100%">
                    Create
                </Button>

                <ul>
                    {Array(20)
                        .fill(1)
                        .map(() => (
                            <li key={Math.random()}>
                                <NavLink
                                    href="/ideas/2"
                                    label="idea 1"
                                    component={Link}
                                    leftSection={<IconBulb size={22} />}
                                />
                                <Divider my="xs" />
                            </li>
                        ))}
                </ul>
            </ScrollArea>
        </AppShell.Navbar>
    )
}
