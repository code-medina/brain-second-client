import type z from 'zod'
import { IdeaSchema } from './idea.schema'
import { IdSchema } from '../common/common.schema'


export const UpdateIdeaSchema=IdeaSchema.partial().extend({
  _id:IdSchema
})

export type UpdateIdeaSchema = z.infer<typeof UpdateIdeaSchema>
/* 
export const UpdateIdeaSchema = z.object({
  _id: z.string(),
  title: z.string().min(3, 'too schort').max(30, 'maximum of 30 characters').optional(),
  description: z.string().min(3, ' too short ').max(300, 'maximum of 300 characters').optional(),
})
 */