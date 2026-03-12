import { IdeaSchema } from "./idea.schema";
import type z from "zod";

export const IdIdeaSchema=IdeaSchema.pick({_id:true});
export type IdIdeaSchema=z.infer<typeof IdIdeaSchema>;