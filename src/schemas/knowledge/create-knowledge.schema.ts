import type z from 'zod'
import { KnowledgeSchema } from './knowledge.schema'

export const CreateKwoledgeSchema = KnowledgeSchema.omit({ _id: true, createdAt: true })
export type CreateKwoledgeSchema = z.infer<typeof CreateKwoledgeSchema>
