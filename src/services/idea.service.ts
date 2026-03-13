import type { IdeaRepository } from '../repositories/idea.repository'
import type { IdSchema } from '../schemas/common/common.schema'
import type { CreateIdeaSchema } from '../schemas/idea/create-idea.schema'

import type { UpdateIdeaSchema } from '../schemas/idea/update-idea.schema'

export class IdeaService {
  private repo: IdeaRepository
  constructor(repository: IdeaRepository) {
    this.repo = repository
  }

  async create(dto: CreateIdeaSchema) {
    return await this.repo.create(dto)
  }
  async getAll() {
    return await this.repo.list()
  }
  static async getOne(id: IdSchema) {
    console.log('fecth get one idea', id)
  }
  async update(dto: UpdateIdeaSchema) {

    console.log('fectch update idea', dto)
  return  await this.repo.update(dto);
  }
   async destroy(id: IdSchema) {
    console.log('featch destroy idea', id)
    await this.repo.destroy(id);
  }
}
