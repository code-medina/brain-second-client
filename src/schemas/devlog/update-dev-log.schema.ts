import z from 'zod'
export const UpdateDevLogSchema = z.object({
  _id: z.string(),
  content: z
    .string()
    .min(3, 'too short, content must be 3 characters')
    .max(300, 'content maximun of 300 characters')
    .optional(),
  nota: z
    .string()
    .min(3, 'nota too short')
    .max(50, 'nota too large, maximun of 50 characters')
    .optional(),
})
export type UpdateDevLogSchema = z.infer<typeof UpdateDevLogSchema>
