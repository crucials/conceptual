import { useEffect } from 'react'
import { Card, Divider, Paper, Title } from '@mantine/core'
import { RichTextEditor } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import { Idea } from '@/types/idea'
import tiptapExtensions from '@/tiptap-extensions'

export default function IdeaPreview({ idea, styles }: { idea?: Idea, styles: Record<string, string> }) {
    const editor = useEditor({
        immediatelyRender: false,
        editable: false,
        extensions: tiptapExtensions,
        content: idea?.content,
    })

    useEffect(() => {
        if (idea?.content !== editor?.getHTML()) {
            editor?.commands.setContent(idea?.content || '')
        }
    }, [idea])

    return idea ? (
        <>
            <Title order={1} mb="lg">
                {idea.title}
            </Title>

            <Paper bg="#00000010" p="md" radius={8}>
                <RichTextEditor editor={editor} className={styles['borderless-idea-content']}>
                    <RichTextEditor.Content bg="#FFFFFF" />
                </RichTextEditor>
            </Paper>
        </>
    ) : (
        <></>
    )
}
