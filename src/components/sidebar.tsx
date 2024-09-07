import Link from 'next/link'
import {
    Alert,
    AppShell,
    Button,
    Divider,
    Loader,
    NavLink,
    ScrollArea,
    Transition,
} from '@mantine/core'
import { Icon3dCubeSphere, IconExclamationCircle } from '@tabler/icons-react'
import { useAppSelector } from '@/stores/hooks'
import { selectPrivateIdeas, selectPrivateIdeasItems } from '@/stores/private-ideas'

export default function Sidebar() {
    const ideas = useAppSelector(selectPrivateIdeas)

    return (
        <AppShell.Navbar p="lg">
            <Transition mounted={ideas.status === 'loaded'} transition="scale">
                {styles => (
                    <ScrollArea
                        scrollbarSize={10}
                        offsetScrollbars
                        scrollbars="y"
                        style={styles}
                    >
                        <Button mb="xl" mih={37} w="100%">
                            Create
                        </Button>

                        {ideas.items.map(idea => (
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
                )}
            </Transition>

            <Transition mounted={ideas.status === 'error'} transition="scale">
                {styles => (
                    <Alert
                        variant="filled"
                        color="red"
                        title="an error happened"
                        icon={<IconExclamationCircle />}
                        style={styles}
                    >
                        {ideas.errorMessage}
                    </Alert>
                )}
            </Transition>

            {ideas.status === 'pending' && <Loader mx="auto" />}
        </AppShell.Navbar>
    )
}
