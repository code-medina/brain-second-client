import z from 'zod'
import { BaseEntitySchema } from '../common/base-entity.schema'

const DESCRIPTION_MAX = 300
const DESCRIPTION_MIN = 3

const TITLE_MIN = 3
const TITLE_MAX = 20

export const IdeaSchema = BaseEntitySchema.extend({
  title: z
    .string()
    .min(TITLE_MIN, `[ title ] too short`)
    .max(TITLE_MAX, `[ title ] maximun of ${TITLE_MAX} characteres`),
  description: z
    .string()
    .min(DESCRIPTION_MIN, `[description] too short`)
    .max(DESCRIPTION_MAX, `[description] maximun of ${DESCRIPTION_MAX} characters`),
})
export type IdeaSchema = z.infer<typeof IdeaSchema>

/* export const IdeaSchema=z.object({
    _id:z.string(),
    title:z.string().min(3,"too schort").max(30,"maximum of 30 characters"),
    description:z.string().min(3, " too short ").max(300,"maximum of 300 characters"),
    createdAt:z.iso.datetime().transform(val=>new Date(val))

});
 */
