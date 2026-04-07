import { knowledgeForm } from '../ui/form-knowledge'

export function newKnowledgeFormRender() {
  const dom = knowledgeForm()
  dom.title.placeholder = 'Title Knowledge'
  dom.content.placeholder = 'Contente'
  dom.submit.textContent = 'new knowledge'
  dom.cancel.textContent = 'cancel'
  return dom.form
}
