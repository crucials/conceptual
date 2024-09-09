import styles from '@/styles/idea-page.module.css'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { useRouter } from 'next/router'
import { Container, Skeleton, Tabs, Transition } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import { IconEye, IconPencil } from '@tabler/icons-react'
import { UnexpectedError } from '@/errors/unexpected-error'
import { useAppDispatch, useAppSelector } from '@/stores/hooks'
import { selectLocalIdeas, updateIdea } from '@/stores/local-ideas'
import { localIdeaDeletionThunk, localIdeaSynchronizationThunk } from '@/stores/local-ideas/thunks'
import type { Idea } from '@/types/idea'
import IdeaPreview from '@/components/idea-page/preview'
import IdeaEditor from '@/components/idea-page/editor'

export default function Idea() {
    const router = useRouter()

    const localIdeas = useAppSelector(selectLocalIdeas)
    const dispatch = useAppDispatch()

    const handleDatabaseSynchronization = useDebouncedCallback(async () => {
        if (idea) {
            await dispatch(
                localIdeaSynchronizationThunk({
                    ideaToUpdateId: idea.id,
                    newIdeaValue: idea,
                }),
            )
            console.log('synced with idb')
        }
    }, 500)

    const idea = localIdeas.items.find(idea => `${idea.id}` === router.query.id)
    const [ideaDeleted, setIdeaDeleted] = useState(false)

    useEffect(() => {
        if (localIdeas.status === 'loaded') {
            if (!idea && !ideaDeleted) {
                notFound()
            }
        } else if (localIdeas.status === 'error') {
            throw new UnexpectedError(localIdeas.errorMessage || undefined)
        }
    }, [localIdeas, idea, ideaDeleted])

    function handleIdeaUpdate(newIdeaData: Partial<Idea>) {
        if (idea) {
            dispatch(
                updateIdea({
                    ideaToUpdateId: idea.id,
                    newIdeaData,
                }),
            )

            handleDatabaseSynchronization()
        }
    }

    async function handleIdeaDeletion() {
        if (idea) {
            setIdeaDeleted(true)
            await dispatch(localIdeaDeletionThunk({ ideaToDeleteId: idea.id }))
            router.push('/')
        }
    }

    return (
        <Container fluid p="xl">
            <Transition
                mounted={localIdeas.status === 'loaded' && idea !== undefined}
                transition="fade"
            >
                {transitionStyles => (
                    <div style={transitionStyles}>
                        <Tabs defaultValue="preview" variant="outline">
                            <Tabs.List mb="lg">
                                <Tabs.Tab
                                    value="preview"
                                    leftSection={<IconEye size={22} />}
                                >
                                    preview
                                </Tabs.Tab>

                                <Tabs.Tab
                                    value="edit"
                                    leftSection={<IconPencil size={22} />}
                                >
                                    edit
                                </Tabs.Tab>
                            </Tabs.List>

                            <Tabs.Panel value="preview">
                                <IdeaPreview idea={idea} />
                            </Tabs.Panel>

                            <Tabs.Panel value="edit">
                                <IdeaEditor
                                    idea={idea}
                                    onIdeaUpdate={handleIdeaUpdate}
                                    onIdeaDeletion={handleIdeaDeletion}
                                    styles={styles}
                                />
                            </Tabs.Panel>
                        </Tabs>
                    </div>
                )}
            </Transition>

            {localIdeas.status === 'pending' && (
                <div>
                    <Skeleton height={35} mb="lg" />

                    <Skeleton height={12} mb="sm" width="80%" />
                    <Skeleton height={12} mb="sm" width="70%" />
                </div>
            )}
        </Container>
    )
}
