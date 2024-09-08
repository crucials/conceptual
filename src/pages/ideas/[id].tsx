import styles from '@/styles/idea-page.module.css'

import { useEffect } from 'react'
import ContentEditable from 'react-contenteditable'
import { notFound } from 'next/navigation'
import { useRouter } from 'next/router'
import { Container, Skeleton, Text, Title, Transition } from '@mantine/core'
import { useAppDispatch, useAppSelector } from '@/stores/hooks'
import { selectLocalIdeas, updateIdea } from '@/stores/local-ideas'
import { UnexpectedError } from '@/errors/unexpected-error'
import type { Idea } from '@/types/idea'
import { useDebouncedCallback } from '@mantine/hooks'
import { localIdeaSynchronizationThunk } from '@/stores/local-ideas/thunks'

export default function Idea() {
    const router = useRouter()

    const localIdeas = useAppSelector(selectLocalIdeas)
    const dispatch = useAppDispatch()

    const handleDatabaseSynchronization = useDebouncedCallback(async () => {
        if (idea) {
            await dispatch(localIdeaSynchronizationThunk({
                ideaToUpdateId: idea.id,
                newIdeaValue: idea,
            }))
            console.log('synced with idb')
        }
    }, 500)

    const idea = localIdeas.items.find(idea => `${idea.id}` === router.query.id)

    useEffect(() => {
        if (localIdeas.status === 'loaded') {
            if (!idea) {
                notFound()
            }
        } else if (localIdeas.status === 'error') {
            throw new UnexpectedError(localIdeas.errorMessage || undefined)
        }
    }, [localIdeas.status])

    function handleIdeaUpdate(newIdeaData: Partial<Idea>) {
        if (idea) {
            dispatch(updateIdea({
                ideaToUpdateId: idea.id,
                newIdeaData
            }))

            handleDatabaseSynchronization()
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
                        <Title order={1}>
                            <ContentEditable
                                tagName="span"
                                className={styles['editable-title-content']}
                                onChange={event =>
                                    handleIdeaUpdate({
                                        title: event.target.value,
                                    })
                                }
                                html={idea?.title || ''}
                            />
                        </Title>

                        <Text>{idea?.content}</Text>
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
