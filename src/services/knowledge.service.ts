import type { KnowledgeRespository } from '../repositories/knowledge.repository'
import type { CreateKnowledgeSchema } from '../schemas/knowledge/create-knowledge.schema'

export class KnowledgeService {
  private repo: KnowledgeRespository
  constructor(repo: KnowledgeRespository) {
    this.repo = repo
  }
  createKnowledge = async (dto: CreateKnowledgeSchema) => {
    return await this.repo.create(dto)
  }
  listKnowledge = async () => {
    return await this.repo.list()
  }
}
