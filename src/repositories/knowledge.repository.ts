import type { CreateKnowledgeSchema } from '../schemas/knowledge/create-knowledge.schema'
import type { KnowledgeSchema } from '../schemas/knowledge/knowledge.schema'
import { generateUUID } from '../lib/uuid'
export interface KnowledgeRespository {
  create(dto: CreateKnowledgeSchema): Promise<KnowledgeSchema>
  list(): Promise<KnowledgeSchema[]>
}
export class KnowledgeStorageRespository implements KnowledgeRespository {
  private key = 'knowledge'
  private readStorage() {
    const list = localStorage.getItem(this.key) || '[]'
    return JSON.parse(list) || []
  }
  private saveStorage(list: KnowledgeSchema[]) {
    localStorage.setItem(this.key, JSON.stringify(list))
  }
  private insertStorage(knowledge: KnowledgeSchema) {
    const list: KnowledgeSchema[] = this.readStorage()
    list.push(knowledge)
    this.saveStorage(list)
  }
  //crud
  async create(dto: CreateKnowledgeSchema): Promise<KnowledgeSchema> {
    const _id = generateUUID()
    const createdAt = new Date()
    const newKnowledge = { _id, title: dto.title, content: dto.content, createdAt }
    this.insertStorage(newKnowledge)
    return newKnowledge
  }
  async list(): Promise<KnowledgeSchema[]> {
    return this.readStorage()
  }
}
