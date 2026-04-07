import type { KnowledgeSchema } from '../schemas/knowledge/knowledge.schema'
import { knowledgeForm } from '../ui/form-knowledge'

export function EditFormKnowledgeRender(knowledge: KnowledgeSchema) {
  const form = knowledgeForm()

  form.id.value = knowledge._id
  form.id.setAttribute('type', 'text')
  form.id.readOnly = true

  form.createdAt.value = new Date(knowledge.createdAt).toLocaleString()
  form.createdAt.setAttribute('type', 'text')
  form.createdAt.readOnly = true

  form.title.value = knowledge.title
  form.content.value = knowledge.content

  form.cancel.textContent = ' cancel edit'
  form.submit.textContent = 'edit knowledge'
  return form.form
}
