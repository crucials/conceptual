import Link from 'next/link'
import { AppShell, Button, Divider, NavLink, ScrollArea } from '@mantine/core'
import { Icon3dCubeSphere } from '@tabler/icons-react'
import { useAppSelector } from '@/stores/hooks'
import { selectPrivateIdeas } from '@/stores/private-ideas'

export default function Sidebar() {
    const ideas = useAppSelector(selectPrivateIdeas)

    return (
        <AppShell.Navbar p="lg">
            <ScrollArea scrollbarSize={10} offsetScrollbars scrollbars="y">
                <Button mb="xl" mih={37} w="100%">
                    Create
                </Button>

                {ideas.map(idea => (
                    <div key={idea.id}>
                        <NavLink
                            component={Link}
                            href={`/ideas/${idea.id}`}
                            label={idea.title}
                            leftSection={<Icon3dCubeSphere size={22} />}
                        />
                        <Divider my="xs" />
                    </div>
                ))}
            </ScrollArea>
        </AppShell.Navbar>
    )
}
