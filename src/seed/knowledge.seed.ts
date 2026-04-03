import type { KnowledgeSchema } from "../schemas/knowledge/knowledge.schema";

export const knowledgeSeed:KnowledgeSchema[]=[{
    _id: "1",
    createdAt: new Date(),
    title: "title 1",
    content: "content 1"
},{
    _id: "2",
    createdAt: new Date(),
    title: "title 2",
    content: "content 2"
},
{
    _id: "3",
    createdAt: new Date(),
    title: "title 3",
    content: "content 3"
}]