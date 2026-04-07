import type { IdeaService } from '../services/idea.service'
import type { KnowledgeService } from '../services/knowledge.service'

export interface AppServices {
  idea: IdeaService
  knowledge: KnowledgeService
}
