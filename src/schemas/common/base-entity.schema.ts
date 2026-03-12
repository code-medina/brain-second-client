import z from "zod";
import { CreatedAtSchema, IdSchema } from "./common.schema";

export const BaseEntitySchema=z.object({
    _id:IdSchema,
    createdAt:CreatedAtSchema
});
export type BaseEntitySchema=z.infer<typeof BaseEntitySchema>;