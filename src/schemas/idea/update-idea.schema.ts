import z from 'zod'

export const UpdateIdeaSchema = z.object({
  _id: z.string(),
  title: z.string().min(3, 'too schort').max(30, 'maximum of 30 characters').optional(),
  description: z.string().min(3, ' too short ').max(300, 'maximum of 300 characters').optional(),
})
export type UpdateIdeaSchema = z.infer<typeof UpdateIdeaSchema>
