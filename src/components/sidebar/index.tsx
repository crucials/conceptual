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
import { IconExclamationCircle } from '@tabler/icons-react'
import { useAppSelector } from '@/stores/hooks'
import { selectLocalIdeas } from '@/stores/local-ideas'
import IdeasList from '@/components/sidebar/ideas-list'

export default function Sidebar() {
    const ideas = useAppSelector(selectLocalIdeas)

    return (
        <AppShell.Navbar p="lg">
            <Transition mounted={ideas.status === 'loaded' && Boolean(ideas.items)} transition="scale">
                {styles => <IdeasList ideasState={ideas} style={styles} />}
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
