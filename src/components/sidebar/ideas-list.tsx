import { useState } from 'react'
import Link from 'next/link'
import { Button, CSSProperties, Divider, NavLink, ScrollArea } from '@mantine/core'
import { Icon3dCubeSphere } from '@tabler/icons-react'
import { PrivateIdeasState } from '@/stores/private-ideas'
import { useAppDispatch } from '@/stores/hooks'
import { privateIdeasCreationThunk } from '@/stores/private-ideas/thunks'

export default function IdeasList({
    ideasState,
    style,
}: {
    ideasState: PrivateIdeasState
    style?: CSSProperties
}) {
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState(false)

    function handleIdeaCreation() {
        setLoading(true)

        dispatch(
            privateIdeasCreationThunk({
                title: 'enter something here',
                content: 'and here',
            }),
        ).then(() => setLoading(false))
    }

    return (
        <ScrollArea scrollbarSize={10} offsetScrollbars scrollbars="y" style={style}>
            <Button
                mb="xl"
                mih={37}
                w="100%"
                onClick={handleIdeaCreation}
                loading={loading}
            >
                Create
            </Button>

            {ideasState.items.map(idea => (
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
    )
}
