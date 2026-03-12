import z from "zod";

export const IdeaSchema=z.object({
    _id:z.string(),
    title:z.string().min(3,"too schort").max(30,"maximum of 30 characters"),
    description:z.string().min(3, " too short ").max(300,"maximum of 300 characters"),
    createdAt:z.iso.datetime().transform(val=>new Date(val))

});
export type Idea=z.infer<typeof IdeaSchema>;
