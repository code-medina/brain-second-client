import type { CreateIdeaSchema } from '../schemas/idea/create-idea.schema'
import type { IdIdeaSchema } from '../schemas/idea/id-idea.schema'
import type { UpdateIdeaSchema } from '../schemas/idea/update-idea.schema'

export class IdeaService {
  static async create(dto: CreateIdeaSchema) {
    console.log('fetcha create', dto)
  }
  static async getAll() {
    console.log('fectch get all')
  }
  static async getOne(id: IdIdeaSchema) {
    console.log('fecth get one',id)
  }
  static async update(dto: UpdateIdeaSchema) {
    console.log('fectch update idea', dto)
  }
  static async destroy(id: IdIdeaSchema) {
    console.log('featch destroy', id)
  }
}
