import { Idea } from '@/types/idea'
import { Title } from '@mantine/core'

export default function IdeaPreview({ idea }: { idea?: Idea }) {
    return idea ? (
        <>
            <Title order={1} mb="lg">
                {idea.title}
            </Title>

            <div dangerouslySetInnerHTML={{ __html: idea?.content || '' }}></div>
        </>
    ) : (
        <></>
    )
}
