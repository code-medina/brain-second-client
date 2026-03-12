import z from 'zod'
export const DevLogSchema = z.object({
  _id: z.string(),
  createdAt: z.iso.datetime().transform(value => new Date(value)),
  content: z
    .string()
    .min(3, 'too short, content must be 3 characters')
    .max(300, 'content maximun of 300 characters'),
  nota: z
    .string()
    .min(3, 'nota too short')
    .max(50, 'nota too large, maximun of 50 characters')
    .optional(),
})
export type DevLogSchema = z.infer<typeof DevLogSchema>
