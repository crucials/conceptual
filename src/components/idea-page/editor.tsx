import { BubbleMenu, useEditor } from '@tiptap/react'
import { RichTextEditor } from '@mantine/tiptap'
import { Button, Divider, TextInput } from '@mantine/core'
import { tiptapExtensions } from '@/tiptap-extensions'
import { Idea } from '@/types/idea'
import { useEffect } from 'react'
import { IconTrash } from '@tabler/icons-react'

interface IdeaEditorProps {
    idea?: Idea
    styles: Record<string, string>
    onIdeaUpdate: (newIdeaValue: Idea) => void
    onIdeaDeletion: () => void
}

export default function IdeaEditor({ idea, onIdeaUpdate, onIdeaDeletion, styles }: IdeaEditorProps) {
    const contentEditor = useEditor({
        immediatelyRender: false,
        extensions: tiptapExtensions,
        content: idea?.textContent,
        onUpdate(props) {
            if (idea) {
                onIdeaUpdate({
                    ...idea,
                    textContent: props.editor.getHTML(),
                })
            }
        },
    })

    useEffect(() => {
        if (idea?.textContent !== contentEditor?.getHTML()) {
            contentEditor?.commands.setContent(idea?.textContent || '')
        }
    }, [idea?.textContent, contentEditor])

    return idea ? (
        <>
            <TextInput
                value={idea.title}
                onChange={event =>
                    onIdeaUpdate({ ...idea, title: event.target.value })
                }
                placeholder="title"
                size="xl"
                mb="lg"
                className={styles['title-field']}
            />

            <RichTextEditor editor={contentEditor} mb="xl">
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.TaskList />
                        <RichTextEditor.TaskListLift />
                        <RichTextEditor.TaskListSink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.ClearFormatting />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Undo />
                        <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <BubbleMenu editor={contentEditor}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.ClearFormatting />
                    </RichTextEditor.ControlsGroup>
                </BubbleMenu>

                <RichTextEditor.Content classNames={{ root: '123' }} />
            </RichTextEditor>

            <Divider mb="xl" />

            <Button color="red" leftSection={<IconTrash />} onClick={onIdeaDeletion}>
                delete idea
            </Button>
        </>
    ) : (
        <></>
    )
}
