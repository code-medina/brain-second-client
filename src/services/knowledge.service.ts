import type { KnowledgeRespository } from '../repositories/knowledge.repository'
import type { IdSchema } from '../schemas/common/common.schema'
import type { CreateKnowledgeSchema } from '../schemas/knowledge/create-knowledge.schema'
import type { UpdateKnowledgeSchema } from '../schemas/knowledge/update-knowledge.schema'

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
  getById = async (id: string) => {
    const list = await this.repo.list()
    return list.find(l => l._id === id)
  }
  update = async (dto: UpdateKnowledgeSchema) => {
    return await this.repo.update(dto)
  }
  destroy = async (id: IdSchema) => {
    return await this.repo.destroy(id)
  }
}
