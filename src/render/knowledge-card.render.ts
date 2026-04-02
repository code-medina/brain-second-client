import type { KnowledgeSchema } from '../schemas/knowledge/knowledge.schema'
import { createKnowledgeCard } from '../ui/create-knowledge-card'

export function knowledgeCardRender(knowledge: KnowledgeSchema) {
  const card = createKnowledgeCard()
  if (knowledge) {
    card.title.textContent = `${knowledge.title} create: ${new Date(knowledge.createdAt).toLocaleString()}`
    card.content.textContent = knowledge.content
    card.footer.innerHTML += `<button data-action="delete">delete</button>`
    card.footer.innerHTML += `<button data-action="edit">edit</button>`
  }
  return card.div
}
