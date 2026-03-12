import type z from "zod";

import { IdeaSchema } from './idea.schema'


export const CreateIdeaSchema = IdeaSchema.omit({ _id: true, createdAt: true });
export type CreateIdeaSchema=z.infer<typeof CreateIdeaSchema>;
