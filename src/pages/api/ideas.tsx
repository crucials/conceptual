import { NextApiRequest, NextApiResponse } from 'next'
import { Idea } from '@/types/idea'

export default function getIdeas(
    request: NextApiRequest,
    response: NextApiResponse<Idea[]>,
) {
    response.json([{ id: 1, title: '123', content: '123' }])
}
