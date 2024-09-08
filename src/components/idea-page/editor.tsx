import styles from '@/styles/idea-editor.module.css'

import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import Highlight from '@tiptap/extension-highlight'
import { RichTextEditor } from '@mantine/tiptap'
import { TextInput } from '@mantine/core'
import { Idea } from '@/types/idea'

interface IdeaEditorProps {
    idea?: Idea
    onIdeaUpdate: (newIdeaValue: Idea) => void
}

export default function IdeaEditor({ idea, onIdeaUpdate }: IdeaEditorProps) {
    const contentEditor = useEditor({
        immediatelyRender: false,
        extensions: [StarterKit, Underline, Link, Superscript, SubScript, Highlight],
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
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.ClearFormatting />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Undo />
                        <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
                <RichTextEditor.Content classNames={{ root: '123' }} />
            </RichTextEditor>
        </>
    ) : (
        <></>
    )
}
