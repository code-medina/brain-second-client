import z from "zod";

export const KnowledgeSchema=z.object({
    _id:z.string(),
    title:z.string().min(3,"too short").max(30,"too large , maximun of 30 characteres"),
    content:z.string().min(3,"too short").max(2000,"maximun of 1000 characteres"),
    createdAt:z.iso.datetime()
})
export type KnowledgeSchema=z.infer<typeof KnowledgeSchema>;