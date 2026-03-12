import z from 'zod'

const TITLE_MIN = 3
const TITLE_MAX = 30
const ID_MIN=1;
const CONTENT_MIN=3;
const CONTENT_MAX=2000;

export const TitleSchema = z
  .string()
  .min(TITLE_MIN, `Title must have at least ${TITLE_MIN} characters`)
  .max(TITLE_MAX, `Title must have at most ${TITLE_MAX} characters`)

  export type TitleSchema = z.infer<typeof TitleSchema>

export const IdSchema = z.string().min(ID_MIN, '[Id] too short');
export type IdSchema = z.infer<typeof IdSchema>

export const ContentSchema = z
  .string()
  .min(CONTENT_MIN, '[Content] too short')
  .max(CONTENT_MAX, `[Content] maximun of ${CONTENT_MAX} characteres`);

export type ContentSchema = z.infer<typeof ContentSchema>

export const CreatedAtSchema = z.iso
  .datetime({ message: '[Date] invalid' })
  .transform(value => new Date(value))
export type CreatedAtSchema = z.infer<typeof CreatedAtSchema>
