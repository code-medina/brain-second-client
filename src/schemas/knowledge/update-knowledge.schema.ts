import z from 'zod'
export const UpdateKnowledgeSchema = z.object({
  _id: z.string(),
  title: z.string().min(3, 'too short').max(30, 'too large , maximun of 30 characteres').optional(),
  content: z.string().min(3, 'too short').max(2000, 'maximun of 1000 characteres').optional(),
})
