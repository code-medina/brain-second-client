import type z from 'zod'
import { KnowledgeSchema } from './knowledge.schema'

export const CreateKnowledgeSchema = KnowledgeSchema.omit({ _id: true, createdAt: true })
export type CreateKnowledgeSchema = z.infer<typeof CreateKnowledgeSchema>
