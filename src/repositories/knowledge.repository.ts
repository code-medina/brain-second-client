import type { CreateKnowledgeSchema } from '../schemas/knowledge/create-knowledge.schema'
import type { KnowledgeSchema } from '../schemas/knowledge/knowledge.schema'
import { generateUUID } from '../lib/uuid'
import type { UpdateKnowledgeSchema } from '../schemas/knowledge/update-knowledge.schema'
import type { IdSchema } from '../schemas/common/common.schema'
export interface KnowledgeRespository {
  create(dto: CreateKnowledgeSchema): Promise<KnowledgeSchema>
  list(): Promise<KnowledgeSchema[]>
  getById(id: string): Promise<KnowledgeSchema | null>
  update(dto: UpdateKnowledgeSchema): Promise<KnowledgeSchema>
  destroy(id: IdSchema): Promise<void>
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
  async getById(id: string): Promise<KnowledgeSchema | null> {
    const array = await this.list()
    return array.find(k => k._id === id) || null
  }
  async update(dto: UpdateKnowledgeSchema) {
    const array = await this.list()
    const index = array.findIndex(k => k._id === dto._id)
    if (index === -1) {
      throw new Error('Not Foound Knowledge')
    }
    array[index] = {
      _id: array[index]._id,
      createdAt: array[index].createdAt,
      content: dto.content || array[index].content,
      title: dto.title || array[index].title,
    }
    this.saveStorage(array)
    return array[index]
  }
  async destroy(id: string) {
    const array = await this.list()
    const filterArray = array.filter(k => k._id !== id)
    if (array.length !== filterArray.length) {
      this.saveStorage(filterArray)
    }
  }
}
