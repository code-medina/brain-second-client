import type { KnowledgeSchema } from '../schemas/knowledge/knowledge.schema'
import { createKnowledgeCard } from '../ui/create-knowledge-card'

export function knowledgeCardRender(knowledge: KnowledgeSchema) {
  const card = createKnowledgeCard()
  if (knowledge) {
    card.title.textContent = knowledge.title
    card.content.textContent = knowledge.content
    card.footer.textContent = knowledge._id
    card.footer.textContent += ` - createdAt: ${knowledge.createdAt}`
  }
  return card.div
}
