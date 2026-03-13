import { generateUUID } from '../lib/uuid'
import type { IdSchema } from '../schemas/common/common.schema'
import type { CreateIdeaSchema } from '../schemas/idea/create-idea.schema'
import type { IdeaSchema } from '../schemas/idea/idea.schema'
import type { UpdateIdeaSchema } from '../schemas/idea/update-idea.schema'
import type { IdeaRepository } from './idea.repository'
localStorage.clear()
export class LocalStorageRespository implements IdeaRepository {
  private key = 'ideas'

  private read() {
    const ideas = localStorage.getItem(this.key)
    if (ideas) {
      return JSON.parse(ideas) as IdeaSchema[]
    }
    return []
  }
  private write(ideas: IdeaSchema[]) {
    const json = JSON.stringify(ideas)
    localStorage.setItem(this.key, json)
  }
  private save(idea: IdeaSchema) {
    const ideas = this.read()
    const index = ideas.findIndex(i => i._id === idea._id)
    if (index === -1) {
      ideas.push(idea)
    } else {
      ideas[index] = idea
    }

    this.write(ideas)
  }

  async update(data: UpdateIdeaSchema): Promise<IdeaSchema> {
    const ideas = this.read()

    const id = data._id
    console.log("id",id);
    const index = ideas.findIndex(i => i._id === id)
    if (index === -1) {
      throw new Error('Not found idea:' + id)
    }
    const edit = { ...ideas[index], ...data }
    console.log('editado', edit)
    this.save(edit)
    return edit
  }

  async destroy(id: IdSchema): Promise<void> {
    const list = this.read()
    const filterList = list.filter(i => i._id !== id)
    if (filterList.length !== list.length) {
      this.write(filterList)
    }
  }

  async create(data: CreateIdeaSchema): Promise<IdeaSchema> {
    const _id = generateUUID()
    const createdAt = new Date()
    const newIdea = { ...data, _id, createdAt }
    this.save(newIdea)
    return newIdea
  }
  async list(): Promise<IdeaSchema[]> {
    return this.read()
  }
}
