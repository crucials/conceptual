import { useEffect } from 'react'
import { Title } from '@mantine/core'
import { RichTextEditor } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import { Idea } from '@/types/idea'
import tiptapExtensions from '@/tiptap-extensions'

export default function IdeaPreview({ idea }: { idea?: Idea }) {
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

            <RichTextEditor editor={editor}>
                <RichTextEditor.Content bg="#FFFFFF" />
            </RichTextEditor>
        </>
    ) : (
        <></>
    )
}
