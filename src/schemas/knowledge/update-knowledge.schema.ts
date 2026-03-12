import type z from 'zod'
import { KnowledgeSchema } from './knowledge.schema'
import { IdSchema } from '../common/common.schema'

export const UpdateKnowledgeSchema = KnowledgeSchema.partial().extend({
  _id: IdSchema,
})
export type UpdateKnowledgeSchema = z.infer<typeof UpdateKnowledgeSchema>
/* 
export const UpdateKnowledgeSchema = z.object({
  _id: z.string(),
  title: z.string().min(3, 'too short').max(30, 'too large , maximun of 30 characteres').optional(),
  content: z.string().min(3, 'too short').max(2000, 'maximun of 1000 characteres').optional(),
})
 */
