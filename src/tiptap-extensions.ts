import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Image from '@tiptap/extension-image'
import { getTaskListExtension } from '@mantine/tiptap'

export default [
    StarterKit,
    Link,
    Underline,
    Superscript,
    SubScript,
    Highlight,
    TaskItem.configure({
        nested: true,
        HTMLAttributes: {
            class: 'test-item',
            disabled: 'true'
        }
    }),
    getTaskListExtension(TaskList),
    Image,
]
