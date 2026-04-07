import  type z from 'zod'
import { BaseEntitySchema } from '../common/base-entity.schema'
import { ContentSchema, TitleSchema } from '../common/common.schema'


export const KnowledgeSchema=BaseEntitySchema.extend({
    title:TitleSchema,
    content:ContentSchema
})
export type KnowledgeSchema = z.infer<typeof KnowledgeSchema>

/* export const KnowledgeSchema = z.object({
  _id: z.string(),
  title: z.string().min(3, 'too short').max(30, 'too large , maximun of 30 characteres'),
  content: z.string().min(3, 'too short').max(2000, 'maximun of 2000 characteres'),
  createdAt: z.iso.datetime(),
})
 */