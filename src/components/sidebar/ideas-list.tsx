import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, CSSProperties, Divider, NavLink, ScrollArea } from '@mantine/core'
import { Icon3dCubeSphere } from '@tabler/icons-react'
import { LocalIdeasState } from '@/stores/local-ideas'
import { useAppDispatch } from '@/stores/hooks'
import { localIdeasCreationThunk } from '@/stores/local-ideas/thunks'

export default function IdeasList({
    ideasState,
    style,
}: {
    ideasState: LocalIdeasState
    style?: CSSProperties
}) {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState(false)

    function handleIdeaCreation() {
        setLoading(true)

        dispatch(
            localIdeasCreationThunk({
                title: 'enter something here',
                content: 'and here',
            }),
        ).then(() => {
            setLoading(false)
            router.push(`/ideas/${ideasState.items.at(-1)?.id}`)
        })
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
