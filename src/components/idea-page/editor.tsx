import { BubbleMenu, useEditor } from '@tiptap/react'
import { RichTextEditor } from '@mantine/tiptap'
import { TextInput } from '@mantine/core'
import tiptapExtensions from '@/tiptap-extensions'
import { Idea } from '@/types/idea'
import { useEffect } from 'react'

interface IdeaEditorProps {
    idea?: Idea
    styles: Record<string, string>
    onIdeaUpdate: (newIdeaValue: Idea) => void
}

export default function IdeaEditor({ idea, onIdeaUpdate, styles }: IdeaEditorProps) {
    const contentEditor = useEditor({
        immediatelyRender: false,
        extensions: tiptapExtensions,
        content: idea?.content,
        onUpdate(props) {
            if (idea) {
                onIdeaUpdate({
                    ...idea,
                    content: props.editor.getHTML(),
                })
            }
        },
    })

    useEffect(() => {
        if (idea?.content !== contentEditor?.getHTML()) {
            contentEditor?.commands.setContent(idea?.content || '')
        }
    }, [idea?.content])

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

            <RichTextEditor editor={contentEditor}>
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
        </>
    ) : (
        <></>
    )
}
