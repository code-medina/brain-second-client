import type { CreateKnowledgeSchema } from '../schemas/knowledge/create-knowledge.schema'

export class KnowledgeService {
  createKnowledge = async (dto: CreateKnowledgeSchema) => {
    const _id = '1'
    const createdAt = new Date()
    return { _id, title: dto.title, content: dto.content, createdAt }
  }
}
