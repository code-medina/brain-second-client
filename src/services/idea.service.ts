import type { IdSchema } from '../schemas/common/common.schema'
import type { CreateIdeaSchema } from '../schemas/idea/create-idea.schema'

import type { UpdateIdeaSchema } from '../schemas/idea/update-idea.schema'

export class IdeaService {
  static async create(dto: CreateIdeaSchema) {
    console.log('fetch  create idea', dto)
  }
  static async getAll() {
    console.log('fectch get all idea')
  }
  static async getOne(id: IdSchema) {
    console.log('fecth get one idea',id)
  }
  static async update(dto: UpdateIdeaSchema) {
    console.log('fectch update idea', dto)
  }
  static async destroy(id: IdSchema) {
    console.log('featch destroy idea', id)
  }
}
