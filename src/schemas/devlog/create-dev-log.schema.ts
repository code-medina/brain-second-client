import type z from 'zod'
import { DevLogSchema } from './dev-log.schema'

export const CreateDevLogSchema = DevLogSchema.omit({ _id: true, createdAt: true })
export type CreateDevLogSchema = z.infer<typeof CreateDevLogSchema>
